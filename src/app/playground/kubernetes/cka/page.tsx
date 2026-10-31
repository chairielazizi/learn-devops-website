"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { K8sEngine, K8sPod, K8sDeployment, K8sNode } from "@/lib/playgrounds/k8sEngine";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import { ArrowLeft, Award, Server, CheckCircle2, Circle, AlertTriangle, Layers } from "lucide-react";

export default function CkaExamPlaygroundPage() {
  const engine = useMemo(() => new K8sEngine("cka"), []);
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

  const worker1 = nodes.find((n) => n.name === "cka-worker-1");
  const isWorker1Drained = worker1?.status === "SchedulingDisabled" && !pods.some((p) => p.node === "cka-worker-1" && p.namespace !== "kube-system");
  const prodDep = deployments.find((d) => d.name === "payment-api" && d.namespace === "prod");

  const tasks = [
    {
      id: "t1",
      title: "Scenario 1: Node Maintenance (Drain Node)",
      desc: "Node 'cka-worker-1' needs kernel upgrades. Cordon and drain the node safely so workloads reschedule: 'kubectl cordon cka-worker-1 && kubectl drain cka-worker-1 --ignore-daemonsets'.",
      completed: !!isWorker1Drained,
    },
    {
      id: "t2",
      title: "Scenario 2: Scale Production Workload",
      desc: "The payment service is experiencing high load. Scale the 'payment-api' deployment in the 'prod' namespace to 4 replicas: 'kubectl scale deployment payment-api -n prod --replicas=4'.",
      completed: (prodDep?.replicas || 0) >= 4,
    },
    {
      id: "t3",
      title: "Scenario 3: Expose Microservice",
      desc: "Expose deployment 'payment-api' in 'prod' as a NodePort service on port 8080: 'kubectl expose deployment payment-api -n prod --port=8080 --type=NodePort'.",
      completed: engine.services.some((s) => s.name === "payment-api" && s.namespace === "prod"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/playground/kubernetes"
              className="inline-flex items-center text-xs text-orange-400 hover:text-orange-300 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Kubernetes Simulator
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <span>🎓</span> CKA Exam <span className="text-gradient-orange">Practice Simulator</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 font-semibold">
            <Award className="w-4 h-4 text-orange-400" /> Multi-Node CKA Exam Environment
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start space-x-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Exam Simulation Mode Active:</strong> You are tasked with resolving realistic cluster scenarios. Use standard kubectl flags and verify workload migration between worker nodes.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Terminal */}
          <div className="lg:col-span-8">
            <InteractiveTerminal
              title="cka-master-terminal"
              subtitle="Kubernetes v1.30.2 (Multi-Node CKA Cluster)"
              promptSymbol="student@cka-control-plane:~$"
              onExecute={handleExecute}
              onReset={handleReset}
              quickCommands={[
                "kubectl get nodes -o wide",
                "kubectl get pods -A -o wide",
                "kubectl cordon cka-worker-1",
                "kubectl drain cka-worker-1 --ignore-daemonsets",
                "kubectl scale deployment payment-api -n prod --replicas=4",
              ]}
              initialLines={[
                "Welcome to the Certified Kubernetes Administrator (CKA) Simulator.",
                "Cluster configured: 1 Control Plane + 2 Worker Nodes.",
                "Production namespaces: prod, dev, default, kube-system.",
                "Type 'kubectl get nodes' to inspect the topology.",
              ]}
            />
          </div>

          {/* CKA Scenarios & Nodes */}
          <div className="lg:col-span-4 space-y-5">
            {/* Cluster Nodes Grid */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">Cluster Topology</span>
                </div>
                <span className="text-xs text-orange-400 font-semibold">{nodes.length} nodes</span>
              </div>
              <div className="space-y-2">
                {nodes.map((n) => (
                  <div key={n.name} className="p-2.5 rounded-lg bg-[#161927] border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-white">{n.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        n.status === "Ready"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {n.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono flex items-center justify-between">
                      <span>Role: {n.role}</span>
                      <span>Pods: {pods.filter((p) => p.node === n.name).length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Scenarios */}
            <div className="bg-[#11131c] rounded-xl border border-orange-500/20 p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Exam Questions</span>
                <span className="text-xs text-gray-400">
                  {tasks.filter((t) => t.completed).length}/{tasks.length} Completed
                </span>
              </div>
              <div className="space-y-3">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border transition-all text-xs ${
                      t.completed
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                        : "bg-[#161927] border-white/5 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-semibold">
                      {t.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                      <span>{t.title}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-gray-400 pl-6 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

