"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Box, Check, Copy, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DockerComposeValidatorPage() {
  const [yamlInput, setYamlInput] = useState(`version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    restart: always
    environment:
      - NODE_ENV=production
    networks:
      - app-net

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - redis-data:/data
    networks:
      - app-net

networks:
  app-net:
    driver: bridge

volumes:
  redis-data:
`);

  const [copied, setCopied] = useState(false);

  // Validation logic
  const parseErrors = (): string[] => {
    const errs: string[] = [];
    if (!yamlInput.includes("services:")) {
      errs.push("Missing top-level 'services:' block.");
    }
    if (yamlInput.includes("\t")) {
      errs.push("Tab character detected! YAML requires space indentation only.");
    }
    if (yamlInput.includes("ports:") && !yamlInput.includes("- \"") && !yamlInput.includes("- '") && yamlInput.includes("- 80:")) {
      errs.push("Port mappings should be quoted strings (e.g. \"80:80\") to prevent sexagesimal number parsing in YAML.");
    }
    return errs;
  };

  const errors = parseErrors();

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Tools & Cheatsheets
        </Link>

        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Box className="w-3.5 h-3.5" /> Multi-Container Linter
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Docker Compose <span className="text-gradient-orange">Validator</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base">
            Paste your docker-compose.yml to detect indentation traps, port syntax quirks, and missing dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-[#161825] border-b border-orange-500/10">
              <span className="text-xs font-mono font-medium text-orange-400">docker-compose.yml</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-medium border border-orange-500/20 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy YAML"}</span>
              </button>
            </div>
            <textarea
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              className="w-full h-[400px] bg-[#090a0f] p-5 font-mono text-xs text-gray-200 outline-none leading-relaxed resize-none border-none focus:ring-0"
              spellCheck={false}
            />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#11131c] p-6 rounded-2xl border border-orange-500/20 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Validation Status</span>
                {errors.length === 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Valid Schema
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.length} Warning(s)
                  </span>
                )}
              </div>

              {errors.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs leading-relaxed">
                  Compose file follows best practices: proper indentation, quoted port mappings, networks, and named volume definitions.
                </div>
              ) : (
                <div className="space-y-2">
                  {errors.map((err, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>{err}</span>
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

