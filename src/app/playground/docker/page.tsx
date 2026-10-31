"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DockerEngine, DockerContainer, DockerImage } from "@/lib/playgrounds/dockerEngine";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import PlaygroundPrimerSection from "@/components/playground/PlaygroundPrimerSection";
import { ArrowLeft, Box, Server, CheckCircle2, Circle, Layers, RefreshCw, Cpu, HardDrive } from "lucide-react";

export default function DockerPlaygroundPage() {
  const engine = useMemo(() => new DockerEngine(), []);
  const [containers, setContainers] = useState<DockerContainer[]>([]);
  const [images, setImages] = useState<DockerImage[]>([...engine.images]);
  const [activeTab, setActiveTab] = useState<"terminal" | "visualizer" | "challenges">("terminal");

  const syncState = () => {
    setContainers([...engine.containers]);
    setImages([...engine.images]);
  };

  const handleExecute = (cmd: string) => {
    const res = engine.exec(cmd);
    syncState();
    return res;
  };

  const handleReset = () => {
    engine.reset();
    syncState();
  };

  // Challenges
  const challenges = [
    {
      id: "ch-1",
      title: "Task 1: Pull an Image",
      desc: "Download the 'redis' image into local cache using 'docker pull redis'.",
      completed: images.some((i) => i.repository === "redis"),
    },
    {
      id: "ch-2",
      title: "Task 2: Launch Nginx Web Server",
      desc: "Run an Nginx container in background on port 80: 'docker run -d -p 80:80 nginx'.",
      completed: containers.some((c) => c.image.startsWith("nginx") && c.status.startsWith("Up")),
    },
    {
      id: "ch-3",
      title: "Task 3: Assign a Custom Name",
      desc: "Start a named container with '--name my-cache redis'.",
      completed: containers.some((c) => c.name === "my-cache"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/playground"
              className="inline-flex items-center text-xs text-orange-400 hover:text-orange-300 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Playgrounds
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <span>🐳</span> Docker <span className="text-gradient-orange">Sandbox & Lab</span>
            </h1>
          </div>

          {/* Tab selector */}
          <div className="flex bg-[#121420] p-1 rounded-xl border border-orange-500/20 text-xs">
            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "terminal" ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20" : "text-gray-400 hover:text-white"
              }`}
            >
              Terminal & Workbench
            </button>
            <button
              onClick={() => setActiveTab("visualizer")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "visualizer" ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20" : "text-gray-400 hover:text-white"
              }`}
            >
              Visual State ({containers.length} active)
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "challenges" ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20" : "text-gray-400 hover:text-white"
              }`}
            >
              Guided Challenges
            </button>
          </div>
        </div>

        {/* Content based on Active Tab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Terminal Column */}
          <div className={`${activeTab === "visualizer" ? "lg:col-span-6 hidden lg:block" : "lg:col-span-8"}`}>
            <InteractiveTerminal
              title="docker-engine-sim"
              subtitle="Ubuntu 24.04 (v26.1.0)"
              promptSymbol="devops@docker-box:~$"
              onExecute={handleExecute}
              onReset={handleReset}
              quickCommands={[
                "docker run -d -p 80:80 nginx",
                "docker ps",
                "docker pull redis",
                "docker images",
                "docker run -d --name my-cache redis",
              ]}
              initialLines={[
                "Docker In-Browser Sandbox Daemon v26.1.0",
                "Type 'docker run -d -p 80:80 nginx' to start your first container.",
                "Type 'help' or 'docker --help' for command syntax.",
              ]}
            />
          </div>

          {/* Visual State & Inspector Column */}
          <div className={`${activeTab === "visualizer" ? "lg:col-span-6" : "lg:col-span-4"} space-y-5`}>
            {/* Live Containers Card */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Box className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">Live Containers</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {containers.length} running
                </span>
              </div>

              {containers.length === 0 ? (
                <div className="text-center py-6 text-xs text-gray-500 border border-dashed border-white/5 rounded-xl">
                  No containers running. Run <code className="text-orange-400">docker run -d nginx</code> in the terminal.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {containers.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-lg bg-[#161927] border border-orange-500/15 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {c.name}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">ID: {c.id}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 flex items-center justify-between font-mono">
                        <span>Image: <strong className="text-orange-300">{c.image}</strong></span>
                        <span>{c.ports || "No port"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Downloaded Images Card */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">Local Images Cache</span>
                </div>
                <span className="text-xs text-gray-400">{images.length} images</span>
              </div>
              <div className="space-y-1.5">
                {images.map((img) => (
                  <div key={img.id} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-[#161927]">
                    <span className="font-mono text-gray-200">{img.repository}:{img.tag}</span>
                    <span className="text-orange-400 text-[11px] font-mono">{img.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guided Challenge Panel */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Lab Objectives</span>
                <span className="text-xs text-gray-400">
                  {challenges.filter((c) => c.completed).length}/{challenges.length} Done
                </span>
              </div>
              <div className="space-y-2.5">
                {challenges.map((ch) => (
                  <div
                    key={ch.id}
                    className={`p-3 rounded-lg border transition-all ${
                      ch.completed
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                        : "bg-[#161927] border-white/5 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-xs font-semibold">
                      {ch.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                      <span>{ch.title}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-gray-400 pl-6 leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual Primer & FAQs */}
        <PlaygroundPrimerSection tool="docker" />
      </div>
    </div>
  );
}

