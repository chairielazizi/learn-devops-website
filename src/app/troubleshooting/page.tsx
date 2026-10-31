"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, Search, Terminal, ChevronDown, ChevronUp, Check, Copy, ArrowRight, ShieldAlert } from "lucide-react";
import { TROUBLESHOOTING_GUIDES, TroubleshootingGuide } from "@/data/troubleshootingData";

export default function TroubleshootingIndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "AWS", "Kubernetes", "Docker", "CI/CD", "Terraform", "Git", "Linux"];

  const filtered = TROUBLESHOOTING_GUIDES.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.errorSnippet.toLowerCase().includes(search.toLowerCase()) ||
      g.rootCause.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || g.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const copySnippet = (e: React.MouseEvent, id: string, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5" /> {TROUBLESHOOTING_GUIDES.length} Real-World Production Incident Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps <span className="text-gradient-orange">Troubleshooting Matrix</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Quick-fix diagnostic playbooks, error log signatures, root cause analyses, and verified solutions for production outages across the full DevOps toolchain.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#11131c] p-4 rounded-2xl border border-orange-500/20 shadow-xl">
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
                    : "bg-[#181a28] text-gray-300 hover:text-white hover:bg-orange-500/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/troubleshooting/${item.slug}`}
              className="bg-[#11131c] hover:bg-[#151825] rounded-2xl border border-orange-500/20 hover:border-orange-500/50 p-5 flex flex-col justify-between shadow-xl transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {item.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.severity === "Critical"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {item.rootCause}
                </p>

                {/* Error snippet badge */}
                <div className="bg-[#0f172a] p-2.5 rounded-xl border border-white/5 font-mono text-[11px] text-red-300/90 truncate flex items-center justify-between">
                  <span className="truncate">{item.errorSnippet}</span>
                  <button
                    onClick={(e) => copySnippet(e, item.id, item.errorSnippet)}
                    className="ml-2 text-gray-500 hover:text-orange-400 shrink-0"
                    title="Copy Error"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-orange-400">
                <span>View Remediation Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
