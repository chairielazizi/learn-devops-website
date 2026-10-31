"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Terminal, 
  Layers, 
  Cloud, 
  GitBranch, 
  Server, 
  CheckCircle,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { INTERVIEW_TRACKS, ALL_INTERVIEW_QUESTIONS } from "@/data/interviewsData";

const TRACK_ICONS: Record<string, React.ReactNode> = {
  docker: <Layers className="w-6 h-6 text-orange-400" />,
  kubernetes: <Terminal className="w-6 h-6 text-orange-400" />,
  aws: <Cloud className="w-6 h-6 text-orange-400" />,
  terraform: <Server className="w-6 h-6 text-orange-400" />,
  linux: <Terminal className="w-6 h-6 text-orange-400" />,
  git: <GitBranch className="w-6 h-6 text-orange-400" />
};

export default function InterviewQuestionsPage() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredQuestions = search.trim()
    ? ALL_INTERVIEW_QUESTIONS.filter(
        (q) =>
          q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.trackName.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> 164 Real-World Interview Questions
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            DevOps & Cloud <span className="text-gradient-orange">Interview Questions</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            Battle-tested interview questions asked by senior engineers and hiring managers at FAANG and high-growth startups, sorted by seniority with detailed technical explanations.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search across all 164 questions (e.g. 'layer caching', 'OOMKilled', 'DynamoDB lock')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#11131c] border border-orange-500/20 focus:border-orange-500 text-white pl-12 pr-4 py-3 rounded-2xl text-sm sm:text-base outline-none shadow-xl transition-all"
              />
            </div>
          </div>
        </div>

        {/* Global Search Results if search query is active */}
        {search.trim() && (
          <div className="bg-[#11131c] border border-orange-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-400" />
                Search Results ({filteredQuestions.length})
              </h2>
              <button
                onClick={() => setSearch("")}
                className="text-xs text-orange-400 hover:text-orange-300"
              >
                Clear Search
              </button>
            </div>

            {filteredQuestions.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">
                No questions found matching &quot;{search}&quot;. Try another query or browse by category below.
              </p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredQuestions.slice(0, 15).map((q) => {
                  const isExp = expandedId === q.id;
                  return (
                    <div
                      key={q.id}
                      className="border border-white/5 bg-[#0e1018] rounded-xl p-4 transition-all hover:border-orange-500/30"
                    >
                      <div
                        onClick={() => setExpandedId(isExp ? null : q.id)}
                        className="cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                            {q.trackName}
                          </span>
                          <span className="text-xs font-mono uppercase text-emerald-400">
                            {q.level}
                          </span>
                          <h3 className="text-sm font-semibold text-white hover:text-orange-300 transition-colors">
                            {q.title}
                          </h3>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isExp ? "rotate-180" : ""}`} />
                      </div>

                      {isExp && (
                        <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300 leading-relaxed space-y-3">
                          <div
                            className="interview-content prose prose-invert max-w-none text-gray-300"
                            dangerouslySetInnerHTML={{ __html: q.html }}
                          />
                          <div className="pt-2 flex justify-end">
                            <Link
                              href={`/interview-questions/${q.trackSlug}`}
                              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                            >
                              View all {q.trackName} questions <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Technology Track Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-white">Browse by Technology Track</h2>
              <p className="text-sm text-gray-400 mt-1">
                Choose a track to practice targeted questions sorted by Junior, Mid, and Senior difficulty.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERVIEW_TRACKS.map((track) => (
              <Link
                key={track.slug}
                href={`/interview-questions/${track.slug}`}
                className="group relative bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {TRACK_ICONS[track.slug] || <Layers className="w-6 h-6 text-orange-400" />}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {track.name} Questions
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {track.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded text-[11px] bg-[#161926] text-gray-400 border border-white/5"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-orange-400 group-hover:text-orange-300">
                  <span>Start practice</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Preparation Guide Callout */}
        <div className="bg-gradient-to-r from-orange-500/10 via-[#11131c] to-orange-500/5 border border-orange-500/20 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">How to Ace DevOps Technical Interviews</h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Interviewers test for deep architectural understanding rather than pure syntax memorization. When answering, state the fundamental tradeoff first (e.g. latency vs consistency, isolation vs footprint), then walk through real debugging scenarios and operational best practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/tutorials"
              className="px-5 py-2.5 rounded-xl bg-[#181a28] hover:bg-[#202334] text-white text-xs font-semibold transition-all border border-white/10"
            >
              Browse 259+ Step-by-Step Tutorials
            </Link>
            <Link
              href="/troubleshooting"
              className="px-5 py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-semibold shadow-lg shadow-orange-500/20 hover:brightness-110 transition-all"
            >
              Review 81 Production Incident Playbooks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
