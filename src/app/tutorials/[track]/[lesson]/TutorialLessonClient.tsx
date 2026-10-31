"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { TutorialTrack } from "@/data/tutorialsData";
import { LessonNote } from "@/data/lessonNotesData";
import { TUTORIAL_SUBSECTIONS } from "@/data/tutorialSubsections";
import MarkdownLessonRenderer from "@/components/tutorials/MarkdownLessonRenderer";
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
  FileText,
  User,
  Users
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
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set of all sub-lesson slugs so we don't render them twice at top-level
  const allSubSlugs = useMemo(() => {
    const set = new Set<string>();
    Object.values(TUTORIAL_SUBSECTIONS).forEach((list) => {
      list.forEach((item) => set.add(item.slug));
    });
    return set;
  }, []);

  // Find if currentLessonSlug is a child of some parent in TUTORIAL_SUBSECTIONS
  const activeParentSlug = useMemo(() => {
    if (TUTORIAL_SUBSECTIONS[currentLessonSlug]) return currentLessonSlug;
    for (const [parent, children] of Object.entries(TUTORIAL_SUBSECTIONS)) {
      if (children.some((c) => c.slug === currentLessonSlug)) {
        return parent;
      }
    }
    return null;
  }, [currentLessonSlug]);

  // Expanded parents state in sidebar
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (activeParentSlug) {
      initial[activeParentSlug] = true;
    }
    return initial;
  });

  const toggleParent = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedParents((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Flatten all top-level lessons from all modules (excluding sub-lessons)
  const topLevelLessons = useMemo(() => {
    const list: { title: string; slug: string; summary?: string }[] = [];
    const seen = new Set<string>();
    for (const mod of trackMeta.modules) {
      for (const l of mod.lessons) {
        if (!seen.has(l.slug) && !allSubSlugs.has(l.slug)) {
          seen.add(l.slug);
          list.push(l);
        }
      }
    }
    return list;
  }, [trackMeta.modules, allSubSlugs]);

  // Extract headings for "On this page" TOC
  const headings = useMemo(() => {
    if (note.markdown) {
      const matches = Array.from(note.markdown.matchAll(/^##\s+(.+)$/gm));
      return matches.map((m) => {
        const title = m[1].trim();
        return { title, id: slugify(title) };
      });
    }
    if (note.headings && note.headings.length > 0) {
      return note.headings.map((h) => ({ title: h, id: slugify(h) }));
    }
    return note.sections.map((s) => ({
      title: s.title,
      id: slugify(s.title),
    }));
  }, [note]);

  const [activeSectionId, setActiveSectionId] = useState<string>("");

  // Active heading spy on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
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

  const trackShortTitle = trackMeta.title.split("(")[0].trim();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      {/* Mobile Drawer Toggle Bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#162032] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{trackShortTitle} Tutorial Menu</span>
        </button>
        <span className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
          {note.title}
        </span>
      </div>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8 items-start">
          {/* ================= LEFT SIDEBAR (MODULE OVERVIEW) ================= */}
          <aside
            className={`
              fixed lg:sticky top-20 left-0 z-40 lg:z-10
              w-72 sm:w-80 shrink-0
              h-[calc(100vh-5.5rem)]
              bg-[#141d2e] border-r lg:border border-slate-800/80 lg:rounded-2xl
              flex flex-col overflow-hidden shadow-2xl transition-transform duration-300
              ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Sidebar Track Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#182234]/60">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-orange-400 tracking-wider block">
                  Curriculum Track
                </span>
                <h3 className="text-sm font-bold text-white truncate">
                  {trackShortTitle} Tutorial
                </h3>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="flex-1 overflow-y-auto p-2.5 space-y-1 text-xs">
              {topLevelLessons.map((l) => {
                const isParentActive = currentLessonSlug === l.slug;
                const hasSubs = Boolean(TUTORIAL_SUBSECTIONS[l.slug]?.length);
                const isExpanded = Boolean(expandedParents[l.slug]);
                const children = TUTORIAL_SUBSECTIONS[l.slug] || [];
                const isChildActive = children.some((c) => c.slug === currentLessonSlug);

                return (
                  <div key={l.slug} className="space-y-0.5">
                    {/* Parent Row */}
                    <div className="relative group">
                      <Link
                        href={`/tutorials/${trackMeta.slug}/${l.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          block py-2.5 px-3 rounded-xl transition-all font-medium leading-snug
                          ${hasSubs ? "pr-9" : "pr-3"}
                          ${
                            isParentActive
                              ? "bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-orange-400 font-bold border-l-4 border-orange-500"
                              : isChildActive
                              ? "text-orange-300 font-semibold bg-orange-500/10 border-l-4 border-orange-500/60"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/60 border-l-4 border-transparent"
                          }
                        `}
                      >
                        <span className="truncate block">{l.title}</span>
                      </Link>

                      {/* Dropdown Carrot Toggle Button */}
                      {hasSubs && (
                        <button
                          type="button"
                          onClick={(e) => toggleParent(l.slug, e)}
                          aria-label="Toggle subsections"
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Sub-lessons (when expanded) */}
                    {hasSubs && isExpanded && (
                      <div className="pl-3.5 py-1 space-y-1 border-l-2 border-slate-800/80 ml-3">
                        {children.map((sub) => {
                          const isThisSubActive = currentLessonSlug === sub.slug;
                          return (
                            <Link
                              key={sub.slug}
                              href={`/tutorials/${trackMeta.slug}/${sub.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`
                                block py-1.5 px-3 rounded-lg text-[12px] transition-all truncate
                                ${
                                  isThisSubActive
                                    ? "bg-orange-500/20 text-orange-400 font-bold border-l-2 border-orange-500"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-l-2 border-transparent"
                                }
                              `}
                            >
                              {sub.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>


          </aside>

          {/* ================= CENTER MAIN ARTICLE ================= */}
          <main className="flex-1 min-w-0 max-w-4xl mx-auto space-y-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Link href="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tutorials" className="hover:text-orange-400 transition-colors">
                Tutorials
              </Link>
              <span>/</span>
              <span className="text-orange-400 font-semibold">{trackShortTitle}</span>
            </div>

            {/* Title & Metadata Header */}
            <header className="space-y-4 pb-6 border-b border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {note.title}
                </h1>

                {/* Top Quick Previous & Next Pills */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  {prevLesson && (
                    <Link
                      href={`/tutorials/${trackMeta.slug}/${prevLesson.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-[#182234] hover:bg-[#1e2b42] border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </Link>
                  )}
                  {nextLesson && (
                    <Link
                      href={`/tutorials/${trackMeta.slug}/${nextLesson.slug}`}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-orange hover:brightness-110 text-xs font-bold text-white flex items-center gap-1 shadow-md shadow-orange-500/20 transition-all"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Author & Meta Line */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold flex items-center justify-center text-[10px]">
                    VP
                  </div>
                  <span className="text-slate-300 font-sans font-semibold">
                    By Vishvesh Patel
                  </span>
                </div>
                <span>·</span>
                <span>DevOps Engineer</span>
                <span>·</span>
                <span>Updated September 13, 2026</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>{note.duration || "12 min read"}</span>
                </span>
              </div>
            </header>

            {/* Core Markdown Body */}
            {note.markdown ? (
              <MarkdownLessonRenderer markdown={note.markdown} />
            ) : (
              /* Fallback for lessons without markdown string */
              <div className="space-y-8">
                {note.sections.map((section, sidx) => {
                  const secId = slugify(section.title);
                  return (
                    <section key={sidx} id={secId} className="space-y-4 scroll-mt-24">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3 pt-6 border-t border-slate-800/80 first:border-t-0 first:pt-0">
                        <span className="w-1.5 h-6 bg-gradient-orange rounded-full shrink-0" />
                        <span>{section.title}</span>
                      </h2>

                      <div className="space-y-3.5">
                        {section.paragraphs.map((p, pidx) => (
                          <p
                            key={pidx}
                            className="text-base sm:text-[17px] text-slate-200 leading-relaxed font-normal"
                          >
                            {p}
                          </p>
                        ))}
                      </div>

                      {section.codeBlock && (
                        <div className="bg-[#0b1120] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl my-4">
                          <div className="px-4 py-2.5 bg-[#101827] border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                            <span className="flex items-center gap-2 text-orange-400 font-bold uppercase text-[11px]">
                              <Code2 className="w-4 h-4" />
                              <span>{section.codeBlock.language}</span>
                            </span>
                          </div>
                          <div className="p-4 sm:p-5 overflow-x-auto text-sm sm:text-[15px] font-mono text-slate-200">
                            <pre className="!bg-transparent !p-0 !m-0">
                              <code>{section.codeBlock.code}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}

            {/* ================= BOTTOM PREVIOUS & NEXT BUTTONS ================= */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/tutorials/${trackMeta.slug}/${prevLesson.slug}`}
                  className="flex-1 bg-[#182234] hover:bg-[#1e2b42] border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-3 transition-all group"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-orange-400 group-hover:-translate-x-1 transition-all shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      PREVIOUS
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
                  className="flex-1 bg-gradient-orange hover:brightness-110 rounded-2xl p-4 sm:p-5 flex items-center justify-between text-white shadow-xl shadow-orange-500/20 transition-all group"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] uppercase font-bold text-orange-200 tracking-wider block">
                      NEXT
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
              <section className="pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                    <span>Continue Learning</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Next in {trackShortTitle}
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
                  href={`/playground/${note.playgroundSlug || "terraform"}`}
                  className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 transition-all group shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">
                      Try in Playground
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Simulated {trackShortTitle} sandbox
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/tools/cheatsheets/${note.playgroundSlug || "terraform"}`}
                  className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 transition-all group shadow-md"
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
                  className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 transition-all group shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">
                      Troubleshooting
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Fix production incidents
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </main>

          {/* ================= RIGHT SIDEBAR (ON THIS PAGE TOC) ================= */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-20">
            <div className="bg-[#141d2e] border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                <span>On this page</span>
              </div>

              <div className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 text-xs">
                {headings.map((h) => {
                  const isActive = activeSectionId === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`
                        block py-1.5 px-2.5 rounded-lg transition-all leading-snug truncate
                        ${
                          isActive
                            ? "bg-orange-500/15 text-orange-400 font-semibold border-l-2 border-orange-500 pl-2"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        }
                      `}
                    >
                      {h.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
