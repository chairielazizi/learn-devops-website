"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, ArrowRight, Search, Sparkles } from "lucide-react";
import { TOOLS_LIST } from "@/data/toolsData";

export default function ToolsIndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Validators", "Generators", "Cheatsheets", "Testers"];

  const filtered = TOOLS_LIST.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" /> DevOps Utilities & Cheatsheets
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Developer <span className="text-gradient-orange">Tools & Linters</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Free browser-based linters, syntax validators, manifest generators, and CLI cheatsheets built for engineers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#11131c] p-4 rounded-2xl border border-orange-500/20">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search tools & cheatsheets..."
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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group bg-[#11131c] hover:bg-[#141724] border border-orange-500/20 hover:border-orange-500/50 p-6 rounded-2xl transition-all shadow-xl hover:shadow-orange-950/20 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-orange-400 group-hover:text-orange-300">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

