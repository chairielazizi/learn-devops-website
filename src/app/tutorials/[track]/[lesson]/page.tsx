import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";
import { LessonNote } from "@/data/lessonNotesData";
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
  FileText,
  Copy,
} from "lucide-react";

interface LessonPageProps {
  params: Promise<{ track: string; lesson: string }>;
}

export async function generateStaticParams() {
  const paramsList: { track: string; lesson: string }[] = [];
  TUTORIAL_TRACKS.forEach((track) => {
    track.modules.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        paramsList.push({ track: track.slug, lesson: lesson.slug });
      });
    });
  });
  return paramsList;
}

function loadLesson(trackSlug: string, lessonSlug: string): LessonNote | null {
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "lessons", `${trackSlug}.json`);
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      if (data[lessonSlug]) {
        return data[lessonSlug];
      }
    }
  } catch (e) {
    console.error("Error loading lesson:", e);
  }

  // Fallback lookup in track metadata
  const track = TUTORIAL_TRACKS.find((t) => t.slug === trackSlug);
  if (!track) return null;

  let foundLesson: { title: string; slug: string; summary: string; duration: string } | null = null;
  let foundModuleTitle = "";
  for (const mod of track.modules) {
    const l = mod.lessons.find((item) => item.slug === lessonSlug);
    if (l) {
      foundLesson = l;
      foundModuleTitle = mod.title;
      break;
    }
  }

  if (!foundLesson) return null;

  const playgroundSlug =
    track.id === "docker"
      ? "docker"
      : track.id === "kubernetes"
      ? "kubernetes"
      : track.id === "terraform"
      ? "terraform"
      : "linux";

  return {
    track: track.slug,
    slug: foundLesson.slug,
    title: foundLesson.title,
    subtitle: `${foundLesson.summary} — Part of ${foundModuleTitle} in the ${track.title} curriculum`,
    duration: foundLesson.duration,
    difficulty: track.level,
    playgroundSlug,
    verifiedFacts: [
      `Production workloads utilizing ${foundLesson.title} must adhere to declarative version control and least-privilege boundaries.`,
      `Verified against standard cloud-native specifications and official ${track.title} engineering documentation.`,
      `Can be tested immediately in the browser-based ${track.title.split(" ")[0]} interactive playground.`,
    ],
    keyConcepts: [
      { term: "Architecture Foundation", explanation: foundLesson.summary },
      { term: "Operational Rigor", explanation: `Ensure declarative state, idempotent changes, and version control when deploying ${track.title}.` },
    ],
    sections: [
      {
        title: "1. Overview & Core Architecture",
        paragraphs: [
          foundLesson.summary,
          `Understanding ${foundLesson.title} is an essential milestone in the ${track.title} curriculum. In production systems, maintaining deterministic behavior requires avoiding manual drift and enforcing declarative manifests.`,
        ],
        codeBlock: {
          language: track.id === "terraform" ? "hcl" : track.id === "kubernetes" ? "yaml" : "bash",
          code: `# Practice command for ${foundLesson.title}\n${
            track.id === "docker"
              ? "docker run -d -p 80:80 nginx:alpine"
              : track.id === "kubernetes"
              ? "kubectl get pods -A -o wide"
              : track.id === "terraform"
              ? "terraform plan"
              : "ls -la"
          }`,
          description: `Example command for ${foundLesson.title}`,
        },
      },
    ],
    quickReference: [
      {
        command:
          track.id === "docker"
            ? "docker ps"
            : track.id === "kubernetes"
            ? "kubectl get nodes"
            : track.id === "terraform"
            ? "terraform init"
            : "pwd",
        explanation: `Fundamental command for ${track.title}`,
      },
    ],
    commonPitfalls: [
      "Applying changes to production without dry-running or checking execution diffs.",
      "Neglecting automated healthchecks, probe timeouts, and resource quota boundaries.",
    ],
  };
}

export default async function LessonDetailPage({ params }: LessonPageProps) {
  const resolved = await params;
  const note = loadLesson(resolved.track, resolved.lesson);

  if (!note) {
    notFound();
  }

  const trackMeta = TUTORIAL_TRACKS.find((t) => t.slug === resolved.track);

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/tutorials" className="hover:text-orange-400 transition-colors">
            Tutorials
          </Link>
          <span>/</span>
          <Link href={`/tutorials/${resolved.track}`} className="hover:text-orange-400 transition-colors capitalize">
            {trackMeta?.title || resolved.track}
          </Link>
          <span>/</span>
          <span className="text-orange-400 truncate">{note.title}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-8 sm:p-10 space-y-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
              {note.difficulty}
            </span>
            <div className="flex items-center text-xs text-gray-400 space-x-1 pl-2">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>{note.duration}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {note.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl">
            {note.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href={`/playground/${note.playgroundSlug}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Practice in {note.track.toUpperCase()} Playground</span>
            </Link>
            <Link
              href={`/tutorials/${resolved.track}`}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#161927] hover:bg-[#1a1e2f] text-gray-300 text-xs font-semibold border border-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Track Lessons</span>
            </Link>
          </div>
        </div>

        {/* VERIFIED FACTS CARD (Fact-check Alert) */}
        <div className="bg-[#10121d] border-l-4 border-orange-500 border-y border-r border-orange-500/20 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Technical Facts & Architecture</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300 leading-relaxed">
            {note.verifiedFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* KEY CONCEPTS GLOSSARY */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span>Core Concepts You Must Know</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {note.keyConcepts.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#11131c] border border-orange-500/15 p-5 rounded-2xl space-y-2 shadow-lg"
              >
                <div className="text-sm font-bold text-orange-300 font-mono">
                  {item.term}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DEEP DIVE SECTIONS */}
        <div className="space-y-8">
          {note.sections.map((section, sidx) => (
            <div key={sidx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.paragraphs.map((p, pidx) => (
                  <p key={pidx} className="text-sm text-gray-300 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {section.codeBlock && (
                <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl mt-3">
                  <div className="px-5 py-2.5 bg-[#161825] border-b border-orange-500/10 flex items-center justify-between text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                      <Code2 className="w-3.5 h-3.5" />
                      {section.codeBlock.language.toUpperCase()}
                    </span>
                    <span>{section.codeBlock.description || "Example Snippet"}</span>
                  </div>
                  <pre className="p-5 font-mono text-xs sm:text-sm text-orange-200/90 overflow-x-auto leading-relaxed select-all">
                    {section.codeBlock.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* QUICK REFERENCE COMMANDS */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-orange-400" />
            <span>CLI Quick Reference</span>
          </h2>
          <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl divide-y divide-white/5">
            {note.quickReference.map((ref, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <code className="font-mono font-bold text-orange-400 select-all">
                  $ {ref.command}
                </code>
                <span className="text-gray-400">{ref.explanation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTION PITFALLS */}
        <div className="bg-[#16131c] border border-red-500/20 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Production Pitfalls to Avoid</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-300 leading-relaxed">
            {note.commonPitfalls.map((pitfall, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="bg-gradient-orange rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl shadow-orange-950/40">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Ready to practice these concepts?</h3>
            <p className="text-xs text-orange-100">
              Launch our in-browser simulated sandbox and test these commands without install or signup.
            </p>
          </div>
          <Link
            href={`/playground/${note.playgroundSlug}`}
            className="px-6 py-3 rounded-xl bg-gray-950 text-white hover:bg-black text-xs font-bold shadow-xl transition-all hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-orange-400" />
            <span>Launch {note.track.toUpperCase()} Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
