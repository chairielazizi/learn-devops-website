"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Download, Layers, ShieldCheck } from "lucide-react";

export default function K8sYamlGeneratorPage() {
  const [resourceType, setResourceType] = useState<"deployment" | "service" | "configmap">("deployment");
  const [name, setName] = useState("web-api");
  const [namespace, setNamespace] = useState("default");
  const [image, setImage] = useState("nginx:1.25-alpine");
  const [replicas, setReplicas] = useState(3);
  const [port, setPort] = useState(80);
  const [targetPort, setTargetPort] = useState(80);
  const [svcType, setSvcType] = useState("ClusterIP");
  const [copied, setCopied] = useState(false);

  const generateYaml = () => {
    if (resourceType === "deployment") {
      return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${name}
    env: production
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
      - name: ${name}
        image: ${image}
        ports:
        - containerPort: ${targetPort}
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /healthz
            port: ${targetPort}
          initialDelaySeconds: 15
          periodSeconds: 20
        readinessProbe:
          httpGet:
            path: /ready
            port: ${targetPort}
          initialDelaySeconds: 5
          periodSeconds: 10
`;
    }

    if (resourceType === "service") {
      return `apiVersion: v1
kind: Service
metadata:
  name: ${name}-svc
  namespace: ${namespace}
  labels:
    app: ${name}
spec:
  type: ${svcType}
  selector:
    app: ${name}
  ports:
  - protocol: TCP
    port: ${port}
    targetPort: ${targetPort}
`;
    }

    return `apiVersion: v1
kind: ConfigMap
metadata:
  name: ${name}-config
  namespace: ${namespace}
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
`;
  };

  const yamlContent = generateYaml();

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Tools & Cheatsheets
        </Link>

        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" /> Kubernetes Manifest Builder
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kubernetes YAML <span className="text-gradient-orange">Generator</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base">
            Visually assemble production-ready Kubernetes manifests with best-practice probes, resource limits, and selectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls form */}
          <div className="lg:col-span-5 bg-[#11131c] p-6 rounded-2xl border border-orange-500/20 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resource Kind</label>
              <div className="grid grid-cols-3 gap-2">
                {(["deployment", "service", "configmap"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setResourceType(t)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                      resourceType === t
                        ? "bg-gradient-orange text-white border-orange-500 shadow-lg shadow-orange-500/20"
                        : "bg-[#181a28] text-gray-300 border-white/5 hover:border-orange-500/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Application Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Namespace</label>
                <input
                  type="text"
                  value={namespace}
                  onChange={(e) => setNamespace(e.target.value)}
                  className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                />
              </div>

              {resourceType === "deployment" && (
                <>
                  <div>
                    <label className="text-xs text-gray-400">Container Image</label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm font-mono outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400">Replicas</label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={replicas}
                        onChange={(e) => setReplicas(parseInt(e.target.value) || 1)}
                        className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Container Port</label>
                      <input
                        type="number"
                        value={targetPort}
                        onChange={(e) => setTargetPort(parseInt(e.target.value) || 80)}
                        className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {resourceType === "service" && (
                <>
                  <div>
                    <label className="text-xs text-gray-400">Service Type</label>
                    <select
                      value={svcType}
                      onChange={(e) => setSvcType(e.target.value)}
                      className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                    >
                      <option value="ClusterIP">ClusterIP (Internal Only)</option>
                      <option value="NodePort">NodePort (Expose on Node IP)</option>
                      <option value="LoadBalancer">LoadBalancer (Cloud Provider)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400">Service Port</label>
                      <input
                        type="number"
                        value={port}
                        onChange={(e) => setPort(parseInt(e.target.value) || 80)}
                        className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Target Port</label>
                      <input
                        type="number"
                        value={targetPort}
                        onChange={(e) => setTargetPort(parseInt(e.target.value) || 80)}
                        className="w-full mt-1 bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white px-3.5 py-2 rounded-lg text-sm outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center space-x-2 text-xs text-orange-400/90">
              <ShieldCheck className="w-4 h-4 shrink-0 text-orange-400" />
              <span>Includes production health probes and resource limits automatically.</span>
            </div>
          </div>

          {/* YAML Live Preview */}
          <div className="lg:col-span-7 bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-[#161825] border-b border-orange-500/10">
              <span className="text-xs font-mono font-medium text-orange-400">manifest.yaml</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-medium border border-orange-500/20 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Manifest"}</span>
              </button>
            </div>
            <pre className="p-6 font-mono text-xs sm:text-sm text-gray-200 overflow-x-auto leading-relaxed flex-1 select-all">
              {yamlContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

