"use client";

import React, { useState } from "react";
import { AlertCircle, Search, Terminal, ChevronDown, ChevronUp, Check, Copy } from "lucide-react";
import { TROUBLESHOOTING_GUIDES, TroubleshootingGuide } from "@/data/troubleshootingData";

export default function TroubleshootingIndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("k8s-crashloopbackoff");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Kubernetes", "Docker", "AWS", "Terraform"];

  const filtered = TROUBLESHOOTING_GUIDES.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.errorSnippet.toLowerCase().includes(search.toLowerCase()) ||
      g.rootCause.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || g.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const copySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5" /> 80+ Real-World Production Incident Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps <span className="text-gradient-orange">Troubleshooting Matrix</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Quick-fix diagnostic playbooks, error log signatures, root cause analyses, and verified solutions for production outages.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#11131c] p-4 rounded-2xl border border-orange-500/20">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search error messages or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white pl-10 pr-4 py-2 rounded-xl text-sm outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === c
                    ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                    : "bg-[#181a28] text-gray-300 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Guides List */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl transition-all"
              >
                {/* Header item */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 cursor-pointer flex items-center justify-between hover:bg-[#161825] transition-colors select-none"
                >
                  <div className="space-y-1.5 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {item.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.severity === "Critical" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>

                  <div className="p-2 rounded-lg bg-[#181b29] text-gray-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 pt-2 border-t border-white/5 space-y-4 bg-[#0e1018]">
                    {/* Error Log Snippet */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="font-semibold uppercase tracking-wider text-[11px] text-red-400">Error Signature</span>
                        <button
                          onClick={() => copySnippet(item.id, item.errorSnippet)}
                          className="inline-flex items-center space-x-1 text-orange-400 hover:text-orange-300 text-xs"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === item.id ? "Copied" : "Copy Log"}</span>
                        </button>
                      </div>
                      <pre className="p-3.5 rounded-xl bg-[#090a0f] border border-red-500/20 font-mono text-xs text-red-300 whitespace-pre-wrap break-all">
                        {item.errorSnippet}
                      </pre>
                    </div>

                    {/* Root Cause */}
                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15 space-y-1">
                      <div className="text-xs font-bold uppercase text-orange-400 tracking-wider">Root Cause Analysis</div>
                      <p className="text-xs text-gray-300 leading-relaxed">{item.rootCause}</p>
                    </div>

                    {/* Step-by-Step Remediation */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase text-white tracking-wider">Verified Resolution Steps</div>
                      <ol className="space-y-2 pl-2">
                        {item.steps.map((step, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-orange-500/20">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

