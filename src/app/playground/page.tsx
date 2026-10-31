"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Shield, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const PLAYGROUNDS = [
  {
    id: "docker",
    slug: "docker",
    title: "Docker Playground & Lab",
    icon: "🐳",
    badge: "Most Popular",
    desc: "Run containers, pull images, inspect ports, configure volumes, and build Dockerfiles in an instant in-memory simulated Docker daemon.",
    quickCmds: ["docker run -d -p 80:80 nginx", "docker ps", "docker images"],
    stats: "12 Popular Images Available",
  },
  {
    id: "kubernetes",
    slug: "kubernetes",
    title: "Kubernetes Cluster Simulator",
    icon: "☸️",
    badge: "Core Enterprise",
    desc: "Practice kubectl imperatives, deploy microservices, expose services, scale replicas, and inspect pod events with zero cluster fees.",
    quickCmds: ["kubectl get pods", "kubectl create deployment api --image=nginx", "kubectl scale deployment api --replicas=3"],
    stats: "Full Namespace & Workload Support",
  },
  {
    id: "cka",
    slug: "kubernetes/cka",
    title: "CKA Exam Simulator Lab",
    icon: "🎓",
    badge: "Exam Prep",
    desc: "Simulate a real multi-node Kubernetes cluster (control-plane + 2 worker nodes) with pre-configured production workloads, cordon, and drain tasks.",
    quickCmds: ["kubectl get nodes", "kubectl cordon cka-worker-1", "kubectl drain cka-worker-1 --ignore-daemonsets"],
    stats: "Real CKA Exam Scenario Scaffolding",
  },
  {
    id: "linux",
    slug: "linux",
    title: "Linux & Bash Sandbox",
    icon: "🐧",
    badge: "Prerequisite",
    desc: "Full hierarchical virtual file system (VFS) with cd, ls, cat, touch, mkdir, grep, pipes (|), and stream redirections (> and >>).",
    quickCmds: ["ls -la", "cat README.md", "cat app/package.json | grep version"],
    stats: "Full In-Memory VFS Hierarchy",
  },
  {
    id: "terraform",
    slug: "terraform",
    title: "Terraform IaC Sandbox",
    icon: "🌍",
    badge: "IaC Workflow",
    desc: "Parse HCL code blocks, run terraform init, fmt, validate, generate execution plans, and apply simulated AWS VPC & EC2 resources.",
    quickCmds: ["terraform init", "terraform plan", "terraform apply", "terraform show"],
    stats: "AWS Provider & State Engine",
  },
];

export default function PlaygroundIndexPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" /> 100% In-Browser Simulated Environments
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive <span className="text-gradient-orange">DevOps Playgrounds</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Type real commands in high-fidelity browser terminals. No credit card, no cloud bills, no setup, and nothing to break.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#11131c] border border-orange-500/15 p-4 rounded-xl flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Sub-Millisecond Speed</div>
              <div className="text-xs text-gray-400">0ms network lag with local JS state</div>
            </div>
          </div>
          <div className="bg-[#11131c] border border-orange-500/15 p-4 rounded-xl flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Zero Sandbox Risk</div>
              <div className="text-xs text-gray-400">Isolated memory state, 100% safe</div>
            </div>
          </div>
          <div className="bg-[#11131c] border border-orange-500/15 p-4 rounded-xl flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Visual State Inspectors</div>
              <div className="text-xs text-gray-400">Live cards for active pods & containers</div>
            </div>
          </div>
        </div>

        {/* Playgrounds List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLAYGROUNDS.map((item) => (
            <div
              key={item.id}
              className="bg-[#11131c] border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all shadow-xl hover:shadow-orange-950/20 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{item.icon}</div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

                {/* Sample commands */}
                <div className="bg-[#0f172a] p-3 rounded-xl border border-white/5 space-y-1.5 font-mono text-xs">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-sans font-semibold">Supported Commands:</div>
                  {item.quickCmds.map((cmd) => (
                    <div key={cmd} className="text-orange-400/90 truncate">
                      $ {cmd}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">{item.stats}</span>
                <Link
                  href={`/playground/${item.slug}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all"
                >
                  <span>Launch Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

