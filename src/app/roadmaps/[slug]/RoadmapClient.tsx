"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Compass, 
  Terminal, 
  BookOpen, 
  Layers,
  HelpCircle,
  Award
} from "lucide-react";
import { RoadmapMeta } from "@/data/roadmapsData";

export default function RoadmapClient({ roadmap }: { roadmap: RoadmapMeta }) {
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [openStage, setOpenStage] = useState<Record<number, boolean>>({
    0: true, // First stage open by default
  });
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`roadmap-progress-${roadmap.slug}`);
      if (saved) {
        setCompletedTopics(JSON.parse(saved));
      }
    } catch {}
  }, [roadmap.slug]);

  const toggleTopic = (topicKey: string) => {
    setCompletedTopics((prev) => {
      const next = { ...prev, [topicKey]: !prev[topicKey] };
      try {
        localStorage.setItem(`roadmap-progress-${roadmap.slug}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const totalTopics = roadmap.details.stages.reduce((acc, s) => acc + s.topics.length, 0);
  const finishedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((finishedCount / totalTopics) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/roadmaps"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Roadmaps</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-4xl sm:text-5xl">{roadmap.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    {roadmap.badge}
                  </span>
                  <div className="flex items-center text-xs text-gray-400 space-x-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{roadmap.duration}</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  {roadmap.title}
                </h1>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                href="/tutorials"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-semibold text-gray-200 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                Tutorials
              </Link>
              <Link
                href="/playground"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-xs font-semibold text-orange-300 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                Playgrounds
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            {roadmap.description}
          </p>

          {/* Progress Bar Tracker */}
          <div className="mt-6 pt-5 border-t border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-400">Your Learning Progress:</span>
              <span className="text-orange-400 font-mono">
                {finishedCount} / {totalTopics} Topics ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-[#0a0b12] rounded-full h-2.5 overflow-hidden border border-white/5">
              <div
                className="bg-gradient-orange h-full rounded-full transition-all duration-500 shadow-md shadow-orange-500/30"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Why the order matters */}
        {roadmap.details.orderMatters && (
          <div className="bg-gradient-to-r from-orange-500/10 via-[#11131c] to-orange-500/5 border border-orange-500/20 rounded-2xl p-6 sm:p-7 space-y-2">
            <div className="flex items-center space-x-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Why the Order Matters
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {roadmap.details.orderMatters}
            </p>
          </div>
        )}

        {/* Stage-by-Stage Curriculum Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curriculum &amp; Milestones ({roadmap.details.stages.length} Stages)
            </h2>
            <div className="space-x-3 text-xs">
              <button
                onClick={() => {
                  const all: Record<number, boolean> = {};
                  roadmap.details.stages.forEach((_, idx) => (all[idx] = true));
                  setOpenStage(all);
                }}
                className="text-orange-400 hover:text-orange-300"
              >
                Expand All
              </button>
              <span className="text-gray-600">•</span>
              <button
                onClick={() => setOpenStage({})}
                className="text-gray-400 hover:text-gray-200"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {roadmap.details.stages.map((stage, idx) => {
              const isOpen = openStage[idx] ?? false;
              const stageKey = `stage-${idx}`;
              const stageFinished = stage.topics.filter(
                (t) => completedTopics[`${stageKey}-${t.title}`]
              ).length;

              return (
                <div
                  key={idx}
                  className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl transition-all"
                >
                  <div
                    onClick={() =>
                      setOpenStage((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="p-5 sm:p-6 cursor-pointer flex items-start sm:items-center justify-between hover:bg-[#151724] transition-colors select-none gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {stage.header}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                          {stage.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-gray-400 hidden sm:inline-block">
                        {stageFinished}/{stage.topics.length} done
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 space-y-4 bg-[#0a0b12]/50">
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic border-l-2 border-orange-500/40 pl-3 py-0.5">
                        {stage.summary}
                      </p>

                      <div className="space-y-3 pt-2">
                        {stage.topics.map((topic, tIdx) => {
                          const topicKey = `${stageKey}-${topic.title}`;
                          const isDone = !!completedTopics[topicKey];

                          return (
                            <div
                              key={tIdx}
                              onClick={() => toggleTopic(topicKey)}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                                isDone
                                  ? "bg-emerald-500/5 border-emerald-500/30 text-gray-300"
                                  : "bg-[#10121d] border-white/5 hover:border-orange-500/30 text-gray-300"
                              }`}
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`text-sm font-semibold ${
                                      isDone ? "text-emerald-300 line-through" : "text-white"
                                    }`}
                                  >
                                    {topic.title}
                                  </span>
                                  {topic.badge && (
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                                        topic.badge.toLowerCase().includes("recommended")
                                          ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                      }`}
                                    >
                                      {topic.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                  {topic.description}
                                </p>
                              </div>

                              <div className="shrink-0 pt-0.5">
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-500 hover:text-orange-400 transition-colors" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        {roadmap.details.faqs.length > 0 && (
          <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-400" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 pt-2">
              {roadmap.details.faqs.map((faq, fIdx) => {
                const isFaqOpen = !!openFaq[fIdx];
                return (
                  <div
                    key={fIdx}
                    className="border border-white/5 rounded-xl bg-[#0a0b12] overflow-hidden"
                  >
                    <div
                      onClick={() =>
                        setOpenFaq((prev) => ({ ...prev, [fIdx]: !prev[fIdx] }))
                      }
                      className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#141624] transition-colors"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-white">
                        {faq.question}
                      </h3>
                      {isFaqOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </div>
                    {isFaqOpen && (
                      <div className="p-4 pt-1 border-t border-white/5 text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#0e1018]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

