"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Play, ArrowLeft, Copy, Check, Sparkles } from "lucide-react";

const PRESETS = [
  { label: "Every 5 minutes", expr: "*/5 * * * *" },
  { label: "Every hour at minute 0", expr: "0 * * * *" },
  { label: "Every day at midnight", expr: "0 0 * * *" },
  { label: "Every Monday at 9:00 AM", expr: "0 9 * * 1" },
  { label: "Every 15 minutes during work hours", expr: "*/15 9-17 * * 1-5" },
  { label: "1st of every month at midnight", expr: "0 0 1 * *" },
];

export default function CronParserPage() {
  const [cron, setCron] = useState("*/15 * * * *");
  const [copied, setCopied] = useState(false);

  const parts = cron.trim().split(/\s+/);
  const isValid = parts.length === 5;

  const describeCron = (parts: string[]): string => {
    if (parts.length !== 5) return "Invalid cron expression (must have exactly 5 parts: min hour day month dow)";
    const [min, hour, dom, mon, dow] = parts;

    let desc = "Runs ";
    if (min.startsWith("*/")) desc += `every ${min.slice(2)} minutes `;
    else if (min === "*") desc += "every minute ";
    else desc += `at minute ${min} `;

    if (hour.startsWith("*/")) desc += `past every ${hour.slice(2)} hours `;
    else if (hour === "*") {
      // past every hour
    } else desc += `past hour ${hour} `;

    if (dom !== "*") desc += `on day ${dom} of month `;
    if (mon !== "*") desc += `in month ${mon} `;
    if (dow !== "*") desc += `on day-of-week ${dow} `;

    return desc.trim() + ".";
  };

  const copyText = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Tools & Cheatsheets
        </Link>

        {/* Title */}
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" /> Interactive DevOps Tool
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cron Expression <span className="text-gradient-orange">Parser & Tester</span>
          </h1>
          <p className="mt-2 text-gray-400 text-base">
            Translate standard 5-part cron syntax into plain English, inspect each time block, and verify execution schedules.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#11131c] rounded-2xl border border-orange-500/20 p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Input field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Cron Expression (Minute Hour Day-of-Month Month Day-of-Week)</span>
              <button
                onClick={copyText}
                className="text-orange-400 hover:text-orange-300 inline-flex items-center space-x-1 text-xs lowercase"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </label>
            <div className="relative">
              <input
                type="text"
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                className="w-full bg-[#0a0b12] border border-orange-500/30 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-orange-200 font-mono text-xl sm:text-2xl px-5 py-4 rounded-xl outline-none"
                placeholder="* * * * *"
              />
            </div>
          </div>

          {/* Natural Language Translation */}
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <div className="text-xs font-semibold uppercase text-orange-400 tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Human Readable Schedule
            </div>
            <div className="text-lg font-medium text-white">{describeCron(parts)}</div>
          </div>

          {/* Visual Breakdown Grid */}
          {isValid && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { title: "Minute", val: parts[0], range: "0-59" },
                { title: "Hour", val: parts[1], range: "0-23" },
                { title: "Day of Month", val: parts[2], range: "1-31" },
                { title: "Month", val: parts[3], range: "1-12 or JAN-DEC" },
                { title: "Day of Week", val: parts[4], range: "0-6 (Sun-Sat)" },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#171a27] p-3.5 rounded-xl border border-white/5 text-center space-y-1">
                  <div className="text-xs text-gray-400">{item.title}</div>
                  <div className="text-xl font-bold font-mono text-orange-400">{item.val}</div>
                  <div className="text-[10px] text-gray-400">{item.range}</div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Presets */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Common DevOps Presets</div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.expr}
                  onClick={() => setCron(p.expr)}
                  className="px-3 py-1.5 rounded-lg bg-[#181b29] hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/40 text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Play className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
                  <span>{p.label}</span>
                  <code className="text-orange-400 text-[11px] font-mono ml-1">({p.expr})</code>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

