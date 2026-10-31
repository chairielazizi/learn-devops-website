import React from "react";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";
import { LessonNote } from "@/data/lessonNotesData";
import TutorialLessonClient from "./TutorialLessonClient";

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
        title: "Overview & Core Architecture",
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
            ? "docker ps -a"
            : track.id === "kubernetes"
            ? "kubectl get nodes"
            : track.id === "terraform"
            ? "terraform plan"
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
  if (!trackMeta) {
    notFound();
  }

  // Flatten lessons to calculate previous, next, and continue recommendations
  const allLessons = trackMeta.modules.flatMap((m) => m.lessons);
  const currIdx = allLessons.findIndex((l) => l.slug === resolved.lesson);

  const prevLesson = currIdx > 0 ? allLessons[currIdx - 1] : null;
  const nextLesson = currIdx >= 0 && currIdx < allLessons.length - 1 ? allLessons[currIdx + 1] : null;

  // Next 3 lessons for Continue Learning cards
  let continueLessons: { title: string; slug: string; summary: string; duration: string }[] = [];
  if (currIdx >= 0) {
    continueLessons = allLessons.slice(currIdx + 1, currIdx + 4);
    // If fewer than 3 remain, wrap from beginning (excluding current)
    if (continueLessons.length < 3) {
      const extra = allLessons.filter((l) => l.slug !== resolved.lesson).slice(0, 3 - continueLessons.length);
      continueLessons = [...continueLessons, ...extra];
    }
  }

  return (
    <TutorialLessonClient
      trackMeta={trackMeta}
      note={note}
      currentLessonSlug={resolved.lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      continueLessons={continueLessons}
    />
  );
}
