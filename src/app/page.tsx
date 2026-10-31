"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Terminal,
  ArrowRight,
  BookOpen,
  Wrench,
  AlertCircle,
  Compass,
  Award,
  Sparkles,
  Shield,
  Zap,
  Play,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Layers,
} from "lucide-react";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import { DockerEngine } from "@/lib/playgrounds/dockerEngine";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";
import { TOOLS_LIST } from "@/data/toolsData";
import { TROUBLESHOOTING_GUIDES } from "@/data/troubleshootingData";
import { ROADMAPS } from "@/data/roadmapsData";

export default function HomePage() {
  const heroEngine = useMemo(() => new DockerEngine(), []);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Dark Orange Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none select-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-950/20">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Zero-Install In-Browser Simulation Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Master DevOps by Doing.{" "}
            <span className="text-gradient-orange block mt-1">Right in Your Browser.</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop passively watching video tutorials. Type real <strong className="text-gray-200">Docker</strong>, <strong className="text-gray-200">Kubernetes</strong>, <strong className="text-gray-200">Terraform</strong>, and <strong className="text-gray-200">Linux</strong> commands in zero-latency simulated terminals that verify your work step by step.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/playground/docker"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-orange text-white text-sm font-bold shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Docker Playground</span>
            </Link>
            <Link
              href="/tutorials"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#131622] hover:bg-[#181b29] text-gray-300 hover:text-white border border-orange-500/25 text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>Browse 260+ Tutorials</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#11131c] border border-orange-500/15 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">260+</div>
              <div className="text-xs text-gray-400 mt-1">Free Tutorials</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#11131c] border border-orange-500/15 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">14</div>
              <div className="text-xs text-gray-400 mt-1">Browser Playgrounds</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#11131c] border border-orange-500/15 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">82</div>
              <div className="text-xs text-gray-400 mt-1">Incident Playbooks</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#11131c] border border-orange-500/15 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-gray-400 mt-1">Free & Zero Login</div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Terminal */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
              Live Sandbox Preview (Try it now)
            </span>
          </div>
          <InteractiveTerminal
            title="sandbox-preview"
            subtitle="Live In-Memory Daemon"
            promptSymbol="devops@quick-test:~$"
            onExecute={(cmd) => heroEngine.exec(cmd)}
            onReset={() => heroEngine.reset()}
            quickCommands={[
              "docker run -d -p 80:80 nginx",
              "docker ps",
              "docker pull redis",
              "docker images",
            ]}
            initialLines={[
              "Welcome to DevOpsLesson Interactive Sandbox.",
              "Try clicking any Quick Run button or type 'docker run -d -p 80:80 nginx' below.",
            ]}
          />
        </div>
      </section>

      {/* PLAYGROUNDS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              Zero-Setup Environments
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive <span className="text-gradient-orange">Playground Labs</span>
            </h2>
          </div>
          <Link
            href="/playground"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All Playgrounds</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 hover:border-orange-500/50 p-6 flex flex-col justify-between shadow-xl transition-all group">
            <div className="space-y-3">
              <div className="text-4xl">🐳</div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                Docker Sandbox
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Run containers, map host ports, mount volumes, inspect logs, and build Dockerfiles in an in-memory client engine.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                href="/playground/docker"
                className="w-full py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/25 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Launch Docker Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 hover:border-orange-500/50 p-6 flex flex-col justify-between shadow-xl transition-all group">
            <div className="space-y-3">
              <div className="text-4xl">☸️</div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                Kubernetes Cluster
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Practice kubectl imperatives, deployments, cluster services, replica scaling, and CKA multi-node drain tasks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                href="/playground/kubernetes"
                className="w-full py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/25 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Launch K8s Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 hover:border-orange-500/50 p-6 flex flex-col justify-between shadow-xl transition-all group">
            <div className="space-y-3">
              <div className="text-4xl">🌍</div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                Terraform IaC Sandbox
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Parse HCL files, run terraform init, validate, calculate execution plans, and apply simulated AWS VPC & EC2 state.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                href="/playground/terraform"
                className="w-full py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/25 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Launch Terraform Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM TRACKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              Structured Learning Paths
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Core DevOps <span className="text-gradient-orange">Tracks</span>
            </h2>
          </div>
          <Link
            href="/tutorials"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>All 8 Learning Tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TUTORIAL_TRACKS.slice(0, 8).map((track) => (
            <Link
              key={track.id}
              href={`/tutorials/${track.slug}`}
              className="bg-[#11131c] hover:bg-[#151825] border border-orange-500/20 hover:border-orange-500/50 p-5 rounded-2xl transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{track.icon}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {track.level}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {track.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium text-orange-400">
                <span>{track.lessonsCount} Lessons</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DEVELOPER TOOLS & CHEATSHEETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              Online Utilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              DevOps <span className="text-gradient-orange">Tools & Linters</span>
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS_LIST.slice(0, 4).map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="bg-[#11131c] hover:bg-[#151825] border border-orange-500/20 hover:border-orange-500/50 p-5 rounded-2xl transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="text-3xl">{tool.icon}</span>
                <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-orange-400">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-center text-white space-y-5 shadow-2xl shadow-orange-950/40 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Start Practicing DevOps Free in 10 Seconds
            </h2>
            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              No registration required. Experience the power of our zero-install in-browser simulated terminal.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/playground/docker"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gray-950 text-white hover:bg-black font-bold text-sm shadow-xl transition-all hover:scale-105"
            >
              <Terminal className="w-4 h-4 text-orange-400" />
              <span>Launch Docker Playground Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
