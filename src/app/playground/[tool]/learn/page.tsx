import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import learnData from "@/data/playgroundLearnData.json";
import { 
  ArrowLeft, 
  Terminal, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Award
} from "lucide-react";

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return [
    { tool: "docker" },
    { tool: "kubernetes" },
    { tool: "linux" },
    { tool: "terraform" },
  ];
}

const META: Record<string, { name: string; icon: string; desc: string }> = {
  docker: {
    name: "Docker",
    icon: "🐳",
    desc: "From zero to confident with containers, multi-stage builds, and Compose."
  },
  kubernetes: {
    name: "Kubernetes",
    icon: "☸️",
    desc: "From zero to confident with kubectl, Pods, Deployments, and cluster operations."
  },
  linux: {
    name: "Linux & Bash",
    icon: "🐧",
    desc: "From zero to confident with permissions, pipes, processes, and scripting."
  },
  terraform: {
    name: "Terraform",
    icon: "🏗️",
    desc: "From zero to confident with HCL, state management, and cloud infrastructure."
  }
};

export default async function PlaygroundLearnPage({ params }: Props) {
  const resolved = await params;
  const toolSlug = resolved.tool;
  const data = (learnData as any)[toolSlug];
  const meta = META[toolSlug];

  if (!data || !meta) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href={`/playground/${toolSlug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {meta.name} Playground</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="bg-[#11131c] rounded-3xl border border-orange-500/20 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-4xl sm:text-5xl">{meta.icon}</span>
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" /> Hands-On Curriculum
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Learn <span className="text-gradient-orange">{meta.name}</span>
                </h1>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                href={`/playground/${toolSlug}`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-4 h-4" />
                Launch Interactive Sandbox
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
            {meta.desc} Master real production commands with interactive in-browser simulation, step-by-step verified explanations, and zero local setup.
          </p>
        </div>

        {/* Modules Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curriculum Modules: From Zero to Confident
            </h2>
            <Link
              href={`/tutorials/${toolSlug}`}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
            >
              Browse all {meta.name} lessons <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.modules.map((m: any, idx: number) => (
              <div
                key={idx}
                className="bg-[#11131c] rounded-2xl border border-orange-500/20 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start justify-between gap-4 hover:border-orange-500/40 transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-8">
                    {m.desc}
                  </p>
                </div>

                <div className="shrink-0 pl-8 sm:pl-0">
                  <Link
                    href={`/playground/${toolSlug}`}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#181a28] hover:bg-[#202334] border border-white/10 text-xs font-medium text-orange-400 hover:text-orange-300 transition-all"
                  >
                    <span>Practice in Lab</span>
                    <Terminal className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-400" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 pt-2">
              {data.faqs.map((faq: any, fIdx: number) => (
                <div
                  key={fIdx}
                  className="border border-white/5 rounded-xl bg-[#0a0b12] p-4 space-y-1.5"
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-white">
                    {faq.question.replace(/\+$/, "").trim()}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
