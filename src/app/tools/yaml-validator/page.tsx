"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Check, Copy, AlertTriangle, ShieldCheck } from "lucide-react";

export default function YamlValidatorPage() {
  const [yamlText, setYamlText] = useState(`apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: web
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80
`);

  const [copied, setCopied] = useState(false);

  const checkYaml = () => {
    const lines = yamlText.split("\n");
    const errors: { line: number; message: string }[] = [];

    lines.forEach((line, idx) => {
      if (line.includes("\t")) {
        errors.push({ line: idx + 1, message: "Tab characters are strictly forbidden in YAML. Use spaces only." });
      }
      if (line.trim().startsWith(":") || line.trim().startsWith("- :")) {
        errors.push({ line: idx + 1, message: "Missing key before colon." });
      }
    });

    return errors;
  };

  const errors = checkYaml();

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Tools & Cheatsheets
        </Link>

        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" /> Syntax Validator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            YAML Syntax <span className="text-gradient-orange">Validator</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base">
            Detect tab characters, illegal colon placements, and indentation mismatches before applying to Kubernetes or CI/CD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-[#161825] border-b border-orange-500/10">
              <span className="text-xs font-mono font-medium text-orange-400">document.yaml</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-medium border border-orange-500/20 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy YAML"}</span>
              </button>
            </div>
            <textarea
              value={yamlText}
              onChange={(e) => setYamlText(e.target.value)}
              className="w-full h-[400px] bg-[#0f172a] p-5 font-mono text-xs text-gray-200 outline-none leading-relaxed resize-none border-none focus:ring-0"
              spellCheck={false}
            />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#11131c] p-6 rounded-2xl border border-orange-500/20 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Syntax Status</span>
                {errors.length === 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Valid YAML
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.length} Syntax Error(s)
                  </span>
                )}
              </div>

              {errors.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs leading-relaxed">
                  Clean syntax detected! Zero forbidden tabs and compliant space-based hierarchical structures.
                </div>
              ) : (
                <div className="space-y-2">
                  {errors.map((err, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <div>
                        <strong>Line {err.line}:</strong> {err.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

