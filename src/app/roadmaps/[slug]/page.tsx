import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROADMAPS } from "@/data/roadmapsData";
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, Briefcase, Code, Sparkles } from "lucide-react";

interface RoadmapPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROADMAPS.map((r) => ({ slug: r.slug }));
}

export default async function RoadmapDetailPage({ params }: RoadmapPageProps) {
  const resolvedParams = await params;
  const roadmap = ROADMAPS.find((r) => r.slug === resolvedParams.slug);

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/roadmaps"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> All Roadmaps
        </Link>

        {/* Header */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-8 sm:p-10 space-y-4 shadow-2xl">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {roadmap.badge}
            </span>
            <div className="flex items-center text-xs text-gray-400 space-x-1">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Target Timeline: {roadmap.duration}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {roadmap.title}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {roadmap.description}
          </p>
        </div>

        {/* Step-by-Step Milestones */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Step-by-Step Curriculum</h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-orange-500/20">
            {roadmap.steps.map((step, idx) => (
              <div key={idx} className="relative pl-12">
                {/* Step Circle */}
                <div className="absolute left-2.5 -translate-x-1/2 top-4 w-6 h-6 rounded-full bg-gradient-orange text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-orange-500/30">
                  {idx + 1}
                </div>

                <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 p-6 space-y-4 shadow-xl">
                  <div>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-xs text-gray-400 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Core Topics */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-400">Core Concepts To Master:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.topics.map((t, tidx) => (
                        <div key={tidx} className="flex items-center space-x-2 text-xs text-gray-300 bg-[#161927] p-2.5 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Hands-On Project */}
                  <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs space-y-1">
                    <div className="font-bold text-orange-300 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" /> Hands-On Project:
                    </div>
                    {step.recommendedProjects.map((p, pidx) => (
                      <div key={pidx} className="text-gray-300 leading-relaxed">
                        • {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
