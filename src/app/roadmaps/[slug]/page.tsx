import React from "react";
import { notFound } from "next/navigation";
import { ROADMAPS } from "@/data/roadmapsData";
import RoadmapClient from "./RoadmapClient";

interface RoadmapPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ROADMAPS.map((r) => ({ slug: r.slug }));
}

export default async function RoadmapDetailPage({ params }: RoadmapPageProps) {
  const resolved = await params;
  const roadmap = ROADMAPS.find((r) => r.slug === resolved.slug);

  if (!roadmap) {
    notFound();
  }

  return <RoadmapClient roadmap={roadmap} />;
}
