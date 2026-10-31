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
  Layers, 
  HelpCircle,
  Info
} from "lucide-react";

export default function PythonRegexTesterPage() {
  const [pattern, setPattern] = useState("(?P<level>[A-Z]+):\\s+(?P<message>.*)");
  const [flags, setFlags] = useState<{ i: boolean; m: boolean; s: boolean }>({
    i: false,
    m: true,
    s: false,
  });
  const [testText, setTestText] = useState(
    "INFO: Database connection established\nWARN: Disk utilization exceeds 85%\nERROR: Connection refused on port 5432"
  );
  const [replacement, setReplacement] = useState("[\\g<level>] -> \\g<message>");
  const [copied, setCopied] = useState(false);

  // Translate Python named groups to standard JS regex named groups (?<name>...)
  const { jsPattern, jsReplacement, error } = useMemo(() => {
    try {
      let p = pattern;
      // Convert (?P<name>...) -> (?<name>...)
      p = p.replace(/\(\?P<([a-zA-Z0-9_]+)>/g, "(?<$1>");
      // Convert (?P=name) -> \k<name>
      p = p.replace(/\(\?P=([a-zA-Z0-9_]+)\)/g, "\\k<$1>");
      // Convert \A -> ^ and \Z -> $
      p = p.replace(/\\A/g, "^").replace(/\\Z/g, "$");

      let r = replacement;
      // Convert \g<name> -> $<name>
      r = r.replace(/\\g<([a-zA-Z0-9_]+)>/g, "$<$1>");
      // Convert \g<1> -> $1
      r = r.replace(/\\g<([0-9]+)>/g, "$$$1");
      // Convert \1 -> $1
      r = r.replace(/\\([0-9]+)/g, "$$$1");

      return { jsPattern: p, jsReplacement: r, error: null };
    } catch (e: any) {
      return { jsPattern: pattern, jsReplacement: replacement, error: e.message };
    }
  }, [pattern, replacement]);

  const flagStr = useMemo(() => {
    let f = "g";
    if (flags.i) f += "i";
    if (flags.m) f += "m";
    if (flags.s) f += "s";
    return f;
  }, [flags]);

  const matches = useMemo(() => {
    if (!jsPattern || error) return [];
    try {
      const reg = new RegExp(jsPattern, flagStr);
      const res: { text: string; index: number; groupdict: Record<string, string> }[] = [];
      let m;
      let guard = 0;
      while ((m = reg.exec(testText)) !== null && guard < 500) {
        guard++;
        res.push({
          text: m[0],
          index: m.index,
          groupdict: (m.groups as Record<string, string>) || {}
        });
        if (m.index === reg.lastIndex) reg.lastIndex++;
      }
      return res;
    } catch {
      return [];
    }
  }, [jsPattern, flagStr, testText, error]);

  const replacedText = useMemo(() => {
    if (!jsPattern || error) return testText;
    try {
      const reg = new RegExp(jsPattern, flagStr);
      return testText.replace(reg, jsReplacement);
    } catch {
      return testText;
    }
  }, [jsPattern, flagStr, testText, jsReplacement, error]);

  const pythonSnippet = useMemo(() => {
    const flagList: string[] = [];
    if (flags.i) flagList.push("re.IGNORECASE");
    if (flags.m) flagList.push("re.MULTILINE");
    if (flags.s) flagList.push("re.DOTALL");
    const flagArg = flagList.length > 0 ? `, ${flagList.join(" | ")}` : "";

    return `import re

# Compile Python regex with flags
pattern = re.compile(r"${pattern}"${flagArg})
text = """${testText}"""

# Iterate through matches and extract groupdict
for match in pattern.finditer(text):
    print("Match:", match.group(0))
    print("Groups dict:", match.groupdict())

# Substitution using re.sub
result = pattern.sub(r"${replacement}", text)
print("Substituted:", result)`;
  }, [pattern, flags, testText, replacement]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
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
                <Sparkles className="w-3.5 h-3.5" /> Python re Module Studio
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                Python <span className="text-gradient-orange">Regex Tester</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Test regular expressions written for Python&apos;s standard <code className="text-orange-300 font-mono">re</code> module, featuring named capture groups <code className="text-orange-300 font-mono">(?P&lt;name&gt;...)</code>, backreferences, and copy-ready Python code.
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
                href="/tools/java-regex-tester"
                className="px-3 py-1.5 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-medium text-gray-300 transition-all"
              >
                Java Tester
              </Link>
            </div>
          </div>
        </div>

        {/* Pattern & Flags */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 flex items-center bg-[#0a0b12] border border-white/10 rounded-xl px-3.5 py-2 font-mono text-xs sm:text-sm">
              <span className="text-orange-400 select-none mr-2 font-bold">r&quot;</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="r'(?P<key>[a-z]+)=(?P<val>.*)'"
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
                re.I
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, m: !prev.m }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  flags.m ? "bg-gradient-orange text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                re.M
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, s: !prev.s }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  flags.s ? "bg-gradient-orange text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                re.S
              </button>
            </div>
          </div>
        </div>

        {/* Test Text */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-2">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            Test String (Input Text)
          </label>
          <textarea
            rows={4}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full bg-[#0a0b12] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm font-mono text-gray-200 focus:border-orange-500 outline-none transition-all"
          />
        </div>

        {/* Matches & Groupdict Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Matches ({matches.length})</span>
              <span className="text-xs text-gray-400 font-mono">re.finditer</span>
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {matches.length === 0 ? (
                <p className="text-gray-400 text-xs italic">No matches found.</p>
              ) : (
                matches.map((m, idx) => (
                  <div key={idx} className="bg-[#0a0b12] border border-white/5 rounded-xl p-3 text-xs font-mono space-y-1.5">
                    <div className="text-emerald-400 font-bold select-all">{m.text}</div>
                    {Object.keys(m.groupdict).length > 0 && (
                      <div className="pt-1 border-t border-white/5 space-y-0.5">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">groupdict():</span>
                        {Object.entries(m.groupdict).map(([k, v]) => (
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

          {/* re.sub Replacement */}
          <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">re.sub() Preview</h2>
              <span className="text-xs text-gray-400 font-mono">\g&lt;name&gt;</span>
            </div>
            <input
              type="text"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="[\g<level>] -> \g<message>"
              className="w-full bg-[#0a0b12] border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-orange-300 outline-none"
            />
            <pre className="bg-[#080910] border border-white/5 rounded-xl p-3 text-xs font-mono text-gray-300 whitespace-pre-wrap max-h-44 overflow-y-auto select-all">
              {replacedText}
            </pre>
          </div>
        </div>

        {/* Python Snippet */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-orange-400" />
              Python Code Generator
            </h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(pythonSnippet);
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
                  <span>Copy Python Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="bg-[#080910] border border-white/5 rounded-xl p-4 text-xs font-mono text-gray-200 overflow-x-auto select-all">
            {pythonSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
