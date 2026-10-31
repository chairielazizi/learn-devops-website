import React from "react";
import { notFound } from "next/navigation";
import { INTERVIEW_TRACKS, INTERVIEW_QUESTIONS_BY_TRACK } from "@/data/interviewsData";
import TrackQuestionsClient from "./TrackQuestionsClient";

interface PageProps {
  params: Promise<{ track: string }>;
}

export async function generateStaticParams() {
  return INTERVIEW_TRACKS.map((t) => ({ track: t.slug }));
}

export default async function InterviewTrackPage({ params }: PageProps) {
  const resolved = await params;
  const track = INTERVIEW_TRACKS.find((t) => t.slug === resolved.track);

  if (!track) {
    notFound();
  }

  const questions = INTERVIEW_QUESTIONS_BY_TRACK[track.slug] || [];

  return <TrackQuestionsClient track={track} questions={questions} />;
}

