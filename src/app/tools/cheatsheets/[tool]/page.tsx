import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Terminal, Copy, Check, ArrowRight } from "lucide-react";

interface CheatsheetProps {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return [
    { tool: "docker" },
    { tool: "kubernetes" },
    { tool: "terraform" },
    { tool: "git" },
    { tool: "linux" },
  ];
}

const CHEATSHEET_DATA: Record<
  string,
  {
    title: string;
    icon: string;
    desc: string;
    sections: { category: string; commands: { cmd: string; desc: string }[] }[];
  }
> = {
  docker: {
    title: "Docker CLI Cheatsheet",
    icon: "🐳",
    desc: "Complete reference for containers, images, volumes, and networks.",
    sections: [
      {
        category: "Container Lifecycle",
        commands: [
          { cmd: "docker run -d -p 80:80 --name web nginx", desc: "Run detached Nginx on port 80" },
          { cmd: "docker ps -a", desc: "List all active and stopped containers" },
          { cmd: "docker stop <id/name>", desc: "Gracefully stop a running container" },
          { cmd: "docker rm -f <id/name>", desc: "Force remove a running container" },
          { cmd: "docker logs -f <id/name>", desc: "Stream live logs of container" },
          { cmd: "docker exec -it <name> /bin/sh", desc: "Open interactive shell inside container" },
        ],
      },
      {
        category: "Images & Build",
        commands: [
          { cmd: "docker build -t my-app:1.0 .", desc: "Build image from Dockerfile in current directory" },
          { cmd: "docker images", desc: "List all locally cached images" },
          { cmd: "docker rmi <image-id>", desc: "Delete an image from local storage" },
          { cmd: "docker system prune -a --volumes", desc: "Wipe all unused images, stopped containers, and volumes" },
        ],
      },
    ],
  },
  kubernetes: {
    title: "Kubernetes (kubectl) Cheatsheet",
    icon: "☸️",
    desc: "Essential kubectl commands for workload debugging, deployments, and CKA exam.",
    sections: [
      {
        category: "Pod & Deployment Operations",
        commands: [
          { cmd: "kubectl get pods -A -o wide", desc: "List pods across all namespaces with IPs & nodes" },
          { cmd: "kubectl run test --image=nginx --restart=Never", desc: "Run a temporary standalone pod" },
          { cmd: "kubectl create deployment api --image=nginx --replicas=3", desc: "Create a deployment with 3 replicas" },
          { cmd: "kubectl scale deployment api --replicas=5", desc: "Scale replicas dynamically" },
          { cmd: "kubectl rollout restart deployment api", desc: "Trigger rolling restart of all pods" },
          { cmd: "kubectl describe pod <name>", desc: "Deep inspect pod events & exit conditions" },
        ],
      },
      {
        category: "Services & Maintenance",
        commands: [
          { cmd: "kubectl expose deployment api --port=80 --target-port=8080 --type=NodePort", desc: "Expose deployment via NodePort" },
          { cmd: "kubectl cordon <node>", desc: "Mark node unschedulable" },
          { cmd: "kubectl drain <node> --ignore-daemonsets --delete-emptydir-data", desc: "Evict all pods from node for maintenance" },
        ],
      },
    ],
  },
  terraform: {
    title: "Terraform IaC Cheatsheet",
    icon: "🌍",
    desc: "Command reference for Terraform lifecycle, state surgery, and provider locks.",
    sections: [
      {
        category: "Core Commands",
        commands: [
          { cmd: "terraform init", desc: "Download providers and configure backend state" },
          { cmd: "terraform fmt -recursive", desc: "Format all .tf files to canonical HCL style" },
          { cmd: "terraform validate", desc: "Validate configuration syntax and arguments" },
          { cmd: "terraform plan -out=tfplan", desc: "Preview planned changes and save execution plan" },
          { cmd: "terraform apply tfplan", desc: "Apply the exact planned changeset" },
          { cmd: "terraform destroy -auto-approve", desc: "Destroy all managed infrastructure" },
        ],
      },
      {
        category: "State Management",
        commands: [
          { cmd: "terraform state list", desc: "List all resources tracked in terraform.tfstate" },
          { cmd: "terraform state show <res>", desc: "Display attributes of a specific resource in state" },
          { cmd: "terraform force-unlock <LOCK_ID>", desc: "Release stuck DynamoDB state lock" },
        ],
      },
    ],
  },
  git: {
    title: "Git Cheatsheet",
    icon: "🔧",
    desc: "Interactive rebasing, reflog disaster recovery, and branching workflows.",
    sections: [
      {
        category: "Branching & Rewriting History",
        commands: [
          { cmd: "git checkout -b feature/auth", desc: "Create and switch to new branch" },
          { cmd: "git rebase -i HEAD~3", desc: "Interactively squash or edit last 3 commits" },
          { cmd: "git reflog", desc: "View history of all git HEAD references (recover lost commits)" },
          { cmd: "git stash push -m 'wip'", desc: "Stash uncommitted changes with description" },
        ],
      },
    ],
  },
  linux: {
    title: "Linux CLI Cheatsheet",
    icon: "🐧",
    desc: "Service management, log diagnostics, and networking utilities.",
    sections: [
      {
        category: "Diagnostics & Networking",
        commands: [
          { cmd: "journalctl -u docker.service -f -n 100", desc: "Follow systemd logs for Docker daemon" },
          { cmd: "ss -tulpn | grep :80", desc: "Check which PID is listening on port 80" },
          { cmd: "curl -iv https://devopslesson.com", desc: "Verbose HTTP/TLS handshake inspection" },
          { cmd: "chmod -R 755 /var/www", desc: "Recursively set directory permissions" },
        ],
      },
    ],
  },
};

export default async function CheatsheetDetailPage({ params }: CheatsheetProps) {
  const resolved = await params;
  const cs = CHEATSHEET_DATA[resolved.tool];

  if (!cs) {
    notFound();
  }

  const playgroundSlug =
    resolved.tool === "docker"
      ? "docker"
      : resolved.tool === "kubernetes"
      ? "kubernetes"
      : resolved.tool === "terraform"
      ? "terraform"
      : "linux";

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/tools/cheatsheets"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> All Cheatsheets
        </Link>

        {/* Header */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-8 sm:p-10 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none select-none">
            {cs.icon}
          </div>
          <span className="text-3xl">{cs.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{cs.title}</h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl">{cs.desc}</p>

          <div className="pt-2">
            <Link
              href={`/playground/${playgroundSlug}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Practice in {cs.title.split(" ")[0]} Sandbox</span>
            </Link>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {cs.sections.map((sec) => (
            <div key={sec.category} className="space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight">{sec.category}</h2>
              <div className="grid grid-cols-1 gap-3">
                {sec.commands.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-[#11131c] border border-orange-500/15 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-orange-500/40 transition-all"
                  >
                    <div className="space-y-1">
                      <code className="text-sm font-mono font-bold text-orange-400 block group-hover:text-orange-300 transition-colors select-all">
                        $ {c.cmd}
                      </code>
                      <div className="text-xs text-gray-400">{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

