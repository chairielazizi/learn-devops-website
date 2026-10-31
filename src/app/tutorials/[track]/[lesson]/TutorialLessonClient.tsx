"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TutorialTrack } from "@/data/tutorialsData";
import { LessonNote } from "@/data/lessonNotesData";
import TutorialTopNav from "@/components/tutorials/TutorialTopNav";
import {
  ArrowLeft,
  Clock,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Code2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Wrench,
  HelpCircle,
  FileText
} from "lucide-react";

interface Props {
  trackMeta: TutorialTrack;
  note: LessonNote;
  currentLessonSlug: string;
  prevLesson: { title: string; slug: string } | null;
  nextLesson: { title: string; slug: string } | null;
  continueLessons: { title: string; slug: string; summary: string; duration: string }[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function TutorialLessonClient({
  trackMeta,
  note,
  currentLessonSlug,
  prevLesson,
  nextLesson,
  continueLessons,
}: Props) {
  // Determine which module contains current lesson
  const currentModuleIdx = trackMeta.modules.findIndex((m) =>
    m.lessons.some((l) => l.slug === currentLessonSlug)
  );

  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    [currentModuleIdx !== -1 ? currentModuleIdx : 0]: true,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const toggleModule = (idx: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // Build Table of Contents headings from sections
  const headings = note.sections.map((s) => ({
    title: s.title,
    id: slugify(s.title),
  }));

  if (note.quickReference && note.quickReference.length > 0) {
    headings.push({ title: "CLI Quick Reference", id: "cli-quick-reference" });
  }
  if (note.commonPitfalls && note.commonPitfalls.length > 0) {
    headings.push({ title: "Production Pitfalls", id: "production-pitfalls" });
  }

  // Active heading spy on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSectionId(headings[i].id);
          return;
        }
      }
      if (headings.length > 0 && window.scrollY < 200) {
        setActiveSectionId(headings[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      {/* Top Track Switcher Bar */}
      <TutorialTopNav currentTrack={trackMeta.slug} />

      {/* Mobile Drawer Toggle Pill */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#162032] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{trackMeta.title} Modules ({trackMeta.lessonsCount} Lessons)</span>
        </button>
        <span className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
          {note.title}
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8 items-start relative">
          {/* ================= LEFT SIDEBAR (Overview of Modules & Lessons) ================= */}
          <aside
            className={`
              fixed lg:sticky top-20 lg:top-24 z-40 lg:z-10
              inset-y-0 left-0 lg:inset-auto
              w-72 sm:w-80 lg:w-72 shrink-0
              bg-[#131b2e] lg:bg-transparent
              p-5 lg:p-0
              h-full lg:h-[calc(100vh-7rem)]
              overflow-y-auto
              border-r lg:border-r-0 border-slate-800
              transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Mobile close button */}
            <div className="flex lg:hidden items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <span className="text-sm font-bold text-white">{trackMeta.title}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Track Title Card */}
            <div className="mb-4 bg-[#182234] border border-slate-800 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">{trackMeta.icon}</span>
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    {trackMeta.title}
                  </h2>
                  <span className="text-[11px] text-orange-400 font-mono">
                    {trackMeta.lessonsCount} Interactive Lessons
                  </span>
                </div>
              </div>
            </div>

            {/* Module Accordion List */}
            <div className="space-y-2.5 pb-12">
              {trackMeta.modules.map((mod, mIdx) => {
                const isExpanded = expandedModules[mIdx] ?? false;
                const hasActiveLesson = mod.lessons.some((l) => l.slug === currentLessonSlug);

                return (
                  <div
                    key={mIdx}
                    className={`rounded-xl border transition-all ${
                      hasActiveLesson
                        ? "border-orange-500/40 bg-[#162032]"
                        : "border-slate-800/80 bg-[#141d2e] hover:border-slate-700"
                    }`}
                  >
                    <button
                      onClick={() => toggleModule(mIdx)}
                      className="w-full p-3 text-left flex items-center justify-between text-xs font-bold text-white gap-2 select-none"
                    >
                      <span className="truncate">{mod.title}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-2 pb-2.5 pt-0 space-y-1 border-t border-slate-800/60">
                        {mod.lessons.map((lesson) => {
                          const isActive = lesson.slug === currentLessonSlug;
                          return (
                            <Link
                              key={lesson.slug}
                              href={`/tutorials/${trackMeta.slug}/${lesson.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                                isActive
                                  ? "bg-gradient-orange text-white font-bold shadow-md shadow-orange-500/20"
                                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate">{lesson.title}</span>
                                <span className="text-[10px] opacity-70 shrink-0 font-mono">
                                  {lesson.duration}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Backdrop for mobile drawer */}
          {mobileMenuOpen && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
            />
          )}

          {/* ================= CENTER MAIN ARTICLE ================= */}
          <main className="flex-1 min-w-0 max-w-4xl mx-auto space-y-8 pb-16">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Link href="/tutorials" className="hover:text-orange-400 transition-colors">
                Tutorials
              </Link>
              <span>/</span>
              <Link
                href={`/tutorials/${trackMeta.slug}`}
                className="hover:text-orange-400 transition-colors capitalize"
              >
                {trackMeta.title}
              </Link>
              <span>/</span>
              <span className="text-orange-400 truncate font-semibold">{note.title}</span>
            </div>

            {/* Hero Header */}
            <div className="bg-[#182234] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
                  {note.difficulty}
                </span>
                <div className="flex items-center text-xs text-slate-400 space-x-1 pl-2 font-mono">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>{note.duration} read</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {note.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {note.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href={`/playground/${note.playgroundSlug}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Try in {trackMeta.title.split(" ")[0]} Sandbox</span>
                </Link>
                <Link
                  href={`/tutorials/${trackMeta.slug}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All {trackMeta.title.split(" ")[0]} Lessons</span>
                </Link>
              </div>
            </div>

            {/* VERIFIED FACTS CARD */}
            {note.verifiedFacts && note.verifiedFacts.length > 0 && (
              <div
                id="verified-facts"
                className="bg-[#141e30] border-l-4 border-orange-500 border-y border-r border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3 shadow-lg scroll-mt-24"
              >
                <div className="flex items-center space-x-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Technical Facts &amp; Architecture</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {note.verifiedFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* KEY CONCEPTS GLOSSARY */}
            {note.keyConcepts && note.keyConcepts.length > 0 && (
              <div id="core-concepts" className="space-y-3 scroll-mt-24">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Core Concepts You Must Know</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {note.keyConcepts.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#182234] border border-slate-800 p-4 rounded-xl space-y-1.5 shadow-md"
                    >
                      <div className="text-xs sm:text-sm font-bold text-orange-300 font-mono">
                        {item.term}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEEP DIVE CONTENT SECTIONS */}
            <div className="space-y-8">
              {note.sections.map((section, sidx) => {
                const secId = slugify(section.title);

                return (
                  <section
                    key={sidx}
                    id={secId}
                    className="space-y-3.5 scroll-mt-24 bg-[#141d2e]/50 border border-slate-800/80 rounded-2xl p-5 sm:p-6"
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-slate-800 pb-2.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      {section.title}
                    </h2>

                    <div className="space-y-3">
                      {section.paragraphs.map((p, pidx) => (
                        <p
                          key={pidx}
                          className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {section.codeBlock && (
                      <div className="bg-[#0b1120] rounded-xl border border-slate-800 overflow-hidden shadow-xl mt-3">
                        <div className="px-4 py-2 bg-[#101827] border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                            <Code2 className="w-3.5 h-3.5" />
                            {section.codeBlock.language.toUpperCase()}
                          </span>
                          <button
                            onClick={() => copyCode(section.codeBlock!.code, sidx)}
                            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                          >
                            {copiedCodeIdx === sidx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 font-mono text-xs text-orange-200/90 overflow-x-auto leading-relaxed select-all">
                          {section.codeBlock.code}
                        </pre>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* CLI QUICK REFERENCE */}
            {note.quickReference && note.quickReference.length > 0 && (
              <div id="cli-quick-reference" className="space-y-3 scroll-mt-24">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <span>CLI Quick Reference</span>
                </h2>
                <div className="bg-[#182234] rounded-2xl border border-slate-800 overflow-hidden shadow-xl divide-y divide-slate-800">
                  {note.quickReference.map((ref, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <code className="font-mono font-bold text-orange-400 bg-[#0f172a] px-2.5 py-1 rounded-lg border border-slate-700/60 select-all truncate">
                          $ {ref.command}
                        </code>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        <span className="text-slate-400 text-[11px]">{ref.explanation}</span>
                        <button
                          onClick={() => copyCommand(ref.command)}
                          className="text-slate-400 hover:text-white"
                          title="Copy command"
                        >
                          {copiedCmd === ref.command ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCTION PITFALLS */}
            {note.commonPitfalls && note.commonPitfalls.length > 0 && (
              <div
                id="production-pitfalls"
                className="bg-[#201524] border border-red-500/20 rounded-2xl p-5 space-y-2.5 shadow-xl scroll-mt-24"
              >
                <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Production Pitfalls to Avoid</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                  {note.commonPitfalls.map((pitfall, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ================= PREVIOUS & NEXT BUTTONS ================= */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/tutorials/${trackMeta.slug}/${prevLesson.slug}`}
                  className="flex-1 bg-[#182234] hover:bg-[#1e2b42] border border-slate-800 rounded-2xl p-4 flex items-center space-x-3 transition-all group"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-orange-400 group-hover:-translate-x-1 transition-all shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Previous Lesson
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-orange-300 transition-colors truncate block">
                      {prevLesson.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextLesson && (
                <Link
                  href={`/tutorials/${trackMeta.slug}/${nextLesson.slug}`}
                  className="flex-1 bg-gradient-orange hover:brightness-110 rounded-2xl p-4 flex items-center justify-between text-white shadow-xl shadow-orange-500/20 transition-all group"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] uppercase font-bold text-orange-200 tracking-wider block">
                      Next Lesson
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white truncate block">
                      {nextLesson.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              )}
            </div>

            {/* ================= CONTINUE LEARNING CARDS ================= */}
            {continueLessons.length > 0 && (
              <section className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                    <span>Continue Learning</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Next in {trackMeta.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {continueLessons.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/tutorials/${trackMeta.slug}/${item.slug}`}
                      className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-orange-500/10"
                    >
                      <div className="space-y-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono">{item.duration}</span>
                        <span className="text-orange-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Read <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ================= EXPLORE RELATED TOPICS CARDS ================= */}
            <section className="pt-4 space-y-3.5">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Explore Related Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <Link
                  href={`/playground/${note.playgroundSlug}`}
                  className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">
                      Try in Playground
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Simulated {trackMeta.title.split(" ")[0]} sandbox
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/tools/cheatsheets/${note.playgroundSlug}`}
                  className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">
                      CLI Cheatsheet
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Essential command recipes
                    </p>
                  </div>
                </Link>

                <Link
                  href="/troubleshooting"
                  className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">
                      When It Breaks
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      81 incident recovery guides
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </main>

          {/* ================= RIGHT SIDEBAR (On This Page / Table of Contents) ================= */}
          <aside className="sticky top-24 hidden xl:block w-56 xl:w-64 shrink-0 h-[calc(100vh-7rem)] overflow-y-auto p-1 space-y-3">
            <div className="bg-[#182234] border border-slate-800 rounded-2xl p-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                <span>On This Page</span>
              </h3>

              <nav className="space-y-1 text-xs">
                {headings.map((h) => {
                  const isActive = activeSectionId === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-1.5 px-2 rounded-lg transition-all truncate ${
                        isActive
                          ? "bg-orange-500/15 text-orange-300 font-semibold border-l-2 border-orange-500"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                      title={h.title}
                    >
                      {h.title}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <a
                  href="#"
                  className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold block text-center"
                >
                  ↑ Back to top
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
