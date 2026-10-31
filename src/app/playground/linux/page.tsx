"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { LinuxEngine } from "@/lib/playgrounds/linuxEngine";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import PlaygroundPrimerSection from "@/components/playground/PlaygroundPrimerSection";
import { ArrowLeft, Folder, FileText, CheckCircle2, Circle, Terminal as TermIcon } from "lucide-react";

export default function LinuxPlaygroundPage() {
  const engine = useMemo(() => new LinuxEngine(), []);
  const [currentPath, setCurrentPath] = useState("/home/devops");

  const handleExecute = (cmd: string) => {
    const res = engine.exec(cmd);
    setCurrentPath(engine.cwdString());
    return res;
  };

  const handleReset = () => {
    engine.reset();
    setCurrentPath(engine.cwdString());
  };

  const tasks = [
    {
      id: "l1",
      title: "Task 1: Inspect Files",
      desc: "Run 'ls -la' to see permissions and hidden files.",
      completed: engine.lastCommand.includes("ls"),
    },
    {
      id: "l2",
      title: "Task 2: Read README",
      desc: "Read the readme file using 'cat README.md'.",
      completed: engine.lastCommand.includes("cat README"),
    },
    {
      id: "l3",
      title: "Task 3: Create a Directory",
      desc: "Create a new directory called 'logs': 'mkdir logs'.",
      completed: engine.lastCommand.includes("mkdir logs"),
    },
    {
      id: "l4",
      title: "Task 4: Output Redirection",
      desc: "Write text into a file using redirection: 'echo \"build=success\" > build.info'.",
      completed: engine.lastCommand.includes(">") && engine.lastCommand.includes("build.info"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/playground"
              className="inline-flex items-center text-xs text-orange-400 hover:text-orange-300 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Playgrounds
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <span>🐧</span> Linux & Bash <span className="text-gradient-orange">Command Sandbox</span>
            </h1>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-orange-400">
            pwd: {currentPath}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <InteractiveTerminal
              title="bash - cloud-shell"
              subtitle="Ubuntu 24.04 LTS (VFS Kernel Simulator)"
              promptSymbol="devops@cloud-shell:~$"
              onExecute={handleExecute}
              onReset={handleReset}
              quickCommands={[
                "ls -la",
                "cat README.md",
                "pwd",
                "cd app && ls",
                "cat app/package.json | grep version",
                "echo 'test=true' > config.env",
              ]}
              initialLines={[
                "Linux Virtual File System (VFS) Shell",
                "Type 'ls -la', 'cat README.md', or 'help' to start practicing.",
              ]}
            />
          </div>

          <div className="lg:col-span-4 space-y-5">
            {/* VFS Tree Explorer */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3 shadow-xl">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Folder className="w-4 h-4 text-orange-400" />
                <span>Virtual Filesystem Structure</span>
              </div>
              <div className="bg-[#0f172a] p-3 rounded-lg border border-white/5 font-mono text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <div className="text-orange-400 font-bold">/home/devops/ (Home)</div>
                <div className="pl-4 flex items-center gap-1.5 text-gray-300">
                  <FileText className="w-3.5 h-3.5 text-orange-400/80" /> README.md
                </div>
                <div className="pl-4 text-white font-semibold">📁 app/</div>
                <div className="pl-8 text-gray-400">📄 server.js</div>
                <div className="pl-8 text-gray-400">📄 package.json</div>
                <div className="pl-4 text-white font-semibold">📁 scripts/</div>
                <div className="pl-8 text-emerald-400">⚙️ backup.sh (755)</div>
                <div className="text-gray-400 font-bold mt-2">/etc/hosts · /var/log/syslog.log</div>
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3.5 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-400">Linux Practice Tasks</div>
              <div className="space-y-2.5">
                {tasks.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-lg bg-[#161927] border border-white/5 text-xs">
                    <div className="flex items-center space-x-2 font-semibold text-white">
                      {t.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Circle className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
                      <span>{t.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 pl-5">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual Primer & FAQs */}
        <PlaygroundPrimerSection tool="linux" />
      </div>
    </div>
  );
}

