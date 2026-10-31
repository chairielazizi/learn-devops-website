"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Award,
  ArrowLeft,
  ExternalLink,
  Terminal,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { CertificationGuide } from "@/data/certificationsData";

interface Props {
  cert: CertificationGuide;
  relatedCerts: CertificationGuide[];
}

export default function CertificationDetailClient({ cert, relatedCerts }: Props) {
  const [activeTab, setActiveTab] = useState<"domains" | "tips" | "pitfalls" | "questions">("domains");
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  const toggleQuestion = (idx: number) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-orange-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/certifications" className="hover:text-orange-400 transition-colors">
            Certifications
          </Link>
          <span>/</span>
          <span className="text-orange-400 font-semibold">{cert.code}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#141d2e] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {cert.code}
              </span>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700/80">
                {cert.level} Level
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {cert.providerName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {cert.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
              {cert.description}
            </p>

            {/* Prerequisites Callout */}
            <div className="p-4 rounded-2xl bg-[#101827] border border-slate-800/80 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
              <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Recommended Prerequisites: </span>
                <span className="text-slate-400">{cert.prerequisites}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#182234] border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Exam Duration</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">{cert.duration}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#182234] border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Passing Score</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-emerald-400">{cert.passingScore}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#182234] border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <DollarSign className="w-3.5 h-3.5 text-orange-400" />
                <span>Registration Cost</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-orange-300 font-mono">{cert.cost}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#182234] border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Exam Format</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 line-clamp-1">{cert.format}</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            <a
              href={cert.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-orange hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
            >
              <span>Official Exam Registration</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {cert.playgroundUrl && (
              <Link
                href={cert.playgroundUrl}
                className="px-5 py-3 rounded-xl bg-[#182234] hover:bg-[#1e2b42] border border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Terminal className="w-4 h-4 text-orange-400" />
                <span>Launch Hands-On Simulator</span>
              </Link>
            )}

            {cert.tutorialUrl && (
              <Link
                href={cert.tutorialUrl}
                className="px-5 py-3 rounded-xl bg-[#182234] hover:bg-[#1e2b42] border border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>Explore Related Tutorials</span>
              </Link>
            )}
          </div>
        </div>

        {/* Content Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab("domains")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "domains"
                ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tested Domains & Topics ({cert.domains.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tips")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "tips"
                ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>High-Yield Strategy Tips ({cert.tips.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pitfalls")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "pitfalls"
                ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Exam Pitfalls ({cert.pitfalls.length})</span>
          </button>

          {cert.sampleQuestions.length > 0 && (
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "questions"
                  ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Sample Exam Questions ({cert.sampleQuestions.length})</span>
            </button>
          )}
        </div>

        {/* TAB 1: DOMAINS & IN-DEPTH TOPICS */}
        {activeTab === "domains" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Complete Exam Blueprint & Tested Competencies</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Total 100% Weight
              </span>
            </div>

            <div className="space-y-6">
              {cert.domains.map((domain, didx) => (
                <div
                  key={didx}
                  className="bg-[#141d2e] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl"
                >
                  {/* Domain Header with Weight Bar */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {didx + 1}. {domain.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 self-start sm:self-auto">
                        Weight: {domain.weight}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-orange h-full rounded-full transition-all duration-700"
                        style={{ width: `${domain.weight}%` }}
                      />
                    </div>
                  </div>

                  {/* Tested Topics List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      <span>Key Exam Topics Tested:</span>
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {domain.topics.map((t, tidx) => (
                        <li key={tidx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#101827] border border-slate-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-2" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hands-on Practical Competencies */}
                  {domain.competencies.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/60">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span>Practical Competencies & Skills Required:</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                        {domain.competencies.map((c, cidx) => (
                          <li key={cidx} className="flex items-start gap-2.5">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HIGH YIELD STRATEGIES & TIPS */}
        {activeTab === "tips" && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>High-Yield Strategy Tips for {cert.code}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cert.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-[#141d2e] border border-slate-800 hover:border-orange-500/30 rounded-2xl p-5 space-y-2.5 shadow-xl transition-all"
                >
                  <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>Strategy #{idx + 1}</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMMON PITFALLS */}
        {activeTab === "pitfalls" && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Common Pitfalls & Exam Traps</span>
            </h2>

            <div className="space-y-4">
              {cert.pitfalls.map((pitfall, idx) => (
                <div
                  key={idx}
                  className="bg-[#1f131a] border border-red-500/20 rounded-2xl p-5 space-y-2 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Exam Trap #{idx + 1}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pitfall}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SAMPLE EXAM QUESTIONS */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Realistic Scenario Practice Questions</span>
            </h2>

            <div className="space-y-6">
              {cert.sampleQuestions.map((q, qidx) => {
                const isRevealed = Boolean(revealedQuestions[qidx]);
                return (
                  <div
                    key={qidx}
                    className="bg-[#141d2e] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl"
                  >
                    <div className="flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-400 font-mono text-xs font-bold border border-orange-500/30 shrink-0">
                        Q{qidx + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                        {q.question}
                      </h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pl-2 sm:pl-10">
                      {q.options.map((opt, oidx) => {
                        const isCorrect = oidx === q.correctIndex;
                        return (
                          <div
                            key={oidx}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                              isRevealed && isCorrect
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-semibold"
                                : "bg-[#101827] border-slate-800/80 text-slate-300"
                            }`}
                          >
                            <span className="font-mono font-bold text-slate-400 shrink-0">
                              {String.fromCharCode(65 + oidx)}.
                            </span>
                            <span>{opt}</span>
                            {isRevealed && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Reveal Button */}
                    <div className="pl-2 sm:pl-10 pt-2">
                      <button
                        onClick={() => toggleQuestion(qidx)}
                        className="px-4 py-2 rounded-xl bg-[#182234] hover:bg-[#1e2b42] border border-slate-700 text-xs font-bold text-orange-400 flex items-center gap-1.5 transition-all"
                      >
                        {isRevealed ? (
                          <>
                            <span>Hide Explanation</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Reveal Answer & Explanation</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {isRevealed && (
                        <div className="mt-4 p-4 rounded-xl bg-[#101c26] border border-emerald-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1.5">
                          <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Correct Answer: Option {String.fromCharCode(65 + q.correctIndex)}</span>
                          </div>
                          <p className="text-slate-300">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Certifications */}
        {relatedCerts.length > 0 && (
          <section className="pt-10 border-t border-slate-800/80 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Related DevOps & Cloud Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCerts.map((rc) => (
                <Link
                  key={rc.id}
                  href={`/certifications/${rc.slug}`}
                  className="bg-[#141d2e] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-orange-500/10"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/15 text-orange-400">
                        {rc.code}
                      </span>
                      <span className="text-[11px] text-slate-400">{rc.level}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                      {rc.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {rc.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">{rc.duration}</span>
                    <span className="text-orange-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Blueprint <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
