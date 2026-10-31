"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ArrowLeft, 
  Terminal, 
  Layers, 
  Cloud, 
  GitBranch, 
  Server, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { InterviewTrackMeta, QuestionItem } from "@/data/interviewsData";

interface Props {
  track: InterviewTrackMeta;
  questions: QuestionItem[];
}

const TRACK_ICONS: Record<string, React.ReactNode> = {
  docker: <Layers className="w-6 h-6 text-orange-400" />,
  kubernetes: <Terminal className="w-6 h-6 text-orange-400" />,
  aws: <Cloud className="w-6 h-6 text-orange-400" />,
  terraform: <Server className="w-6 h-6 text-orange-400" />,
  linux: <Terminal className="w-6 h-6 text-orange-400" />,
  git: <GitBranch className="w-6 h-6 text-orange-400" />
};

export default function TrackQuestionsClient({ track, questions }: Props) {
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [`${track.slug}-1`]: true // First question open by default
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Available levels with counts
  const levels = ["All", "Junior", "Mid", "Senior"];
  const levelCounts: Record<string, number> = {
    All: questions.length,
    Junior: questions.filter((q) => q.level.toLowerCase() === "junior").length,
    Mid: questions.filter((q) => q.level.toLowerCase() === "mid" || q.level.toLowerCase() === "intermediate").length,
    Senior: questions.filter((q) => q.level.toLowerCase() === "senior").length,
  };

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.html.toLowerCase().includes(search.toLowerCase());
    const matchesLevel =
      selectedLevel === "All" ||
      (selectedLevel === "Junior" && q.level.toLowerCase() === "junior") ||
      (selectedLevel === "Mid" && (q.level.toLowerCase() === "mid" || q.level.toLowerCase() === "intermediate")) ||
      (selectedLevel === "Senior" && q.level.toLowerCase() === "senior");
    return matchesSearch && matchesLevel;
  });

  const toggleAll = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    if (expand) {
      filtered.forEach((q) => {
        next[q.id] = true;
      });
    }
    setOpenIds(next);
  };

  const handleCopy = (id: string, text: string) => {
    // Strip HTML tags for clean clipboard copy
    const plain = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    navigator.clipboard.writeText(plain);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLevelBadgeClass = (lvl: string) => {
    const lower = lvl.toLowerCase();
    if (lower === "junior") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (lower === "senior") return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/interview-questions"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Interview Tracks</span>
          </Link>
        </div>

        {/* Track Header */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                {TRACK_ICONS[track.slug] || <Layers className="w-7 h-7 text-orange-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    {questions.length} Questions
                  </span>
                  <span className="text-xs text-gray-400 font-mono">DevOps & Cloud</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  {track.name} <span className="text-gradient-orange">Interview Questions</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href={`/tutorials/${track.slug === "git" ? "git" : track.slug}`}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-semibold text-gray-200 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                Tutorials
              </Link>
              {["docker", "kubernetes", "linux", "terraform"].includes(track.slug) && (
                <Link
                  href={`/playground/${track.slug}`}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-xs font-semibold text-orange-300 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Try Playground
                </Link>
              )}
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            {track.description}
          </p>

          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {track.topics.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-xs bg-[#0b0c13] text-gray-300 border border-white/5 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#11131c] p-4 rounded-2xl border border-orange-500/20">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={`Search ${track.name} questions...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
            />
          </div>

          {/* Level Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedLevel === lvl
                    ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                    : "bg-[#181a28] text-gray-300 hover:text-white"
                }`}
              >
                {lvl} {levelCounts[lvl] !== undefined ? `(${levelCounts[lvl]})` : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Controls: Count & Expand/Collapse */}
        <div className="flex items-center justify-between text-xs text-gray-400 px-1">
          <div>
            Showing <span className="font-semibold text-white">{filtered.length}</span> of {questions.length} questions
          </div>
          <div className="space-x-3">
            <button
              onClick={() => toggleAll(true)}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={() => toggleAll(false)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Question Accordion List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-[#11131c] rounded-2xl border border-white/5">
              <p className="text-gray-400 text-sm">No questions found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedLevel("All");
                }}
                className="mt-3 text-xs text-orange-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filtered.map((q) => {
              const isOpen = !!openIds[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl transition-all"
                >
                  <div
                    onClick={() =>
                      setOpenIds((prev) => ({
                        ...prev,
                        [q.id]: !prev[q.id]
                      }))
                    }
                    className="p-5 cursor-pointer flex items-center justify-between hover:bg-[#151724] transition-colors select-none gap-3"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-6 shrink-0 text-right font-mono text-xs tabular-nums text-gray-400 pt-0.5 sm:pt-0">
                        #{q.number}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                        {q.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider border ${getLevelBadgeClass(
                          q.level
                        )}`}
                      >
                        {q.level}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-[#0d0e16]/60">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                        <span
                          className={`sm:hidden inline-block px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider border ${getLevelBadgeClass(
                            q.level
                          )}`}
                        >
                          {q.level}
                        </span>
                        <div className="flex items-center gap-3 ml-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(q.id, q.html);
                            }}
                            className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-[#181a28] px-3 py-1.5 rounded-lg border border-white/10"
                          >
                            {copiedId === q.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Rendered HTML Answer */}
                      <div
                        className="interview-content prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: q.html }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
