import React from "react";
import { notFound } from "next/navigation";
import fullCheatsheetData from "@/data/cheatsheetsFullData.json";
import CheatsheetClient from "./CheatsheetClient";

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

const META: Record<string, { title: string; icon: string; desc: string }> = {
  docker: {
    title: "Docker Cheatsheet",
    icon: "🐳",
    desc: "Complete Docker command reference: container management, multi-stage image builds, volume mounts, network bridges, and Docker Compose."
  },
  kubernetes: {
    title: "Kubernetes (kubectl) Cheatsheet",
    icon: "☸️",
    desc: "Production kubectl cheatsheet for CKA prep, cluster administration, Pod debugging, Deployments, Services, RBAC, and Helm."
  },
  terraform: {
    title: "Terraform Cheatsheet",
    icon: "🏗️",
    desc: "Infrastructure as Code reference: terraform state locking, CLI commands, variable files, workspace switching, and module patterns."
  },
  git: {
    title: "Git Cheatsheet",
    icon: "🐙",
    desc: "Essential Git commands for branching, merging, interactive rebasing, stash operations, reflog disaster recovery, and cherry-picking."
  },
  linux: {
    title: "Linux & Bash Cheatsheet",
    icon: "🐧",
    desc: "SysAdmin quick reference: file permissions, process monitoring, systemd service management, network triage, and text manipulation."
  }
};

export default async function CheatsheetDetailPage({ params }: CheatsheetProps) {
  const resolved = await params;
  const toolSlug = resolved.tool;
  const meta = META[toolSlug];
  const sections = (fullCheatsheetData as any)[toolSlug];

  if (!meta || !sections) {
    notFound();
  }

  const data = {
    tool: toolSlug,
    title: meta.title,
    icon: meta.icon,
    desc: meta.desc,
    sections: sections,
  };

  return <CheatsheetClient data={data} />;
}
