"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ArrowRight, Terminal } from "lucide-react";

const CHEATSHEETS = [
  { id: "docker", name: "Docker Cheatsheet", desc: "Container run flags, lifecycle, prune commands, multi-stage syntax, and network diagnostics.", icon: "🐳" },
  { id: "kubernetes", name: "Kubernetes / Kubectl Cheatsheet", desc: "Top kubectl commands, JSONPath filtering, dry-run generators, and rollout debugging.", icon: "☸️" },
  { id: "terraform", name: "Terraform Cheatsheet", desc: "Init, plan, apply, state rm, state mv, import, taint, and backend configuration commands.", icon: "🌍" },
  { id: "git", name: "Git Cheatsheet", desc: "Interactive rebase, reflog recovery, cherry-pick, reset vs revert, and branch stash.", icon: "🔧" },
  { id: "linux", name: "Linux CLI Cheatsheet", desc: "Systemd service control, journalctl, network diagnostic tools (dig, curl, ss), and pipes.", icon: "🐧" },
];

export default function CheatsheetsIndexPage() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Tools
        </Link>

        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" /> Quick References
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps <span className="text-gradient-orange">Cheatsheets</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            High-density command cheat cards for daily engineering workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHEATSHEETS.map((cs) => (
            <div
              key={cs.id}
              className="bg-[#11131c] rounded-2xl border border-orange-500/20 hover:border-orange-500/50 p-6 flex flex-col justify-between shadow-xl transition-all group"
            >
              <div className="space-y-3">
                <span className="text-4xl">{cs.icon}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {cs.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{cs.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/tools/cheatsheets/${cs.id}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>View Cheatsheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/playground/${cs.id === "git" ? "linux" : cs.id}`}
                  className="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Try in Sandbox</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

