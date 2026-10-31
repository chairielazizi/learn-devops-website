import { CommandResult } from "./dockerEngine";

export interface VfsNode {
  type: "dir" | "file";
  content?: string;
  children?: Record<string, VfsNode>;
  mode?: string;
  size?: number;
}

export class LinuxEngine {
  public root: VfsNode = { type: "dir", children: {} };
  public cwd: string[] = ["home", "devops"];
  public env: Record<string, string> = {};
  public lastCommand: string = "";

  constructor() {
    this.reset();
  }

  public reset() {
    this.root = {
      type: "dir",
      children: {
        home: {
          type: "dir",
          children: {
            devops: {
              type: "dir",
              children: {
                "README.md": {
                  type: "file",
                  content: "# DevOps Linux Lab\nWelcome to your browser-based Linux and Bash environment.\nTry: ls -la, cat README.md, grep, echo, and pipes.\n",
                },
                app: {
                  type: "dir",
                  children: {
                    "server.js": {
                      type: "file",
                      content: "const http = require('http');\nhttp.createServer((req, res) => res.end('DevOps OK')).listen(3000);\n",
                    },
                    "package.json": {
                      type: "file",
                      content: '{\n  "name": "microservice",\n  "version": "1.0.0"\n}\n',
                    },
                  },
                },
                scripts: {
                  type: "dir",
                  children: {
                    "backup.sh": {
                      type: "file",
                      content: "#!/bin/bash\necho 'Running automated database snapshot...'\ndate > /tmp/backup.log\n",
                      mode: "755",
                    },
                  },
                },
              },
            },
          },
        },
        etc: {
          type: "dir",
          children: {
            hosts: {
              type: "file",
              content: "127.0.0.1 localhost\n::1 localhost\n10.0.0.10 k8s-master\n",
            },
            resolv: {
              type: "file",
              content: "nameserver 8.8.8.8\nnameserver 1.1.1.1\n",
            },
          },
        },
        var: {
          type: "dir",
          children: {
            log: {
              type: "dir",
              children: {
                "syslog.log": {
                  type: "file",
                  content: "Oct 31 10:00:01 kernel: Linux version 6.8.0-generic\nOct 31 10:00:02 systemd[1]: Started Docker Application Container Engine.\nOct 31 10:00:03 kubelet[542]: Node devops-node Ready.\n",
                },
              },
            },
          },
        },
        tmp: {
          type: "dir",
          children: {},
        },
      },
    };
    this.cwd = ["home", "devops"];
    this.env = {
      HOME: "/home/devops",
      USER: "devops",
      HOSTNAME: "cloud-shell-01",
      SHELL: "/bin/bash",
      PWD: "/home/devops",
      PATH: "/usr/local/bin:/usr/bin:/bin",
    };
    this.lastCommand = "";
  }

  public cwdString(): string {
    return "/" + this.cwd.join("/");
  }

