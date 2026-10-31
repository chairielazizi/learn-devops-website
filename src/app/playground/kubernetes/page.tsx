"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { K8sEngine, K8sPod, K8sDeployment, K8sNode } from "@/lib/playgrounds/k8sEngine";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import PlaygroundPrimerSection from "@/components/playground/PlaygroundPrimerSection";
import { ArrowLeft, Server, Activity, CheckCircle2, Circle, ShieldCheck, Box, HardDrive } from "lucide-react";

export default function K8sPlaygroundPage() {
  const engine = useMemo(() => new K8sEngine("default"), []);
  const [pods, setPods] = useState<K8sPod[]>([...engine.pods]);
  const [deployments, setDeployments] = useState<K8sDeployment[]>([...engine.deployments]);
  const [nodes, setNodes] = useState<K8sNode[]>([...engine.nodes]);

  const syncState = () => {
    setPods([...engine.pods]);
    setDeployments([...engine.deployments]);
    setNodes([...engine.nodes]);
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

  const challenges = [
    {
      id: "k-1",
      title: "Task 1: Inspect Nodes",
      desc: "Run 'kubectl get nodes' to verify cluster control-plane health.",
      completed: engine.lastCommand.includes("get nodes") || engine.lastCommand.includes("get no"),
    },
    {
      id: "k-2",
      title: "Task 2: Launch a Pod",
      desc: "Run 'kubectl run test-pod --image=nginx' in default namespace.",
      completed: pods.some((p) => p.name === "test-pod" && p.status === "Running"),
    },
    {
      id: "k-3",
      title: "Task 3: Create Deployment",
      desc: "Create a deployment: 'kubectl create deployment web-app --image=nginx'.",
      completed: deployments.some((d) => d.name === "web-app"),
    },
    {
      id: "k-4",
      title: "Task 4: Scale to 3 Replicas",
      desc: "Scale the deployment: 'kubectl scale deployment web-app --replicas=3'.",
      completed: deployments.some((d) => d.name === "web-app" && d.replicas >= 3),
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
              <span>☸️</span> Kubernetes <span className="text-gradient-orange">Cluster Simulator</span>
            </h1>
          </div>

          <Link
            href="/playground/kubernetes/cka"
            className="px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" /> Switch to CKA Exam Multi-Node Mode →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Terminal */}
          <div className="lg:col-span-8">
            <InteractiveTerminal
              title="control-plane:~#"
              subtitle="Kubernetes v1.30.2"
              promptSymbol="root@k8s-node:~#"
              onExecute={handleExecute}
              onReset={handleReset}
              quickCommands={[
                "kubectl get nodes",
                "kubectl get pods -A",
                "kubectl run test-pod --image=nginx",
                "kubectl create deployment web-app --image=nginx",
                "kubectl scale deployment web-app --replicas=3",
                "kubectl get deploy",
              ]}
              initialLines={[
                "Kubernetes Cluster Environment v1.30.2 (Simulated)",
                "Try running 'kubectl get nodes' or 'kubectl get pods -A'.",
                "Aliases configured: 'k' is mapped to 'kubectl'.",
              ]}
            />
          </div>

          {/* Visual Topology & Objectives */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Pods */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">Live Pod Grid</span>
                </div>
                <span className="text-xs text-orange-400 font-semibold">{pods.length} pods</span>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {pods.map((p) => (
                  <div key={p.name} className="p-2.5 rounded-lg bg-[#161927] border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white truncate max-w-[160px]">{p.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>ns: {p.namespace}</span>
                      <span>IP: {p.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cluster Nodes */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">Cluster Nodes</span>
                </div>
                <span className="text-xs text-gray-400">{nodes.length} node</span>
              </div>
              {nodes.map((n) => (
                <div key={n.name} className="p-2.5 rounded-lg bg-[#161927] border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{n.name}</div>
                    <div className="text-[10px] text-gray-400">{n.role} · {n.version}</div>
                  </div>
                  <span className="text-emerald-400 font-bold">{n.status}</span>
                </div>
              ))}
            </div>

            {/* Objectives */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-400">Kubectl Objectives</div>
              <div className="space-y-2">
                {challenges.map((ch) => (
                  <div key={ch.id} className="p-2.5 rounded-lg bg-[#161927] border border-white/5 text-xs">
                    <div className="flex items-center space-x-2 font-semibold text-white">
                      {ch.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Circle className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
                      <span>{ch.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 pl-5">{ch.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual Primer & FAQs */}
        <PlaygroundPrimerSection tool="kubernetes" />
      </div>
    </div>
  );
}

