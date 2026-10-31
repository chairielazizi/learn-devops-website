"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Terminal, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  Sparkles,
  BookOpen
} from "lucide-react";

interface CommandItem {
  cmd: string;
  desc: string;
  difficulty?: string;
}

interface CheatsheetSection {
  id?: string;
  category: string;
  commands: CommandItem[];
}

interface CheatsheetMeta {
  tool: string;
  title: string;
  icon: string;
  desc: string;
  sections: CheatsheetSection[];
}

export default function CheatsheetClient({ data }: { data: CheatsheetMeta }) {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const filteredSections = data.sections
    .map((sec) => {
      const filteredCmds = sec.commands.filter((c) => {
        const matchesSearch =
          c.cmd.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase());
        const matchesDiff =
          selectedDifficulty === "all" ||
          !c.difficulty ||
          c.difficulty.toLowerCase() === selectedDifficulty;
        return matchesSearch && matchesDiff;
      });
      return {
        ...sec,
        commands: filteredCmds,
      };
    })
    .filter((sec) => sec.commands.length > 0);

  const totalFilteredCommands = filteredSections.reduce((acc, s) => acc + s.commands.length, 0);
  const totalCommands = data.sections.reduce((acc, s) => acc + s.commands.length, 0);

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/tools/cheatsheets"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Cheatsheets</span>
          </Link>
        </div>

        {/* Header Hero */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-4xl sm:text-5xl">{data.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    {totalCommands} Commands
                  </span>
                  <span className="text-xs text-gray-400 font-mono">DevOps Quick Reference</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  {data.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {["docker", "kubernetes", "linux", "terraform"].includes(data.tool) && (
                <Link
                  href={`/playground/${data.tool}`}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-xs font-semibold text-orange-300 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Try in Playground
                </Link>
              )}
              <Link
                href={`/tutorials/${data.tool}`}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-semibold text-gray-200 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                Tutorials
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            {data.desc}
          </p>

          {/* Quick jump navigation */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-400 font-medium mr-1">Sections:</span>
            {data.sections.map((s, idx) => (
              <a
                key={idx}
                href={`#sec-${idx}`}
                className="px-2.5 py-1 rounded-md text-xs bg-[#161926] text-gray-300 hover:text-white hover:border-orange-500/30 border border-white/5 transition-all font-mono"
              >
                {s.category} ({s.commands.length})
              </a>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#11131c] p-4 rounded-2xl border border-orange-500/20">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={`Search across ${totalCommands} commands and descriptions...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedDifficulty === d
                    ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                    : "bg-[#181a28] text-gray-300 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Search feedback */}
        <div className="text-xs text-gray-400 px-1">
          Showing <span className="font-semibold text-white">{totalFilteredCommands}</span> of {totalCommands} commands
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 bg-[#11131c] rounded-2xl border border-white/5">
              <p className="text-gray-400 text-sm">No commands found matching &quot;{search}&quot;</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedDifficulty("all");
                }}
                className="mt-3 text-xs text-orange-400 hover:underline"
              >
                Reset search filter
              </button>
            </div>
          ) : (
            filteredSections.map((sec, sIdx) => (
              <div
                key={sIdx}
                id={`sec-${sIdx}`}
                className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 space-y-4 shadow-xl scroll-mt-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    {sec.category}
                  </h2>
                  <span className="text-xs font-mono text-gray-400">
                    {sec.commands.length} commands
                  </span>
                </div>

                <div className="space-y-3">
                  {sec.commands.map((item, cIdx) => (
                    <div
                      key={cIdx}
                      className="border border-white/5 bg-[#0a0b12] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-500/30 transition-all group"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs sm:text-sm font-mono text-orange-300 font-semibold bg-[#141622] px-2.5 py-1 rounded-lg border border-orange-500/20 select-all break-all">
                            {item.cmd}
                          </code>
                          {item.difficulty && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {item.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => copyToClipboard(item.cmd)}
                          title="Copy command"
                          className="px-3 py-1.5 rounded-lg bg-[#181a28] hover:bg-[#202334] border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          {copiedCmd === item.cmd ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 text-xs">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-xs">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
