"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { TerraformEngine, TfResource } from "@/lib/playgrounds/terraformEngine";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import PlaygroundPrimerSection from "@/components/playground/PlaygroundPrimerSection";
import { ArrowLeft, Globe, Database, CheckCircle2, Circle, FileCode, Check } from "lucide-react";

export default function TerraformPlaygroundPage() {
  const engine = useMemo(() => new TerraformEngine(), []);
  const [state, setState] = useState<TfResource[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [activeFile, setActiveFile] = useState<"main.tf" | "outputs.tf">("main.tf");

  const syncState = () => {
    setState([...engine.state]);
    setInitialized(engine.initialized);
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

  const tasks = [
    {
      id: "t-1",
      title: "Task 1: Initialize Provider Plugins",
      desc: "Run 'terraform init' to download simulated AWS provider plugins.",
      completed: initialized,
    },
    {
      id: "t-2",
      title: "Task 2: Dry Run Execution Plan",
      desc: "Run 'terraform plan' to calculate the diff before applying changes.",
      completed: engine.lastCommand.includes("plan"),
    },
    {
      id: "t-3",
      title: "Task 3: Apply Infrastructure",
      desc: "Provision the VPC and EC2 instances: 'terraform apply'.",
      completed: state.length > 0,
    },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
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
              <span>🌍</span> Terraform <span className="text-gradient-orange">IaC Simulator</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className={`px-2.5 py-1 rounded-full font-bold ${
              initialized ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}>
              {initialized ? "Initialized" : "Not Initialized"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <InteractiveTerminal
              title="terraform-runner"
              subtitle="Terraform v1.8.2 & AWS Provider"
              promptSymbol="devops@iac-box:~/infra$"
              onExecute={handleExecute}
              onReset={handleReset}
              quickCommands={[
                "terraform init",
                "terraform fmt",
                "terraform validate",
                "terraform plan",
                "terraform apply",
                "terraform show",
                "terraform destroy",
              ]}
              initialLines={[
                "Terraform In-Browser IaC Simulator v1.8.2",
                "Working directory: /home/devops/infra (main.tf, outputs.tf)",
                "Run 'terraform init' to begin.",
              ]}
            />
          </div>

          <div className="lg:col-span-4 space-y-5">
            {/* HCL Viewer */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm font-bold text-white">
                  <FileCode className="w-4 h-4 text-orange-400" />
                  <span>Configuration Files</span>
                </div>
                <div className="flex space-x-1">
                  {(["main.tf", "outputs.tf"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFile(f)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                        activeFile === f ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <pre className="p-3 rounded-lg bg-[#090a0f] border border-white/5 font-mono text-[11px] text-gray-300 max-h-[180px] overflow-y-auto leading-relaxed">
                {engine.files[activeFile]}
              </pre>
            </div>

            {/* Live State Inspector */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm font-bold text-white">
                  <Database className="w-4 h-4 text-orange-400" />
                  <span>terraform.tfstate</span>
                </div>
                <span className="text-xs text-orange-400 font-semibold">{state.length} resources</span>
              </div>
              {state.length === 0 ? (
                <div className="text-center py-4 text-xs text-gray-500 border border-dashed border-white/5 rounded-lg">
                  State is empty. Execute <code className="text-orange-400">terraform apply</code> to provision.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {state.map((r) => (
                    <div key={r.name} className="p-2 rounded bg-[#161927] border border-white/5 text-xs font-mono space-y-0.5">
                      <div className="text-orange-300 font-semibold">{r.type}.{r.name}</div>
                      <div className="text-[10px] text-gray-400 truncate">id: {r.id}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tasks */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3.5 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-400">IaC Objectives</div>
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
        <PlaygroundPrimerSection tool="terraform" />
      </div>
    </div>
  );
}

