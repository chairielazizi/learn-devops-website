"use client";

import React, { useState } from "react";
import primerData from "@/data/playgroundPrimerData.json";
import { Sparkles, HelpCircle, ChevronDown, ChevronUp, Cpu, ShieldCheck, Zap } from "lucide-react";

interface Props {
  tool: "docker" | "kubernetes" | "linux" | "terraform";
}

export default function PlaygroundPrimerSection({ tool }: Props) {
  const data = (primerData as any)[tool];
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  if (!data) return null;

  return (
    <div className="space-y-8 pt-8 border-t border-white/5">
      {/* Three Ideas You Need First */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3" /> Core Mental Model
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Three Ideas You Need First
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            A quick primer before you jump into advanced commands. Skim these concepts, then experiment in the terminal above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.ideas.map((idea: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden shadow-xl flex flex-col justify-between hover:border-orange-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-orange-500/20 font-mono select-none">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    {idx === 0 ? <Zap className="w-4 h-4" /> : idx === 1 ? <Cpu className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {idea.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {idea.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How the Playground Works */}
      <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-orange-400" />
          How the In-Browser Simulation Engine Works
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Unlike platforms that provision heavy remote virtual machines with cold start delays and time limits, this playground runs a high-fidelity client-side state machine implemented in TypeScript. Commands execute instantly in your browser memory with full state persistence, realistic latency simulation, and mock image registries. It is 100% safe to run destructive commands like pruning or deleting volumes without affecting your local system.
        </p>
      </div>

      {/* FAQs Accordion */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3 pt-2">
            {data.faqs.map((faq: any, fIdx: number) => {
              const isOpen = !!openFaq[fIdx];
              return (
                <div
                  key={fIdx}
                  className="border border-white/5 rounded-xl bg-[#0a0b12] overflow-hidden"
                >
                  <div
                    onClick={() => setOpenFaq((prev) => ({ ...prev, [fIdx]: !prev[fIdx] }))}
                    className="p-4 cursor-pointer flex items-center justify-between hover:bg-[#141624] transition-colors"
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {faq.question}
                    </h4>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </div>
                  {isOpen && (
                    <div className="p-4 pt-1 border-t border-white/5 text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#0e1018]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