  private resolve(pathStr: string): string[] {
    let base = [...this.cwd];
    let p = pathStr;
    if (p.startsWith("~")) {
      base = ["home", "devops"];
      p = p.slice(1).replace(/^\//, "");
    } else if (p.startsWith("/")) {
      base = [];
      p = p.slice(1);
    }
    const parts = p.split("/").filter((x) => x.length > 0);
    const resolved = [...base];
    for (const segment of parts) {
      if (segment === ".") continue;
      else if (segment === "..") {
        if (resolved.length > 0) resolved.pop();
      } else {
        resolved.push(segment);
      }
    }
    return resolved;
  }

  private getNode(pathParts: string[]): VfsNode | null {
    let curr = this.root;
    for (const part of pathParts) {
      if (curr.type !== "dir" || !curr.children) return null;
      if (!curr.children[part]) return null;
      curr = curr.children[part];
    }
    return curr;
  }

  public exec(raw: string): CommandResult {
    const cmd = raw.trim();
    this.lastCommand = cmd;
    if (!cmd) return { lines: [], isError: false };

    // Handle redirection: > or >>
    if (cmd.includes(">")) {
      return this.handleRedirection(cmd);
    }

    // Handle pipeline: cmd1 | cmd2
    if (cmd.includes("|")) {
      return this.handlePipeline(cmd);
    }

    return this.execSingle(cmd);
  }

  private execSingle(cmd: string, stdinLines: string[] = []): CommandResult {
    const parts = cmd.split(/\s+/).filter(Boolean);
    const prog = parts[0];
    const args = parts.slice(1);

    switch (prog) {
      case "clear":
        return { lines: [], isError: false, clear: true };
      case "pwd":
        return { lines: [this.cwdString()], isError: false };
      case "whoami":
        return { lines: [this.env.USER || "devops"], isError: false };
      case "hostname":
        return { lines: [this.env.HOSTNAME || "cloud-shell-01"], isError: false };
      case "echo":
        return { lines: [args.join(" ")], isError: false };
      case "cd":
        return this.cd(args[0] || "~");
      case "ls":
        return this.ls(args);
      case "cat":
        return this.cat(args, stdinLines);
      case "mkdir":
        return this.mkdir(args);
      case "touch":
        return this.touch(args);
      case "rm":
        return this.rm(args);
      case "grep":
        return this.grep(args, stdinLines);
      case "head":
        return this.head(args, stdinLines);
      case "tail":
        return this.tail(args, stdinLines);
      case "wc":
        return this.wc(args, stdinLines);
      case "help":
        return {
          lines: [
            "Linux Lab Simulator - Available Utilities:",
            "  ls, pwd, cd, cat, mkdir, touch, rm, grep, head, tail, wc, echo, whoami, hostname",
            "  Supports output redirection (>, >>) and basic pipes (|).",
          ],
          isError: false,
        };
      default:
        return { lines: [`bash: ${prog}: command not found`], isError: true };
    }
  }

  private cd(target: string): CommandResult {
    const parts = this.resolve(target);
    const node = this.getNode(parts);
    if (!node) return { lines: [`bash: cd: ${target}: No such file or directory`], isError: true };
    if (node.type !== "dir") return { lines: [`bash: cd: ${target}: Not a directory`], isError: true };
    this.cwd = parts;
    this.env.PWD = this.cwdString();
    return { lines: [], isError: false };
  }

  private ls(args: string[]): CommandResult {
    const showAll = args.some((a) => a.includes("a"));
    const showLong = args.some((a) => a.includes("l"));
    const targetPath = args.find((a) => !a.startsWith("-")) || ".";
    const parts = this.resolve(targetPath);
    const node = this.getNode(parts);

    if (!node) return { lines: [`ls: cannot access '${targetPath}': No such file or directory`], isError: true };
    if (node.type === "file") return { lines: [targetPath], isError: false };

    const children = Object.keys(node.children || {});
    const items = showAll ? [".", "..", ...children] : children.filter((k) => !k.startsWith("."));

    if (!showLong) {
      return { lines: [items.join("  ")], isError: false };
    }

    const lines = items.map((name) => {
      const child = node.children?.[name];
      const isDir = child?.type === "dir" || name === "." || name === "..";
      const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--";
      const size = child?.content ? child.content.length : 4096;
      return `${perm} 1 devops devops ${String(size).padStart(6, " ")} Oct 31 10:00 ${name}`;
    });
    return { lines, isError: false };
  }

  private cat(args: string[], stdinLines: string[]): CommandResult {
    if (args.length === 0) return { lines: stdinLines, isError: false };
    const target = args[0];
    const parts = this.resolve(target);
    const node = this.getNode(parts);
    if (!node) return { lines: [`cat: ${target}: No such file or directory`], isError: true };
    if (node.type === "dir") return { lines: [`cat: ${target}: Is a directory`], isError: true };
    const content = node.content || "";
    return { lines: content.split("\n"), isError: false };
  }

  private mkdir(args: string[]): CommandResult {
    const target = args.find((a) => !a.startsWith("-"));
    if (!target) return { lines: ["mkdir: missing operand"], isError: true };
    const parts = this.resolve(target);
    const parentParts = parts.slice(0, -1);
    const newName = parts[parts.length - 1];
    const parent = this.getNode(parentParts);
    if (!parent || parent.type !== "dir" || !parent.children) {
      return { lines: [`mkdir: cannot create directory '${target}': No such file or directory`], isError: true };
    }
    parent.children[newName] = { type: "dir", children: {} };
    return { lines: [], isError: false };
  }

  private touch(args: string[]): CommandResult {
    const target = args[0];
    if (!target) return { lines: ["touch: missing file operand"], isError: true };
    const parts = this.resolve(target);
    const parentParts = parts.slice(0, -1);
    const newName = parts[parts.length - 1];
    const parent = this.getNode(parentParts);
    if (!parent || parent.type !== "dir" || !parent.children) {
      return { lines: [`touch: cannot touch '${target}': No such file or directory`], isError: true };
    }
    if (!parent.children[newName]) {
      parent.children[newName] = { type: "file", content: "" };
    }
    return { lines: [], isError: false };
  }

  private rm(args: string[]): CommandResult {
    const target = args.find((a) => !a.startsWith("-"));
    if (!target) return { lines: ["rm: missing operand"], isError: true };
    const parts = this.resolve(target);
    const parentParts = parts.slice(0, -1);
    const name = parts[parts.length - 1];
    const parent = this.getNode(parentParts);
    if (!parent || !parent.children || !parent.children[name]) {
      return { lines: [`rm: cannot remove '${target}': No such file or directory`], isError: true };
    }
    delete parent.children[name];
    return { lines: [], isError: false };
  }

  private grep(args: string[], stdinLines: string[]): CommandResult {
    let pattern = "";
    let file = "";
    for (const a of args) {
      if (!pattern) pattern = a;
      else if (!file) file = a;
    }
    let lines = stdinLines;
    if (file) {
      const parts = this.resolve(file);
      const node = this.getNode(parts);
      if (!node || node.type !== "file") return { lines: [`grep: ${file}: No such file`], isError: true };
      lines = (node.content || "").split("\n");
    }
    const matched = lines.filter((l) => l.includes(pattern));
    return { lines: matched, isError: false };
  }

  private head(args: string[], stdinLines: string[]): CommandResult {
    const n = 10;
    const file = args.find((a) => !a.startsWith("-"));
    let lines = stdinLines;
    if (file) {
      const parts = this.resolve(file);
      const node = this.getNode(parts);
      if (!node || node.type !== "file") return { lines: [`head: cannot open '${file}'`], isError: true };
      lines = (node.content || "").split("\n");
    }
    return { lines: lines.slice(0, n), isError: false };
  }

  private tail(args: string[], stdinLines: string[]): CommandResult {
    const n = 10;
    const file = args.find((a) => !a.startsWith("-"));
    let lines = stdinLines;
    if (file) {
      const parts = this.resolve(file);
      const node = this.getNode(parts);
      if (!node || node.type !== "file") return { lines: [`tail: cannot open '${file}'`], isError: true };
      lines = (node.content || "").split("\n");
    }
    return { lines: lines.slice(-n), isError: false };
  }

  private wc(args: string[], stdinLines: string[]): CommandResult {
    const file = args[0];
    let lines = stdinLines;
    if (file) {
      const parts = this.resolve(file);
      const node = this.getNode(parts);
      if (!node || node.type !== "file") return { lines: [`wc: ${file}: No such file`], isError: true };
      lines = (node.content || "").split("\n");
    }
    const lineCount = lines.length;
    const wordCount = lines.join(" ").split(/\s+/).filter(Boolean).length;
    const byteCount = lines.join("\n").length;
    return { lines: [`${lineCount}  ${wordCount}  ${byteCount} ${file || ""}`], isError: false };
  }

  private handlePipeline(cmd: string): CommandResult {
    const stages = cmd.split("|").map((s) => s.trim());
    let currentLines: string[] = [];
    for (const stage of stages) {
      const res = this.execSingle(stage, currentLines);
      if (res.isError) return res;
      currentLines = res.lines;
    }
    return { lines: currentLines, isError: false };
  }

  private handleRedirection(cmd: string): CommandResult {
    const isAppend = cmd.includes(">>");
    const [left, right] = cmd.split(isAppend ? ">>" : ">").map((s) => s.trim());
    const res = this.execSingle(left);
    if (res.isError) return res;

    const parts = this.resolve(right);
    const parentParts = parts.slice(0, -1);
    const newName = parts[parts.length - 1];
    const parent = this.getNode(parentParts);
    if (!parent || parent.type !== "dir" || !parent.children) {
      return { lines: [`bash: ${right}: No such file or directory`], isError: true };
    }

    const newContent = res.lines.join("\n") + "\n";
    if (isAppend && parent.children[newName] && parent.children[newName].type === "file") {
      parent.children[newName].content = (parent.children[newName].content || "") + newContent;
    } else {
      parent.children[newName] = { type: "file", content: newContent };
    }
    return { lines: [], isError: false };
  }
}

