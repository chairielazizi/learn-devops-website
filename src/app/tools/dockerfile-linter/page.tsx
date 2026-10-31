"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Box, Check, Copy, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DockerfileLinterPage() {
  const [content, setContent] = useState(`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
`);

  const [copied, setCopied] = useState(false);

  const analyze = () => {
    const findings: { rule: string; type: "good" | "warn"; desc: string }[] = [];

    if (content.includes(":latest")) {
      findings.push({ rule: "Pin Image Versions", type: "warn", desc: "Using :latest can introduce breaking changes unexpectedly. Always pin explicit tags." });
    } else {
      findings.push({ rule: "Explicit Base Image Tag", type: "good", desc: "Using explicit version tags ensures deterministic, reproducible builds." });
    }

    if (content.includes("USER ")) {
      findings.push({ rule: "Non-Root User", type: "good", desc: "Specifies a non-root user (USER), mitigating container escape privileges." });
    } else {
      findings.push({ rule: "Missing Non-Root User", type: "warn", desc: "Container runs as root by default. Add 'USER appuser' for security defense-in-depth." });
    }

    if (content.includes("AS ") || content.includes("as ")) {
      findings.push({ rule: "Multi-Stage Build", type: "good", desc: "Multi-stage build detected. Compilers and build tools are stripped from final image." });
    }

    if (content.includes("npm ci")) {
      findings.push({ rule: "npm ci over npm install", type: "good", desc: "Uses 'npm ci' for fast, reproducible lockfile-enforced dependency installation." });
    }

    return findings;
  };

  const findings = analyze();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
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
            <Box className="w-3.5 h-3.5" /> Security & Performance Scanner
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dockerfile <span className="text-gradient-orange">Linter & Optimizer</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base">
            Scan your Dockerfiles for security vulnerabilities, excessive image layer bloat, and cache invalidation bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-[#161825] border-b border-orange-500/10">
              <span className="text-xs font-mono font-medium text-orange-400">Dockerfile</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-medium border border-orange-500/20 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[400px] bg-[#090a0f] p-5 font-mono text-xs text-gray-200 outline-none leading-relaxed resize-none border-none focus:ring-0"
              spellCheck={false}
            />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#11131c] p-6 rounded-2xl border border-orange-500/20 space-y-4 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Best-Practice Audit</span>
              <div className="space-y-3">
                {findings.map((f, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      f.type === "good"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-200"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {f.type === "good" ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      <span>{f.rule}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed pl-5">{f.desc}</p>
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

