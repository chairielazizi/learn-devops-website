import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CERTIFICATIONS } from "@/data/certificationsData";
import CertificationDetailClient from "./CertificationDetailClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CERTIFICATIONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const cert = CERTIFICATIONS.find((c) => c.slug === resolved.slug);
  if (!cert) {
    return {
      title: "Certification Blueprint — Learn DevOps",
    };
  }

  return {
    title: `${cert.title} (${cert.code}) Exam Guide & Blueprint — Learn DevOps`,
    description: `Pass the ${cert.title} with complete tested exam domain weights, topics breakdown, practice questions, and hands-on preparation strategy.`,
  };
}

async function CertDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const cert = CERTIFICATIONS.find((c) => c.slug === resolved.slug);

  if (!cert) {
    notFound();
  }

  // Find related certifications (same provider or complementary)
  const relatedCerts = CERTIFICATIONS.filter(
    (c) => c.slug !== cert.slug && (c.providerId === cert.providerId || c.level === cert.level)
  ).slice(0, 3);

  return <CertificationDetailClient cert={cert} relatedCerts={relatedCerts} />;
}

function CertSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-4 w-40 bg-slate-800 rounded" />
        <div className="h-64 bg-[#141d2e] rounded-3xl" />
        <div className="h-12 w-96 bg-slate-800 rounded-xl" />
        <div className="space-y-4">
          <div className="h-40 bg-[#141d2e] rounded-2xl" />
          <div className="h-40 bg-[#141d2e] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function CertificationDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CertSkeleton />}>
      <CertDetailContent params={params} />
    </Suspense>
  );
}
