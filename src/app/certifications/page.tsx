"use client";

import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, ArrowRight, ShieldCheck, Clock, Terminal } from "lucide-react";
import { CERTIFICATIONS } from "@/data/certificationsData";

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" /> Industry Credentials
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps & Kubernetes <span className="text-gradient-orange">Certifications</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base max-w-2xl">
            Pass your CKA, CKAD, and KCNA exams with confidence using domain blueprints, strategy guides, and browser-based exam simulators.
          </p>
        </div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#11131c] rounded-2xl border border-orange-500/20 hover:border-orange-500/50 p-7 flex flex-col justify-between shadow-xl hover:shadow-orange-950/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {cert.code}
                  </span>
                  <span className="text-xs text-gray-400">{cert.organization}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {cert.description}
                </p>

                {/* Exam Meta */}
                <div className="p-3 rounded-xl bg-[#161927] border border-white/5 space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span className="font-medium text-white">{cert.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Passing Score:</span>
                    <span className="font-bold text-emerald-400">{cert.passingScore}</span>
                  </div>
                </div>

                {/* Domain Breakdown */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">Exam Domain Weights:</div>
                  <div className="space-y-1.5">
                    {cert.domains.map((d) => (
                      <div key={d.name} className="space-y-0.5">
                        <div className="flex justify-between text-[11px] text-gray-300">
                          <span className="truncate pr-2">{d.name}</span>
                          <span className="text-orange-400 font-mono font-semibold">{d.weight}%</span>
                        </div>
                        <div className="w-full bg-[#1b1f2e] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-orange h-full rounded-full"
                            style={{ width: `${d.weight}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                {cert.code === "CKA" ? (
                  <Link
                    href="/playground/kubernetes/cka"
                    className="w-full py-2.5 rounded-xl bg-gradient-orange text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Launch CKA Simulator</span>
                  </Link>
                ) : (
                  <Link
                    href="/tutorials/kubernetes"
                    className="w-full py-2.5 rounded-xl bg-[#181b29] hover:bg-orange-500/10 text-orange-300 text-xs font-bold border border-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Study Guides</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

