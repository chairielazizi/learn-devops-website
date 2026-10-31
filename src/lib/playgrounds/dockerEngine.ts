export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  command: string;
  created: number;
  status: string;
  ports: string;
  logs: string[];
  env: Record<string, string>;
  volumes: string[];
}

export interface DockerImage {
  id: string;
  repository: string;
  tag: string;
  size: string;
  created: string;
}

export interface CommandResult {
  lines: string[];
  isError: boolean;
  clear?: boolean;
}

const REGISTRY: Record<string, { size: string; defaultCommand: string; defaultPort?: string; logs: string[] }> = {
  "hello-world": {
    size: "13.3kB",
    defaultCommand: "/hello",
    logs: [
      "Hello from Docker!",
      "This message shows that your installation appears to be working correctly.",
      "",
      "To generate this message, Docker took the following steps:",
      " 1. The Docker client contacted the Docker daemon.",
      " 2. The Docker daemon created a new container from that image which runs the executable.",
      " 3. The Docker daemon streamed that output to the Docker client.",
    ],
  },
  nginx: {
    size: "187MB",
    defaultCommand: "nginx -g 'daemon off;'",
    defaultPort: "80/tcp",
    logs: [
      "/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration",
      "/docker-entrypoint.sh: Configuration complete; ready for start up",
      "2026/10/31 10:00:00 [notice] 1#1: using the 'epoll' event method",
      "2026/10/31 10:00:00 [notice] 1#1: nginx/1.25.4",
      "2026/10/31 10:00:00 [notice] 1#1: start worker processes",
    ],
  },
  redis: {
    size: "117MB",
    defaultCommand: "redis-server",
    defaultPort: "6379/tcp",
    logs: [
      "1:M 31 Oct 2026 10:00:00.000 * Running mode=standalone, port=6379.",
      "1:M 31 Oct 2026 10:00:00.001 # Server initialized",
      "1:M 31 Oct 2026 10:00:00.002 * Ready to accept connections tcp",
    ],
  },
  alpine: {
    size: "7.8MB",
    defaultCommand: "/bin/sh",
    logs: [],
  },
  ubuntu: {
    size: "78.1MB",
    defaultCommand: "/bin/bash",
    logs: [],
  },
  postgres: {
    size: "432MB",
    defaultCommand: "postgres",
    defaultPort: "5432/tcp",
    logs: [
      "PostgreSQL Database directory appears to contain a database; Skipping initialization",
      "2026-10-31 10:00:00.000 UTC [1] LOG:  starting PostgreSQL 16.2 on x86_64-pc-linux-gnu",
      "2026-10-31 10:00:00.005 UTC [1] LOG:  listening on IPv4 address \"0.0.0.0\", port 5432",
      "2026-10-31 10:00:00.010 UTC [1] LOG:  database system is ready to accept connections",
    ],
  },
  node: {
    size: "1.1GB",
    defaultCommand: "node",
    logs: ["Welcome to Node.js v20.12.0."],
  },
  python: {
    size: "1.02GB",
    defaultCommand: "python3",
    logs: ["Python 3.12.2 (main, Feb 20 2026, 10:00:00)"],
  },
};

const ADJECTIVES = ["brave", "clever", "eager", "jolly", "happy", "zen", "bold", "cool", "sharp", "quirky", "serene", "radiant", "amber"];
const SCIENTISTS = ["turing", "hopper", "curie", "tesla", "newton", "einstein", "lovelace", "darwin", "galileo", "ritchie", "torvalds", "knuth"];

