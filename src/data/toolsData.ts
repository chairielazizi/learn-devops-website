export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  badge: string;
  category: "Validators" | "Generators" | "Cheatsheets" | "Testers";
  description: string;
  icon: string;
}

export const TOOLS_LIST: ToolItem[] = [
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester & Pattern Builder",
    badge: "Interactive",
    category: "Testers",
    description: "Live regex tester with capture group inspector, replacement preview, token cheatsheet, and code generators in JS, Python, Go, Java, and PHP.",
    icon: "🔍",
  },
  {
    id: "python-regex-tester",
    slug: "python-regex-tester",
    name: "Python Regex Tester (re module)",
    badge: "Specialized",
    category: "Testers",
    description: "Test Python re patterns with named groups (?P<name>), backreferences, flags (re.I, re.M, re.S), and instant re.compile snippets.",
    icon: "🐍",
  },
  {
    id: "java-regex-tester",
    slug: "java-regex-tester",
    name: "Java Regex Tester (Pattern & Matcher)",
    badge: "Specialized",
    category: "Testers",
    description: "Test java.util.regex patterns with named groups, auto-escaped backslashes for Java strings, and matcher.replaceAll previews.",
    icon: "☕",
  },
  {
    id: "cron-parser",
    slug: "cron-parser",
    name: "Cron Expression Parser",
    badge: "Interactive",
    category: "Testers",
    description: "Translate standard 5-part cron syntax into plain English and calculate the next execution timestamps.",
    icon: "⏰",
  },
  {
    id: "docker-compose-validator",
    slug: "docker-compose-validator",
    name: "Docker Compose Validator",
    badge: "Linter",
    category: "Validators",
    description: "Validate syntax, service dependencies, port mappings, volumes, and healthchecks in your docker-compose.yml.",
    icon: "🐳",
  },
  {
    id: "dockerfile-linter",
    slug: "dockerfile-linter",
    name: "Dockerfile Linter & Optimizer",
    badge: "Optimizer",
    category: "Validators",
    description: "Scan your Dockerfile for security vulnerabilities, unnecessary layer bloat, and cache optimization tips.",
    icon: "📦",
  },
  {
    id: "kubernetes-yaml-generator",
    slug: "kubernetes-yaml-generator",
    name: "Kubernetes YAML Generator",
    badge: "Visual Builder",
    category: "Generators",
    description: "Visually configure Deployments, Services, Ingress, and ConfigMaps and generate production-ready YAML manifests.",
    icon: "☸️",
  },
  {
    id: "yaml-validator",
    slug: "yaml-validator",
    name: "YAML Syntax Validator & Formatter",
    badge: "Utility",
    category: "Validators",
    description: "Instantly detect indentation errors, tab characters, and malformed structures in any YAML document.",
    icon: "📄",
  },
  {
    id: "cheatsheet-docker",
    slug: "cheatsheets/docker",
    name: "Docker CLI Cheatsheet",
    badge: "Reference",
    category: "Cheatsheets",
    description: "Essential commands for container lifecycle, image management, volume mounts, and network debugging.",
    icon: "🐳",
  },
  {
    id: "cheatsheet-k8s",
    slug: "cheatsheets/kubernetes",
    name: "Kubernetes (kubectl) Cheatsheet",
    badge: "Reference",
    category: "Cheatsheets",
    description: "High-frequency kubectl commands, JSONPath expressions, rollout commands, and debugging recipes.",
    icon: "☸️",
  },
  {
    id: "cheatsheet-terraform",
    slug: "cheatsheets/terraform",
    name: "Terraform Cheatsheet",
    badge: "Reference",
    category: "Cheatsheets",
    description: "CLI reference for init, plan, apply, state surgery, workspaces, and environment variables.",
    icon: "🏗️",
  },
  {
    id: "cheatsheet-git",
    slug: "cheatsheets/git",
    name: "Git Cheatsheet",
    badge: "Reference",
    category: "Cheatsheets",
    description: "Branching, merging, rebasing, stash operations, reflog disaster recovery, and cherry-picking commands.",
    icon: "🐙",
  },
  {
    id: "cheatsheet-linux",
    slug: "cheatsheets/linux",
    name: "Linux & Bash Cheatsheet",
    badge: "Reference",
    category: "Cheatsheets",
    description: "SysAdmin commands for file system, permissions, processes, systemd, and network triage.",
    icon: "🐧",
  },
];
