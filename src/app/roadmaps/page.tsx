"use client";

import React from "react";
import Link from "next/link";
import { Compass, Clock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ROADMAPS } from "@/data/roadmapsData";

export default function RoadmapsIndexPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" /> Career Engineering Paths
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps & Cloud <span className="text-gradient-orange">Roadmaps</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Step-by-step technical blueprints that guide you from beginner to job-ready engineer, with concrete projects for each milestone.
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAPS.map((r) => (
            <div
              key={r.id}
              className="bg-[#11131c] border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all shadow-xl hover:shadow-orange-950/20 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {r.badge}
                  </span>
                  <div className="flex items-center text-xs text-gray-400 space-x-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{r.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {r.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {r.description}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Key Milestones:</div>
                  {r.details.stages.slice(0, 3).map((s, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate">{s.header}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">{r.details.stages.length} Milestones</span>
                <Link
                  href={`/roadmaps/${r.slug}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
                >
                  <span>Explore Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

