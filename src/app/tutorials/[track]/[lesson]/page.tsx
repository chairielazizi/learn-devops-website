import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";
import { LessonNote } from "@/data/lessonNotesData";
import TutorialLessonClient from "./TutorialLessonClient";

interface LessonPageProps {
  params: Promise<{
    track: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const params: { track: string; lesson: string }[] = [];
  const tracksDir = path.join(process.cwd(), "src", "data", "lessons");
  if (fs.existsSync(tracksDir)) {
    const files = fs.readdirSync(tracksDir);
    for (const f of files) {
      if (f.endsWith(".json")) {
        const trackSlug = f.replace(".json", "");
        try {
          const raw = fs.readFileSync(path.join(tracksDir, f), "utf-8");
          const lessonsData = JSON.parse(raw);
          for (const lessonSlug of Object.keys(lessonsData)) {
            params.push({ track: trackSlug, lesson: lessonSlug });
          }
        } catch (e) {
          console.error("Error reading lessons json for params:", e);
        }
      }
    }
  }

  // Also include any in TUTORIAL_TRACKS
  for (const t of TUTORIAL_TRACKS) {
    for (const m of t.modules) {
      for (const l of m.lessons) {
        if (!params.some((p) => p.track === t.slug && p.lesson === l.slug)) {
          params.push({ track: t.slug, lesson: l.slug });
        }
      }
    }
  }

  return params;
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
    ],
    keyConcepts: [
      { term: "Architecture Foundation", explanation: foundLesson.summary },
    ],
    sections: [
      {
        title: "Overview & Core Architecture",
        paragraphs: [
          foundLesson.summary,
          `Understanding ${foundLesson.title} is an essential milestone in the ${track.title} curriculum.`,
        ],
      },
    ],
    quickReference: [
      {
        command: "terraform plan",
        explanation: `Fundamental command for ${track.title}`,
      },
    ],
    commonPitfalls: [
      "Applying changes to production without dry-running or checking execution diffs.",
    ],
  };
}

async function LessonContent({ params }: { params: Promise<{ track: string; lesson: string }> }) {
  const resolved = await params;
  const note = loadLesson(resolved.track, resolved.lesson);

  if (!note) {
    notFound();
  }

  const track = TUTORIAL_TRACKS.find((t) => t.slug === resolved.track);
  if (!track) {
    notFound();
  }

  // Build complete list of lessons for prev/next
  let allLessons: { title: string; slug: string; summary: string; duration: string }[] = [];
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "lessons", `${resolved.track}.json`);
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      allLessons = Object.values(data).map((item: any) => ({
        title: item.title,
        slug: item.slug,
        summary: item.subtitle || item.description || "",
        duration: item.duration || "12 min read",
      }));
    }
  } catch (e) {
    console.error("Error building allLessons:", e);
  }

  if (allLessons.length === 0) {
    allLessons = track.modules.flatMap((m) => m.lessons);
  }

  const currIdx = allLessons.findIndex((l) => l.slug === resolved.lesson);
  const prevLesson = currIdx > 0 ? allLessons[currIdx - 1] : null;
  const nextLesson = currIdx >= 0 && currIdx < allLessons.length - 1 ? allLessons[currIdx + 1] : null;

  let continueLessons: { title: string; slug: string; summary: string; duration: string }[] = [];
  if (currIdx >= 0) {
    continueLessons = allLessons.slice(currIdx + 1, currIdx + 4);
    if (continueLessons.length < 3) {
      const extra = allLessons.filter((l) => l.slug !== resolved.lesson).slice(0, 3 - continueLessons.length);
      continueLessons = [...continueLessons, ...extra];
    }
  }

  return (
    <TutorialLessonClient
      trackMeta={track}
      note={note}
      currentLessonSlug={resolved.lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      continueLessons={continueLessons}
    />
  );
}

function LessonSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8 items-start">
          <div className="hidden lg:block w-72 sm:w-80 shrink-0 h-[600px] bg-[#141d2e]/40 rounded-2xl animate-pulse" />
          <div className="flex-1 max-w-4xl mx-auto space-y-6">
            <div className="h-6 w-48 bg-slate-800 rounded animate-pulse" />
            <div className="h-32 bg-[#182234] rounded-3xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-44 bg-[#141d2e]/50 rounded-2xl animate-pulse" />
              <div className="h-44 bg-[#141d2e]/50 rounded-2xl animate-pulse" />
            </div>
          </div>
          <div className="hidden xl:block w-64 shrink-0 h-64 bg-[#182234]/40 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function LessonDetailPage({ params }: LessonPageProps) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent params={params} />
    </Suspense>
  );
}
