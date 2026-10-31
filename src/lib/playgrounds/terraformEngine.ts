import { CommandResult } from "./dockerEngine";

export interface TfResource {
  type: string;
  name: string;
  attributes: Record<string, string>;
  id?: string;
}

export class TerraformEngine {
  public files: Record<string, string> = {};
  public initialized: boolean = false;
  public state: TfResource[] = [];
  public lastCommand: string = "";

  constructor() {
    this.reset();
  }

  public reset() {
    this.files = {
      "main.tf": `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "devops-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "production-web"
  }
}
`,
      "outputs.tf": `output "vpc_id" {
  value = aws_vpc.main.id
}

output "instance_id" {
  value = aws_instance.web.id
}
`,
    };
    this.initialized = false;
    this.state = [];
    this.lastCommand = "";
  }

  public parseResources(): TfResource[] {
    const raw = Object.values(this.files).join("\n");
    const regex = /resource\s+"([A-Za-z0-9_-]+)"\s+"([A-Za-z0-9_-]+)"\s*\{([^}]*)\}/g;
    const resources: TfResource[] = [];
    let match;
    while ((match = regex.exec(raw)) !== null) {
      const type = match[1];
      const name = match[2];
      const body = match[3];
      const attrs: Record<string, string> = {};
      const attrRegex = /([a-zA-Z0-9_-]+)\s*=\s*"?([^"\n]+)"?/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(body)) !== null) {
        attrs[attrMatch[1].trim()] = attrMatch[2].trim();
      }
      resources.push({ type, name, attributes: attrs });
    }
    return resources;
  }

  public exec(raw: string): CommandResult {
    const cmd = raw.trim();
    this.lastCommand = cmd;
    if (!cmd) return { lines: [], isError: false };

    const parts = cmd.split(/\s+/).filter(Boolean);
    const prog = parts[0];
    const args = parts.slice(1);

    if (prog === "clear") return { lines: [], isError: false, clear: true };
    if (prog === "ls") return { lines: [Object.keys(this.files).join("  ")], isError: false };
    if (prog === "cat" && args[0]) {
      const f = this.files[args[0]];
      if (f) return { lines: f.split("\n"), isError: false };
      return { lines: [`cat: ${args[0]}: No such file`], isError: true };
    }

    if (prog === "terraform" || prog === "tf") {
      return this.handleTerraform(args);
    }

    return {
      lines: [`command not found: ${prog}. This lab understands 'terraform'. Try 'terraform init' or 'terraform plan'.`],
      isError: true,
    };
  }

  private handleTerraform(args: string[]): CommandResult {
    const sub = args[0];
    if (!sub) {
      return {
        lines: [
          "Usage: terraform [global options] <subcommand> [args]",
          "Common commands:",
          "  init          Prepare your working directory for other commands",
          "  validate      Check whether the configuration is valid",
          "  fmt           Reformat your configuration in standard style",
          "  plan          Show changes required by the current configuration",
          "  apply         Create or update infrastructure",
          "  destroy       Destroy previously-created infrastructure",
          "  show          Show the current state or a saved plan",
        ],
        isError: false,
      };
    }

    switch (sub) {
      case "init":
        this.initialized = true;
        return {
          lines: [
            "Initializing the backend...",
            "Initializing provider plugins...",
            "- Finding hashicorp/aws versions matching \"~> 5.0\"...",
            "- Installing hashicorp/aws v5.45.0...",
            "- Installed hashicorp/aws v5.45.0 (signed by HashiCorp)",
            "",
            "Terraform has created a lock file .terraform.lock.hcl to record the provider selections it made above.",
            "Terraform has been successfully initialized!",
          ],
          isError: false,
        };
      case "validate":
        if (!this.initialized) {
          return { lines: ["Error: Could not satisfy a provider dependency. Did you run 'terraform init'?"], isError: true };
        }
        return { lines: ["Success! The configuration is valid."], isError: false };
      case "fmt":
        return { lines: ["main.tf", "outputs.tf"], isError: false };
      case "plan": {
        if (!this.initialized) {
          return { lines: ["Error: Working directory not initialized. Execute 'terraform init' first."], isError: true };
        }
        const parsed = this.parseResources();
        const plannedLines: string[] = [
          "Terraform will perform the following actions:",
          "",
        ];
        let addCount = 0;
        parsed.forEach((r) => {
          const exists = this.state.some((s) => s.type === r.type && s.name === r.name);
          if (!exists) {
            addCount++;
            plannedLines.push(`  # ${r.type}.${r.name} will be created`);
            plannedLines.push(`  + resource "${r.type}" "${r.name}" {`);
            Object.entries(r.attributes).forEach(([k, v]) => {
              plannedLines.push(`      + ${k.padEnd(16)} = "${v}"`);
            });
            plannedLines.push(`      + id               = (known after apply)`);
            plannedLines.push("    }");
            plannedLines.push("");
          }
        });
        plannedLines.push(`Plan: ${addCount} to add, 0 to change, 0 to destroy.`);
        return { lines: plannedLines, isError: false };
      }
      case "apply": {
        if (!this.initialized) {
          return { lines: ["Error: Directory not initialized. Run 'terraform init'."], isError: true };
        }
        const parsed = this.parseResources();
        const outputLines: string[] = [];
        let added = 0;
        parsed.forEach((r) => {
          const idx = this.state.findIndex((s) => s.type === r.type && s.name === r.name);
          const mockId = `${r.type.split("_")[1] || "res"}-${(100000 + this.state.length * 37).toString(36)}`;
          if (idx === -1) {
            added++;
            this.state.push({ ...r, id: mockId });
            outputLines.push(`${r.type}.${r.name}: Creating...`);
            outputLines.push(`${r.type}.${r.name}: Creation complete after 3s [id=${mockId}]`);
          }
        });
        outputLines.push("");
        outputLines.push(`Apply complete! Resources: ${added} added, 0 changed, 0 destroyed.`);
        outputLines.push("");
        outputLines.push("Outputs:");
        outputLines.push(`instance_id = "${this.state.find((s) => s.type === "aws_instance")?.id || "i-0a1b2c3d"}"`);
        outputLines.push(`vpc_id = "${this.state.find((s) => s.type === "aws_vpc")?.id || "vpc-0e4f5a6b"}"`);
        return { lines: outputLines, isError: false };
      }
      case "show":
        if (this.state.length === 0) return { lines: ["The state file is currently empty."], isError: false };
        return {
          lines: [
            "# terraform.tfstate",
            ...this.state.map((r) => `resource "${r.type}" "${r.name}" {\n    id = "${r.id}"\n}`),
          ],
          isError: false,
        };
      case "destroy":
        const count = this.state.length;
        this.state = [];
        return {
          lines: [
            `Destroy complete! Resources: ${count} destroyed.`,
          ],
          isError: false,
        };
      default:
        return { lines: [`Error: unknown subcommand "${sub}"`], isError: true };
    }
  }
}
