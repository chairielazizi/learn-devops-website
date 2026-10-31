import React from "react";
import { notFound } from "next/navigation";
import DockerPlaygroundPage from "@/app/playground/docker/page";
import K8sPlaygroundPage from "@/app/playground/kubernetes/page";
import LinuxPlaygroundPage from "@/app/playground/linux/page";
import TerraformPlaygroundPage from "@/app/playground/terraform/page";

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return [
    { tool: "docker" },
    { tool: "kubernetes" },
    { tool: "linux" },
    { tool: "terraform" },
  ];
}

export default async function PlaygroundLabPage({ params }: Props) {
  const resolved = await params;
  const tool = resolved.tool;

  if (tool === "docker") return <DockerPlaygroundPage />;
  if (tool === "kubernetes") return <K8sPlaygroundPage />;
  if (tool === "linux") return <LinuxPlaygroundPage />;
  if (tool === "terraform") return <TerraformPlaygroundPage />;

  notFound();
}
