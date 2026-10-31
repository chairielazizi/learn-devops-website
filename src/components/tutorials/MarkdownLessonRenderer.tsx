"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, HelpCircle, Code2 } from "lucide-react";

interface Props {
  markdown: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function CodeBlockWithCopy({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const lang = match ? match[1] : "bash";
  const codeContent = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0b1120] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl my-5 group">
      <div className="px-4 py-2.5 bg-[#101827] border-b border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-wider text-[11px]">
          <Code2 className="w-4 h-4 text-orange-500" />
          <span>{lang}</span>
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 sm:p-5 overflow-x-auto text-sm sm:text-[15px] font-mono text-slate-200 leading-relaxed">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{codeContent}</code>
        </pre>
      </div>
    </div>
  );
}

export default function MarkdownLessonRenderer({ markdown }: Props) {
  // Check if markdown has an FAQ section
  let mainBody = markdown;
  let faqList: { question: string; answer: string }[] = [];

  const faqSplit = markdown.split(/##\s+Frequently Asked Questions/i);
  if (faqSplit.length > 1) {
    mainBody = faqSplit[0].trim();
    const faqText = faqSplit[1].trim();

    // Split questions formatted like **Question?**
    const parts = faqText.split(/\n\s*\*\*([^*]+)\*\*\s*\n/);
    for (let i = 1; i < parts.length; i += 2) {
      const q = parts[i].trim();
      const a = (parts[i + 1] || "").trim();
      if (q) {
        faqList.push({ question: q, answer: a });
      }
    }
  }

  const markdownComponents = {
    h2({ children }: { children?: React.ReactNode }) {
      const headingText = React.Children.toArray(children).join("");
      const id = slugify(headingText);
      return (
        <h2
          id={id}
          className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3 mt-10 mb-4 pt-6 border-t border-slate-800/70 first:border-t-0 first:pt-0 first:mt-0 scroll-mt-24"
        >
          <span className="w-1.5 h-6 bg-gradient-orange rounded-full shrink-0" />
          <span>{children}</span>
        </h2>
      );
    },
    h3({ children }: { children?: React.ReactNode }) {
      const headingText = React.Children.toArray(children).join("");
      const id = slugify(headingText);
      return (
        <h3
          id={id}
          className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight mt-6 mb-3 scroll-mt-24"
        >
          {children}
        </h3>
      );
    },
    p({ children }: { children?: React.ReactNode }) {
      return (
        <p className="text-base sm:text-[17px] text-slate-200 leading-relaxed my-3.5 font-normal">
          {children}
        </p>
      );
    },
    code({ inline, className, children, ...props }: any) {
      // Inline vs block code
      const isInline = inline || !className;
      if (isInline) {
        return (
          <code className="bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono text-[13px] sm:text-sm px-1.5 py-0.5 rounded font-medium inline-block my-0.5">
            {children}
          </code>
        );
      }
      return <CodeBlockWithCopy className={className}>{children}</CodeBlockWithCopy>;
    },
    pre({ children }: { children?: React.ReactNode }) {
      return <>{children}</>;
    },
    table({ children }: { children?: React.ReactNode }) {
      return (
        <div className="overflow-x-auto my-6 rounded-2xl border border-slate-800 bg-[#141d2e]/60 shadow-xl">
          <table className="min-w-full divide-y divide-slate-800 text-sm sm:text-base">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }: { children?: React.ReactNode }) {
      return <thead className="bg-[#182234] border-b border-slate-700/80">{children}</thead>;
    },
    th({ children }: { children?: React.ReactNode }) {
      return (
        <th className="px-4 sm:px-5 py-3 text-left font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
          {children}
        </th>
      );
    },
    td({ children }: { children?: React.ReactNode }) {
      return (
        <td className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 leading-relaxed">
          {children}
        </td>
      );
    },
    ul({ children }: { children?: React.ReactNode }) {
      return <ul className="space-y-2.5 my-4 pl-5">{children}</ul>;
    },
    ol({ children }: { children?: React.ReactNode }) {
      return <ol className="space-y-2.5 my-4 pl-5 list-decimal marker:text-orange-400">{children}</ol>;
    },
    li({ children }: { children?: React.ReactNode }) {
      return (
        <li className="text-base sm:text-[17px] text-slate-200 leading-relaxed list-disc marker:text-orange-400">
          {children}
        </li>
      );
    },
    strong({ children }: { children?: React.ReactNode }) {
      return <strong className="font-bold text-white">{children}</strong>;
    },
    blockquote({ children }: { children?: React.ReactNode }) {
      return (
        <blockquote className="border-l-4 border-orange-500 bg-[#162032] p-4 my-5 rounded-r-2xl text-slate-300 italic text-base sm:text-[16px] shadow-md">
          {children}
        </blockquote>
      );
    },
    a({ href, children }: { href?: string; children?: React.ReactNode }) {
      return (
        <a
          href={href}
          className="text-orange-400 hover:text-orange-300 underline underline-offset-4 decoration-orange-500/40 hover:decoration-orange-400 font-medium transition-colors"
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="space-y-6">
      {/* Main Lesson Body */}
      <div className="prose-slate max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {mainBody}
        </ReactMarkdown>
      </div>

      {/* Frequently Asked Questions */}
      {faqList.length > 0 && (
        <section id="frequently-asked-questions" className="pt-8 border-t border-slate-800/80 scroll-mt-24 space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-gradient-orange rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-400" />
              <span>Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#182234] border border-slate-800 hover:border-orange-500/40 rounded-2xl p-5 sm:p-6 transition-all space-y-3 group shadow-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 font-mono text-xs font-bold border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    Q
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-200 transition-colors leading-snug">
                    {item.question}
                  </h3>
                </div>

                <div className="pl-0 sm:pl-9 text-base sm:text-[16px] text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p({ children }) {
                        return <p className="text-slate-300 leading-relaxed">{children}</p>;
                      },
                      code({ children }) {
                        return (
                          <code className="bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono text-[13px] sm:text-sm px-1.5 py-0.5 rounded font-medium inline-block">
                            {children}
                          </code>
                        );
                      },
                      strong({ children }) {
                        return <strong className="font-bold text-white">{children}</strong>;
                      },
                    }}
                  >
                    {item.answer}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
