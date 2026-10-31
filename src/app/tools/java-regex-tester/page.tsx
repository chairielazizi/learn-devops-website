"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Code, 
  HelpCircle,
  FileCode
} from "lucide-react";

export default function JavaRegexTesterPage() {
  const [pattern, setPattern] = useState("(?<ip>\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}):(?<port>\\d+)");
  const [flags, setFlags] = useState<{ i: boolean; m: boolean; s: boolean }>({
    i: false,
    m: false,
    s: false,
  });
  const [testText, setTestText] = useState(
    "Cluster nodes: worker-1 at 10.0.1.5:8080 and worker-2 at 10.0.1.6:9090."
  );
  const [replacement, setReplacement] = useState("Endpoint: ${ip} (Port ${port})");
  const [copied, setCopied] = useState(false);

  const flagStr = useMemo(() => {
    let f = "g";
    if (flags.i) f += "i";
    if (flags.m) f += "m";
    if (flags.s) f += "s";
    return f;
  }, [flags]);

  const { matches, error } = useMemo(() => {
    try {
      // Normalize Java double backslashes if user pasted straight from Java string
      let normalized = pattern;
      if (normalized.includes("\\\\")) {
        normalized = normalized.replace(/\\\\/g, "\\");
      }
      const reg = new RegExp(normalized, flagStr);
      const res: { text: string; start: number; end: number; groups: Record<string, string> }[] = [];
      let m;
      let guard = 0;
      while ((m = reg.exec(testText)) !== null && guard < 500) {
        guard++;
        res.push({
          text: m[0],
          start: m.index,
          end: m.index + m[0].length,
          groups: (m.groups as Record<string, string>) || {}
        });
        if (m.index === reg.lastIndex) reg.lastIndex++;
      }
      return { matches: res, error: null };
    } catch (e: any) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flagStr, testText]);

  const replacedText = useMemo(() => {
    try {
      let normalized = pattern;
      if (normalized.includes("\\\\")) {
        normalized = normalized.replace(/\\\\/g, "\\");
      }
      const reg = new RegExp(normalized, flagStr);
      // Java replaceAll uses ${name} or $1
      let rep = replacement.replace(/\$\{([a-zA-Z0-9_]+)\}/g, "$<$1>");
      return testText.replace(reg, rep);
    } catch {
      return testText;
    }
  }, [pattern, flagStr, testText, replacement]);

  // Java string escaped pattern
  const javaEscapedPattern = useMemo(() => {
    return pattern.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }, [pattern]);

  const javaSnippet = useMemo(() => {
    const flagList: string[] = [];
    if (flags.i) flagList.push("Pattern.CASE_INSENSITIVE");
    if (flags.m) flagList.push("Pattern.MULTILINE");
    if (flags.s) flagList.push("Pattern.DOTALL");
    const flagArg = flagList.length > 0 ? `, ${flagList.join(" | ")}` : "";

    return `import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexExample {
    public static void main(String[] args) {
        String input = "${testText.replace(/"/g, '\\"')}";
        Pattern pattern = Pattern.compile("${javaEscapedPattern}"${flagArg});
        Matcher matcher = pattern.matcher(input);

        while (matcher.find()) {
            System.out.println("Match: " + matcher.group());
            System.out.println("Span: [" + matcher.start() + ", " + matcher.end() + "]");
        }

        String replaced = matcher.replaceAll("${replacement.replace(/"/g, '\\"')}");
        System.out.println("Result: " + replaced);
    }
}`;
  }, [javaEscapedPattern, flags, testText, replacement]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link
            href="/tools"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All DevOps Tools</span>
          </Link>
        </div>

        {/* Hero */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> java.util.regex Studio
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                Java <span className="text-gradient-orange">Regex Tester</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Test regular expressions for Java&apos;s <code className="text-orange-300 font-mono">Pattern</code> and <code className="text-orange-300 font-mono">Matcher</code> classes. Automatically doubles backslashes for Java string literals and previews <code className="text-orange-300 font-mono">matcher.replaceAll()</code>.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/tools/regex-tester"
                className="px-3 py-1.5 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-medium text-gray-300 transition-all"
              >
                General Tester
              </Link>
              <Link
                href="/tools/python-regex-tester"
                className="px-3 py-1.5 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-medium text-gray-300 transition-all"
              >
                Python Tester
              </Link>
            </div>
          </div>
        </div>

        {/* Pattern & Flags */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 flex items-center bg-[#0a0b12] border border-white/10 rounded-xl px-3.5 py-2 font-mono text-xs sm:text-sm">
              <span className="text-orange-400 select-none mr-2 font-bold">&quot;</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="w-full bg-transparent text-orange-300 outline-none"
              />
              <span className="text-orange-400 select-none ml-2 font-bold">&quot;</span>
            </div>

            <div className="flex items-center gap-2 bg-[#0a0b12] p-1.5 rounded-xl border border-white/10 shrink-0">
              <button
                onClick={() => setFlags((prev) => ({ ...prev, i: !prev.i }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  flags.i ? "bg-gradient-orange text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                CASE_INSENSITIVE
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, m: !prev.m }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  flags.m ? "bg-gradient-orange text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                MULTILINE
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, s: !prev.s }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  flags.s ? "bg-gradient-orange text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                DOTALL
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              Syntax Error: {error}
            </div>
          )}
        </div>

        {/* Test Text */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-2">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            Test Input Text
          </label>
          <textarea
            rows={4}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full bg-[#0a0b12] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm font-mono text-gray-200 focus:border-orange-500 outline-none transition-all"
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Matcher Results ({matches.length})</span>
              <span className="text-xs text-gray-400 font-mono">matcher.find()</span>
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {matches.length === 0 ? (
                <p className="text-gray-400 text-xs italic">No matches found.</p>
              ) : (
                matches.map((m, idx) => (
                  <div key={idx} className="bg-[#0a0b12] border border-white/5 rounded-xl p-3 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 font-bold select-all">{m.text}</span>
                      <span className="text-gray-500 text-[10px]">[{m.start}, {m.end}]</span>
                    </div>
                    {Object.keys(m.groups).length > 0 && (
                      <div className="pt-1 border-t border-white/5 space-y-0.5">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">matcher.group(name):</span>
                        {Object.entries(m.groups).map(([k, v]) => (
                          <div key={k} className="flex justify-between text-[11px]">
                            <span className="text-orange-400">{k}:</span>
                            <span className="text-cyan-300 select-all font-semibold">&quot;{v}&quot;</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">matcher.replaceAll() Preview</h2>
              <span className="text-xs text-gray-400 font-mono">${"{name}"}</span>
            </div>
            <input
              type="text"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="Endpoint: ${ip}:${port}"
              className="w-full bg-[#0a0b12] border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-orange-300 outline-none"
            />
            <pre className="bg-[#080910] border border-white/5 rounded-xl p-3 text-xs font-mono text-gray-300 whitespace-pre-wrap max-h-44 overflow-y-auto select-all">
              {replacedText}
            </pre>
          </div>
        </div>

        {/* Java Snippet */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-orange-400" />
              Java Code Generator
            </h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(javaSnippet);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 bg-[#181a28] px-3 py-1.5 rounded-lg border border-white/10"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Java Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="bg-[#080910] border border-white/5 rounded-xl p-4 text-xs font-mono text-gray-200 overflow-x-auto select-all">
            {javaSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
