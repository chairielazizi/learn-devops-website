"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Search, CheckCircle } from "lucide-react";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";

export default function TutorialsIndexPage() {
  const [search, setSearch] = useState("");

  const filtered = TUTORIAL_TRACKS.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> 260+ Free DevOps Lessons
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps <span className="text-gradient-orange">Tutorials & Tracks</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Structured, step-by-step courses from hello-world fundamentals to production Kubernetes, multi-cloud, and IaC pipelines.
          </p>
        </div>

        {/* Search */}
        <div className="bg-[#11131c] p-4 rounded-2xl border border-orange-500/20">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by technology (e.g. Docker, Terraform, Kubernetes, AWS, CI/CD)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0b12] border border-white/10 focus:border-orange-500 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            />
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((track) => (
            <Link
              key={track.id}
              href={`/tutorials/${track.slug}`}
              className="group bg-[#11131c] hover:bg-[#141724] border border-orange-500/20 hover:border-orange-500/50 p-6 rounded-2xl transition-all shadow-xl hover:shadow-orange-950/20 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{track.icon}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {track.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {track.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {track.description}
                </p>

                <div className="pt-2 flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    <span>{track.lessonsCount} Lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>~{track.estimatedHours} hrs</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-orange-400 group-hover:text-orange-300">
                <span>Start Curriculum</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

