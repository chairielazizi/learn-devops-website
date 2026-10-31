import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TROUBLESHOOTING_GUIDES } from "@/data/troubleshootingData";
import {
  ArrowLeft,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Copy,
  ArrowRight,
  ShieldAlert,
  Code2,
} from "lucide-react";

interface TroubleshootingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TROUBLESHOOTING_GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function TroubleshootingDetailPage({ params }: TroubleshootingPageProps) {
  const resolved = await params;
  const guide = TROUBLESHOOTING_GUIDES.find((g) => g.slug === resolved.slug);

  if (!guide) {
    notFound();
  }

  const playgroundSlug =
    guide.category === "Docker"
      ? "docker"
      : guide.category === "Kubernetes"
      ? "kubernetes"
      : guide.category === "Terraform"
      ? "terraform"
      : "linux";

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/troubleshooting" className="hover:text-orange-400 transition-colors">
            Troubleshooting Matrix
          </Link>
          <span>/</span>
          <span className="text-orange-400 truncate">{guide.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-8 sm:p-10 space-y-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
              {guide.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                guide.severity === "Critical"
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {guide.severity} Severity
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
            {guide.rootCause}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href={`/playground/${playgroundSlug}`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Diagnose in {guide.category} Playground</span>
            </Link>
            <Link
              href="/troubleshooting"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#161927] hover:bg-[#1a1e2f] text-gray-300 text-xs font-semibold border border-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Error Matrix</span>
            </Link>
          </div>
        </div>

        {/* Error Signature Card */}
        <div className="bg-[#140e15] border border-red-500/30 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Observed Error Signature / Log Pattern</span>
            </span>
          </div>
          <pre className="p-4 rounded-xl bg-[#0f172a] border border-red-500/20 font-mono text-xs text-red-300 whitespace-pre-wrap break-all select-all">
            {guide.errorSnippet}
          </pre>
        </div>

        {/* Remediation & Diagnostics Sections */}
        <div className="space-y-8">
          {guide.sections?.map((section, sidx) => (
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
                    <span>{section.codeBlock.description || "Command"}</span>
                  </div>
                  <pre className="p-5 font-mono text-xs sm:text-sm text-orange-200/90 overflow-x-auto leading-relaxed select-all">
                    {section.codeBlock.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="bg-gradient-orange rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl shadow-orange-950/40">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Need to practice this scenario?</h3>
            <p className="text-xs text-orange-100">
              Simulate this error condition and practice recovery commands safely in our in-browser terminal.
            </p>
          </div>
          <Link
            href={`/playground/${playgroundSlug}`}
            className="px-6 py-3 rounded-xl bg-gray-950 text-white hover:bg-black text-xs font-bold shadow-xl transition-all hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-orange-400" />
            <span>Open {guide.category} Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

