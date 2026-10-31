"use client";

import React, { useState } from "react";
import { HelpCircle, Search, ChevronDown, ChevronUp, CheckCircle, Award } from "lucide-react";
import { INTERVIEW_QUESTIONS } from "@/data/interviewsData";

export default function InterviewQuestionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("q-docker-vs-vm");

  const categories = ["All", "Docker", "Kubernetes", "Terraform", "Linux"];

  const filtered = INTERVIEW_QUESTIONS.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.shortAnswer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || q.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> High-Frequency Technical Interviews
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps <span className="text-gradient-orange">Interview Questions</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Real-world interview questions asked at top tech companies, complete with concise answers, deep technical explanations, and key takeaways.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#11131c] p-4 rounded-2xl border border-orange-500/20">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search interview questions..."
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

        {/* Questions Accordion */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl"
              >
                <div
                  onClick={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
                  className="p-5 cursor-pointer flex items-center justify-between hover:bg-[#161825] transition-colors select-none"
                >
                  <div className="space-y-1.5 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/10">
                        {item.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{item.question}</h3>
                  </div>

                  <div className="p-2 rounded-lg bg-[#181b29] text-gray-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 pt-2 border-t border-white/5 space-y-4 bg-[#0e1018] text-xs leading-relaxed">
                    {/* Short Answer */}
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-orange-400 block mb-1">
                        Executive Summary (Quick Answer):
                      </span>
                      {item.shortAnswer}
                    </div>

                    {/* Detailed Deep Dive */}
                    <div className="space-y-2">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-white block">
                        In-Depth Technical Explanation:
                      </span>
                      {item.detailedAnswer.map((para, pidx) => (
                        <p key={pidx} className="text-gray-300 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Key Takeaways */}
                    <div className="pt-2 border-t border-white/5 space-y-1.5">
                      <span className="font-bold uppercase tracking-wider text-[11px] text-orange-400 block">
                        Must-Mention Talking Points:
                      </span>
                      {item.keyPoints.map((kp, kpidx) => (
                        <div key={kpidx} className="flex items-center space-x-2 text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{kp}</span>
                        </div>
                      ))}
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

