import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";
import { ArrowLeft, BookOpen, Clock, Terminal, CheckCircle2, ArrowRight, FileText } from "lucide-react";

interface TrackPageProps {
  params: Promise<{ track: string }>;
}

export async function generateStaticParams() {
  return TUTORIAL_TRACKS.map((t) => ({ track: t.slug }));
}

export default async function TrackDetailsPage({ params }: TrackPageProps) {
  const resolvedParams = await params;
  const track = TUTORIAL_TRACKS.find((t) => t.slug === resolvedParams.track);

  if (!track) {
    notFound();
  }

  const playgroundSlug =
    track.id === "docker"
      ? "docker"
      : track.id === "kubernetes"
      ? "kubernetes"
      : track.id === "terraform"
      ? "terraform"
      : "linux";

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <Link
          href="/tutorials"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> All Tutorials
        </Link>

        {/* Track Hero Banner */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none select-none">
            {track.icon}
          </div>

          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {track.badge} · {track.level}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {track.title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {track.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-6 text-xs text-gray-300">
              <div className="flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>{track.lessonsCount} Modules & Lessons</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Estimated Time: ~{track.estimatedHours} Hours</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href={`/playground/${playgroundSlug}`}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
              >
                <Terminal className="w-4 h-4" />
                <span>Practice in {track.title.split(" ")[0]} Playground</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Modules & Lessons Curriculum */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Curriculum & Notes</h2>
            <span className="text-xs text-gray-400">Click any title or &quot;See Notes&quot; to read concepts</span>
          </div>

          <div className="space-y-6">
            {track.modules.map((mod, modIdx) => (
              <div key={mod.title} className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl">
                <div className="px-6 py-4 bg-[#161927] border-b border-orange-500/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center font-mono">
                      {modIdx + 1}
                    </span>
                    {mod.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">{mod.lessons.length} lessons</span>
                </div>

                <div className="divide-y divide-white/5">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.slug}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#151825] transition-colors group"
                    >
                      <div className="space-y-1">
                        <Link
                          href={`/tutorials/${track.slug}/${lesson.slug}`}
                          className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-orange-500/60 shrink-0 group-hover:text-orange-400" />
                          <span>{lesson.title}</span>
                        </Link>
                        <p className="text-xs text-gray-400 pl-6 leading-relaxed">{lesson.summary}</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 pl-6 sm:pl-0">
                        <span className="text-xs text-gray-500 font-mono hidden md:inline mr-1">{lesson.duration}</span>

                        {/* See Notes Button */}
                        <Link
                          href={`/tutorials/${track.slug}/${lesson.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-[#181b29] hover:bg-orange-500/20 text-orange-300 text-xs font-semibold border border-orange-500/30 transition-all flex items-center gap-1.5 shadow-sm"
                          title="Read concept notes and architecture breakdown"
                        >
                          <FileText className="w-3.5 h-3.5 text-orange-400" />
                          <span>See Notes</span>
                        </Link>

                        {/* Try Lab Button */}
                        <Link
                          href={`/playground/${playgroundSlug}`}
                          className="px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 text-xs font-medium border border-orange-500/20 transition-all flex items-center gap-1"
                          title="Open browser terminal to run commands"
                        >
                          <Terminal className="w-3 h-3 text-orange-400" />
                          <span>Try Lab</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