let seed = 42;
function pseudoRandom(): number {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function genHex(length: number): string {
  const chars = "0123456789abcdef";
  let res = "";
  for (let i = 0; i < length; i++) {
    res += chars[Math.floor(pseudoRandom() * chars.length)];
  }
  return res;
}

function padRight(str: string, width: number): string {
  return str.length >= width ? str + "  " : str + " ".repeat(width - str.length);
}

export class DockerEngine {
  public images: DockerImage[] = [];
  public containers: DockerContainer[] = [];
  public volumes: string[] = [];
  public networks: string[] = ["bridge", "host", "none"];
  public lastCommand: string = "";

  constructor() {
    this.reset();
  }

  public reset() {
    this.images = [
      {
        id: genHex(12),
        repository: "nginx",
        tag: "latest",
        size: "187MB",
        created: "2 weeks ago",
      },
    ];
    this.containers = [];
    this.volumes = ["web-data"];
    this.networks = ["bridge", "host", "none"];
    this.lastCommand = "";
  }

  private randomName(): string {
    const adj = ADJECTIVES[Math.floor(pseudoRandom() * ADJECTIVES.length)];
    const sci = SCIENTISTS[Math.floor(pseudoRandom() * SCIENTISTS.length)];
    return `${adj}_${sci}`;
  }

  public exec(raw: string): CommandResult {
    const cmd = raw.trim();
    this.lastCommand = cmd;
    if (!cmd) return { lines: [], isError: false };

    const parts = this.tokenize(cmd);
    const [prog, ...args] = parts;

    switch (prog) {
      case "clear":
        return { lines: [], isError: false, clear: true };
      case "help":
        return this.help();
      case "ls":
        return { lines: ["Dockerfile  app/  README.md  docker-compose.yml"], isError: false };
      case "pwd":
        return { lines: ["/home/devops"], isError: false };
      case "whoami":
        return { lines: ["devops"], isError: false };
      case "echo":
        return { lines: [args.join(" ")], isError: false };
      case "docker":
        return this.handleDocker(args);
      default:
        return { lines: [`${prog}: command not found. Try 'docker --help' or 'help'.`], isError: true };
    }
  }

  private tokenize(str: string): string[] {
    const tokens: string[] = [];
    let current = "";
    let quote: string | null = null;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (quote) {
        if (c === quote) {
          quote = null;
        } else {
          current += c;
        }
      } else if (c === '"' || c === "'") {
        quote = c;
      } else if (/\s/.test(c)) {
        if (current) {
          tokens.push(current);
          current = "";
        }
      } else {
        current += c;
      }
    }
    if (current) tokens.push(current);
    return tokens;
  }

  private handleDocker(args: string[]): CommandResult {
    if (args.length === 0) return this.usage();
    const sub = args[0];
    const rest = args.slice(1);

    if (sub === "--version" || sub === "-v" || sub === "version") {
      return { lines: ["Docker version 26.1.0, build c84b79d"], isError: false };
    }
    if (sub === "--help") return this.usage();

    switch (sub) {
      case "pull":
        return this.pull(rest);
      case "run":
        return this.run(rest);
      case "ps":
        return this.ps(rest);
      case "images":
        return this.imagesList();
      case "stop":
        return this.stop(rest);
      case "start":
        return this.start(rest);
      case "restart":
        return this.restart(rest);
      case "rm":
        return this.rm(rest);
      case "rmi":
        return this.rmi(rest);
      case "logs":
        return this.logs(rest);
      case "inspect":
        return this.inspect(rest);
      case "build":
        return this.build(rest);
      case "volume":
        return this.volume(rest);
      case "network":
        return this.network(rest);
      case "info":
        return {
          lines: [
            "Client: Docker Engine - Community",
            " Version:    26.1.0",
            ` Containers: ${this.containers.length}`,
            `  Running:   ${this.containers.filter((c) => c.status.startsWith("Up")).length}`,
            `  Paused:    0`,
            `  Stopped:   ${this.containers.filter((c) => !c.status.startsWith("Up")).length}`,
            ` Images:     ${this.images.length}`,
            " Server Version: 26.1.0",
            " Storage Driver: overlay2",
            " Operating System: Ubuntu 24.04 LTS (Simulated Browser Engine)",
            " Architecture: x86_64",
          ],
          isError: false,
        };
      default:
        return { lines: [`docker: '${sub}' is not a docker command. See 'docker --help'.`], isError: true };
    }
  }

  private pull(args: string[]): CommandResult {
    const imgArg = args.find((a) => !a.startsWith("-"));
    if (!imgArg) return { lines: ['"docker pull" requires 1 argument.'], isError: true };

    const [repo, tag = "latest"] = imgArg.split(":");
    const reg = REGISTRY[repo];
    if (!reg) {
      return {
        lines: [
          `Error response from daemon: pull access denied for ${repo}, repository does not exist or may require 'docker login'.`,
          `Simulated registry available images: ${Object.keys(REGISTRY).join(", ")}`,
        ],
        isError: true,
      };
    }

    const existing = this.images.find((i) => i.repository === repo && i.tag === tag);
    if (existing) {
      return { lines: [`Image ${repo}:${tag} is up to date.`], isError: false };
    }

    const id = genHex(12);
    this.images.push({
      id,
      repository: repo,
      tag,
      size: reg.size,
      created: "Just now",
    });

    return {
      lines: [
        `${tag}: Pulling from library/${repo}`,
        `${genHex(12)}: Pull complete`,
        `${genHex(12)}: Pull complete`,
        `Digest: sha256:${genHex(64)}`,
        `Status: Downloaded newer image for ${repo}:${tag}`,
        `docker.io/library/${repo}:${tag}`,
      ],
      isError: false,
    };
  }

  private run(args: string[]): CommandResult {
    let detach = false;
    let name = "";
    let ports = "";
    let targetImage = "";
    const env: Record<string, string> = {};
    const volumes: string[] = [];

    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a === "-d" || a === "--detach") detach = true;
      else if (a === "--name" && args[i + 1]) name = args[++i];
      else if (a.startsWith("--name=")) name = a.slice(7);
      else if ((a === "-p" || a === "--publish") && args[i + 1]) ports = args[++i];
      else if (a.startsWith("-p=")) ports = a.slice(3);
      else if (a === "-e" && args[i + 1]) {
        const [k, v] = (args[++i] || "").split("=");
        if (k) env[k] = v || "";
      } else if (a === "-v" && args[i + 1]) {
        volumes.push(args[++i]);
      } else if (!a.startsWith("-")) {
        targetImage = a;
        break;
      }
    }

    if (!targetImage) return { lines: ['"docker run" requires at least 1 image argument.'], isError: true };

    const [repo, tag = "latest"] = targetImage.split(":");
    let img = this.images.find((i) => i.repository === repo && i.tag === tag);
    const outputLines: string[] = [];

    if (!img) {
      outputLines.push(`Unable to find image '${repo}:${tag}' locally`);
      const pullRes = this.pull([targetImage]);
      outputLines.push(...pullRes.lines);
      if (pullRes.isError) return { lines: outputLines, isError: true };
      img = this.images.find((i) => i.repository === repo && i.tag === tag);
    }

    if (!name) name = this.randomName();
    if (this.containers.some((c) => c.name === name)) {
      return {
        lines: [
          `docker: Error response from daemon: Conflict. The container name "/${name}" is already in use by container "${genHex(12)}".`,
        ],
        isError: true,
      };
    }

    const reg = REGISTRY[repo] || { defaultCommand: "/bin/sh", logs: [] };
    const containerId = genHex(12);
    const fullId = genHex(64);

    const container: DockerContainer = {
      id: containerId,
      name,
      image: `${repo}:${tag}`,
      command: reg.defaultCommand,
      created: Date.now(),
      status: `Up 2 seconds`,
      ports: ports ? `0.0.0.0:${ports}->${reg.defaultPort || "80/tcp"}` : reg.defaultPort || "",
      logs: reg.logs || [],
      env,
      volumes,
    };

    this.containers.unshift(container);

    if (detach) {
      outputLines.push(fullId);
      return { lines: outputLines, isError: false };
    } else {
      outputLines.push(...container.logs);
      return { lines: outputLines, isError: false };
    }
  }

  private ps(args: string[]): CommandResult {
    const showAll = args.includes("-a") || args.includes("--all");
    const targets = this.containers.filter((c) => showAll || c.status.startsWith("Up"));

    if (targets.length === 0) {
      return {
        lines: [
          padRight("CONTAINER ID", 14) +
            padRight("IMAGE", 18) +
            padRight("COMMAND", 24) +
            padRight("CREATED", 16) +
            padRight("STATUS", 18) +
            padRight("PORTS", 22) +
            "NAMES",
        ],
        isError: false,
      };
    }

    const header =
      padRight("CONTAINER ID", 14) +
      padRight("IMAGE", 18) +
      padRight("COMMAND", 24) +
      padRight("CREATED", 16) +
      padRight("STATUS", 18) +
      padRight("PORTS", 22) +
      "NAMES";

    const rows = targets.map((c) => {
      return (
        padRight(c.id, 14) +
        padRight(c.image, 18) +
        padRight(`"${c.command.slice(0, 20)}"`, 24) +
        padRight("2 mins ago", 16) +
        padRight(c.status, 18) +
        padRight(c.ports || "-", 22) +
        c.name
      );
    });

    return { lines: [header, ...rows], isError: false };
  }

  private imagesList(): CommandResult {
    const header = padRight("REPOSITORY", 18) + padRight("TAG", 12) + padRight("IMAGE ID", 16) + padRight("CREATED", 16) + "SIZE";
    const rows = this.images.map((i) => {
      return padRight(i.repository, 18) + padRight(i.tag, 12) + padRight(i.id, 16) + padRight(i.created, 16) + i.size;
    });
    return { lines: [header, ...rows], isError: false };
  }

  private stop(args: string[]): CommandResult {
    const target = args[0];
    if (!target) return { lines: ['"docker stop" requires at least 1 container name or ID.'], isError: true };
    const c = this.containers.find((item) => item.id === target || item.name === target);
    if (!c) return { lines: [`Error response from daemon: No such container: ${target}`], isError: true };
    c.status = "Exited (0) 5 seconds ago";
    return { lines: [c.name], isError: false };
  }

  private start(args: string[]): CommandResult {
    const target = args[0];
    if (!target) return { lines: ['"docker start" requires at least 1 container.'], isError: true };
    const c = this.containers.find((item) => item.id === target || item.name === target);
    if (!c) return { lines: [`Error response from daemon: No such container: ${target}`], isError: true };
    c.status = "Up 1 second";
    return { lines: [c.name], isError: false };
  }

  private restart(args: string[]): CommandResult {
    const target = args[0];
    if (!target) return { lines: ['"docker restart" requires at least 1 container.'], isError: true };
    const c = this.containers.find((item) => item.id === target || item.name === target);
    if (!c) return { lines: [`Error: No such container: ${target}`], isError: true };
    c.status = "Up 1 second (restarted)";
    return { lines: [c.name], isError: false };
  }

  private rm(args: string[]): CommandResult {
    const target = args.find((a) => !a.startsWith("-"));
    if (!target) return { lines: ['"docker rm" requires at least 1 container.'], isError: true };
    const idx = this.containers.findIndex((c) => c.id === target || c.name === target);
    if (idx === -1) return { lines: [`Error: No such container: ${target}`], isError: true };
    if (this.containers[idx].status.startsWith("Up") && !args.includes("-f") && !args.includes("--force")) {
      return {
        lines: [
          `Error response from daemon: You cannot remove a running container ${this.containers[idx].id}. Stop the container before attempting removal or force remove with -f.`,
        ],
        isError: true,
      };
    }
    const removed = this.containers.splice(idx, 1)[0];
    return { lines: [removed.name], isError: false };
  }

  private rmi(args: string[]): CommandResult {
    const target = args[0];
    if (!target) return { lines: ['"docker rmi" requires at least 1 image.'], isError: true };
    const idx = this.images.findIndex((i) => i.id === target || i.repository === target || `${i.repository}:${i.tag}` === target);
    if (idx === -1) return { lines: [`Error: No such image: ${target}`], isError: true };
    const removed = this.images.splice(idx, 1)[0];
    return { lines: [`Untagged: ${removed.repository}:${removed.tag}`, `Deleted: sha256:${removed.id}`], isError: false };
  }

  private logs(args: string[]): CommandResult {
    const target = args.find((a) => !a.startsWith("-"));
    if (!target) return { lines: ['"docker logs" requires at least 1 container.'], isError: true };
    const c = this.containers.find((item) => item.id === target || item.name === target);
    if (!c) return { lines: [`Error: No such container: ${target}`], isError: true };
    return { lines: c.logs.length > 0 ? c.logs : ["[Container has no output logged]"], isError: false };
  }

  private inspect(args: string[]): CommandResult {
    const target = args[0];
    if (!target) return { lines: ['"docker inspect" requires an object name or ID.'], isError: true };
    const c = this.containers.find((item) => item.id === target || item.name === target);
    if (c) {
      return {
        lines: [
          "[",
          "  {",
          `    "Id": "${c.id}",`,
          `    "Created": "${new Date(c.created).toISOString()}",`,
          `    "Path": "${c.command}",`,
          '    "State": {',
          `      "Status": "${c.status.startsWith("Up") ? "running" : "exited"}",`,
          `      "Running": ${c.status.startsWith("Up")}`,
          "    },",
          `    "Image": "${c.image}",`,
          `    "Name": "/${c.name}"`,
          "  }",
          "]",
        ],
        isError: false,
      };
    }
    return { lines: [`Error: No such object: ${target}`], isError: true };
  }

  private build(args: string[]): CommandResult {
    let tag = "my-app:latest";
    const tagIdx = args.indexOf("-t");
    if (tagIdx !== -1 && args[tagIdx + 1]) tag = args[tagIdx + 1];

    const [repo, tagName = "latest"] = tag.split(":");
    const newId = genHex(12);

    this.images.push({
      id: newId,
      repository: repo,
      tag: tagName,
      size: "142MB",
      created: "Just now",
    });

    return {
      lines: [
        `[+] Building 1.2s (7/7) FINISHED`,
        ` => [internal] load build definition from Dockerfile`,
        ` => [1/3] FROM node:20-alpine`,
        ` => [2/3] WORKDIR /app`,
        ` => [3/3] COPY . .`,
        ` => exporting to image`,
        ` => => naming to docker.io/library/${tag}`,
        `Successfully built ${newId}`,
        `Successfully tagged ${tag}`,
      ],
      isError: false,
    };
  }

  private volume(args: string[]): CommandResult {
    const sub = args[0] || "ls";
    if (sub === "ls") {
      const header = padRight("DRIVER", 12) + "VOLUME NAME";
      const rows = this.volumes.map((v) => padRight("local", 12) + v);
      return { lines: [header, ...rows], isError: false };
    }
    if (sub === "create" && args[1]) {
      this.volumes.push(args[1]);
      return { lines: [args[1]], isError: false };
    }
    return { lines: ["Commands: docker volume [ls | create <name>]"], isError: false };
  }

  private network(args: string[]): CommandResult {
    const sub = args[0] || "ls";
    if (sub === "ls") {
      const header = padRight("NETWORK ID", 14) + padRight("NAME", 18) + padRight("DRIVER", 12) + "SCOPE";
      const rows = this.networks.map((n) => padRight(genHex(12), 14) + padRight(n, 18) + padRight("bridge", 12) + "local");
      return { lines: [header, ...rows], isError: false };
    }
    return { lines: ["Commands: docker network [ls | create <name>]"], isError: false };
  }

  private help(): CommandResult {
    return {
      lines: [
        "Interactive DevOps Shell - Available Commands:",
        "  docker <command>      Interact with simulated Docker daemon",
        "  docker ps [-a]        List active or all containers",
        "  docker run [flags]    Run a container (-d, -p 80:80, --name <n>, -v, -e)",
        "  docker images         List downloaded container images",
        "  docker pull <image>   Pull an image (nginx, redis, ubuntu, postgres, etc.)",
        "  docker stop <name>    Stop running container",
        "  docker rm <name>      Remove container",
        "  docker logs <name>    View container output stream",
        "  clear                 Clear terminal screen",
      ],
      isError: false,
    };
  }

  private usage(): CommandResult {
    return {
      lines: [
        "Usage:  docker [OPTIONS] COMMAND",
        "",
        "Management Commands:",
        "  container   Manage containers",
        "  image       Manage images",
        "  network     Manage networks",
        "  volume      Manage volumes",
        "",
        "Commands:",
        "  build       Build an image from a Dockerfile",
        "  images      List images",
        "  info        Display system-wide information",
        "  logs        Fetch logs of a container",
        "  ps          List containers",
        "  pull        Download an image from a registry",
        "  restart     Restart one or more containers",
        "  rm          Remove one or more containers",
        "  rmi         Remove one or more images",
        "  run         Create and run a new container from an image",
        "  start       Start one or more stopped containers",
        "  stop        Stop one or more running containers",
      ],
      isError: false,
    };
  }
}
