"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TRACK_LINKS = [
  { label: "DOCKER", href: "/tutorials/docker", key: "docker" },
  { label: "KUBERNETES", href: "/tutorials/kubernetes", key: "kubernetes" },
  { label: "TERRAFORM", href: "/tutorials/terraform", key: "terraform" },
  { label: "AWS", href: "/tutorials/aws", key: "aws" },
  { label: "CI/CD", href: "/tutorials/cicd", key: "cicd" },
  { label: "GITHUB ACTIONS", href: "/tutorials/github-actions", key: "github-actions" },
  { label: "LINUX", href: "/tutorials/linux", key: "linux" },
  { label: "GIT", href: "/tutorials/git", key: "git" },
  { label: "DEVOPS ROADMAP", href: "/roadmaps/devops-engineer", key: "roadmaps/devops-engineer" },
  { label: "CLOUD ROADMAP", href: "/roadmaps/cloud-engineer", key: "roadmaps/cloud-engineer" },
  { label: "SRE ROADMAP", href: "/roadmaps/sre", key: "roadmaps/sre" },
  { label: "GIT CHEATSHEET", href: "/tools/cheatsheets/git", key: "cheatsheets/git" },
  { label: "DOCKER CHEATSHEET", href: "/tools/cheatsheets/docker", key: "cheatsheets/docker" },
  { label: "K8S CHEATSHEET", href: "/tools/cheatsheets/kubernetes", key: "cheatsheets/kubernetes" },
  { label: "TF CHEATSHEET", href: "/tools/cheatsheets/terraform", key: "cheatsheets/terraform" },
];

export default function TutorialTopNav({ currentTrack }: { currentTrack: string }) {
  const pathname = usePathname();

  return (
    <div className="w-full bg-[#0d1527] border-b border-slate-800 text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar py-2 px-4 sm:px-6">
      <div className="flex items-center space-x-2 whitespace-nowrap min-w-max">
        {TRACK_LINKS.map((t) => {
          const isActive = currentTrack === t.key || pathname.includes(`/tutorials/${t.key}`);
          return (
            <Link
              key={t.label}
              href={t.href}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

