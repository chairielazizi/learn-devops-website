"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Terminal,
  ExternalLink,
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  FileText
} from "lucide-react";
import {
  CERTIFICATIONS,
  CERTIFICATION_PROVIDERS,
  CertificationGuide,
  CertificationProvider
} from "@/data/certificationsData";

export default function CertificationsPage() {
  const [selectedProvider, setSelectedProvider] = useState<string>("all");

  const filteredCerts =
    selectedProvider === "all"
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((c) => c.providerId === selectedProvider);

  // Group certifications by provider for the separated section view
  const groupedProviders = CERTIFICATION_PROVIDERS.map((p) => ({
    ...p,
    certs: CERTIFICATIONS.filter((c) => c.providerId === p.id),
  })).filter((p) => p.certs.length > 0);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center sm:text-left space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Industry Recognized Credentials
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            DevOps & Cloud <span className="text-gradient-orange">Certifications</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Comprehensive exam blueprints, deep domain breakdowns, official registration links, and
            strategy guides across Kubernetes, HashiCorp Terraform, AWS, Microsoft Azure, and Google Cloud.
          </p>
        </div>

        {/* Provider Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
          <button
            onClick={() => setSelectedProvider("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedProvider === "all"
                ? "bg-gradient-orange text-white shadow-lg shadow-orange-500/20"
                : "bg-[#182234] text-slate-400 hover:text-white hover:bg-[#1e2b42] border border-slate-800"
            }`}
          >
            All Providers ({CERTIFICATIONS.length})
          </button>
          {CERTIFICATION_PROVIDERS.map((provider) => {
            const count = CERTIFICATIONS.filter((c) => c.providerId === provider.id).length;
            const isSelected = selectedProvider === provider.id;
            return (
              <button
                key={provider.id}
                onClick={() => setSelectedProvider(provider.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-orange text-white shadow-lg shadow-orange-500/20"
                    : "bg-[#182234] text-slate-400 hover:text-white hover:bg-[#1e2b42] border border-slate-800"
                }`}
              >
                <span>{provider.shortName}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Separated By Provider Sections */}
        {selectedProvider === "all" ? (
          <div className="space-y-16">
            {groupedProviders.map((provider) => (
              <section key={provider.id} className="space-y-6">
                {/* Provider Section Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {provider.name}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 pl-5">
                      {provider.description}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {provider.certs.length} Certifications
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provider.certs.map((cert) => (
                    <CertificationCard key={cert.id} cert={cert} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Filtered View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CertificationCard({ cert }: { cert: CertificationGuide }) {
  return (
    <div className="bg-[#141d2e] rounded-2xl border border-slate-800 hover:border-orange-500/50 p-6 flex flex-col justify-between shadow-xl hover:shadow-orange-950/20 transition-all group">
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              {cert.code}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300">
              {cert.level}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">
            {cert.providerName.split("(")[0].trim()}
          </span>
        </div>

        {/* Title */}
        <Link href={`/certifications/${cert.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors leading-snug">
            {cert.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
          {cert.description}
        </p>

        {/* Exam Quick Specs */}
        <div className="p-3.5 rounded-xl bg-[#101827] border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Duration:</span>
            <span className="font-medium text-white">{cert.duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Passing Score:</span>
            <span className="font-bold text-emerald-400">{cert.passingScore}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Exam Cost:</span>
            <span className="font-mono text-orange-300 font-semibold">{cert.cost}</span>
          </div>
        </div>

        {/* Top Domain Breakdown Preview */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider flex items-center justify-between">
            <span>Exam Domains ({cert.domains.length})</span>
            <span className="text-slate-400 font-mono text-[10px]">Weight</span>
          </div>
          <div className="space-y-2">
            {cert.domains.slice(0, 3).map((d) => (
              <div key={d.name} className="space-y-0.5">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span className="truncate pr-2">{d.name}</span>
                  <span className="text-orange-400 font-mono font-semibold shrink-0">
                    {d.weight}%
                  </span>
                </div>
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-orange h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.weight}%` }}
                  />
                </div>
              </div>
            ))}
            {cert.domains.length > 3 && (
              <div className="text-[11px] text-slate-400 italic text-right">
                +{cert.domains.length - 3} more domain areas
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-5 border-t border-slate-800 space-y-2.5">
        {/* Explore Detailed Topics & Blueprint */}
        <Link
          href={`/certifications/${cert.slug}`}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-orange hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 group-hover:shadow-orange-500/30"
        >
          <span>View Detailed Topics & Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Direct Link to Official Exam Page */}
        <a
          href={cert.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-xl bg-[#182234] hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-all flex items-center justify-center gap-1.5"
          title={`Visit official ${cert.title} registration page`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
          <span>Official Exam Registration Page</span>
        </a>
      </div>
    </div>
  );
}
