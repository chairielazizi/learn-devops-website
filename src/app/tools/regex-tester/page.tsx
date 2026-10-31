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
  FileCode,
  Zap,
  Info
} from "lucide-react";

interface PresetPattern {
  name: string;
  category: "Network" | "DevOps" | "Contact" | "Code";
  pattern: string;
  flags: string;
  sample: string;
  description: string;
}

const PRESETS: PresetPattern[] = [
  {
    name: "IPv4 Address",
    category: "Network",
    pattern: "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
    flags: "g",
    sample: "Connecting to server 192.168.1.104 and gateway 10.0.0.1 on port 443.",
    description: "Matches valid IPv4 addresses between 0.0.0.0 and 255.255.255.255."
  },
  {
    name: "Docker Image Tag",
    category: "DevOps",
    pattern: "([a-z0-9_.-]+(?:/[a-z0-9_.-]+)*):([a-z0-9_.-]+)",
    flags: "g",
    sample: "docker pull alpine:3.18\ndocker pull registry.k8s.io/kube-apiserver:v1.28.2\ndocker push myrepo/web-app:latest",
    description: "Extracts image repository and tag into capture groups."
  },
  {
    name: "Semantic Versioning (SemVer)",
    category: "DevOps",
    pattern: "v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?",
    flags: "g",
    sample: "Releasing v1.2.3 and pre-release 2.0.0-rc.1 across microservices.",
    description: "Official SemVer 2.0 regex with Major, Minor, Patch, and Pre-release groups."
  },
  {
    name: "ISO 8601 Timestamp",
    category: "DevOps",
    pattern: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:\\d{2})",
    flags: "g",
    sample: "2026-10-31T19:55:32.412Z [INFO] Service started.\n2026-10-31T20:00:00+08:00 [WARN] High memory usage.",
    description: "Parses standard RFC 3339 / ISO 8601 application log timestamps."
  },
  {
    name: "Email Address",
    category: "Contact",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "gi",
    sample: "Contact ops@devopslesson.com or dev.lead@company.co.uk for inquiries.",
    description: "Standard email address validation pattern."
  },
  {
    name: "UUID v4",
    category: "Code",
    pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}",
    flags: "g",
    sample: "Request ID: 123e4567-e89b-42d3-a456-426614174000 processed.",
    description: "Standard RFC 4122 Version 4 UUID format."
  }
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("([a-z0-9_.-]+(?:/[a-z0-9_.-]+)*):([a-z0-9_.-]+)");
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true,
    i: false,
    m: false,
    s: false
  });
  const [testText, setTestText] = useState(
    "docker pull alpine:3.18\ndocker pull registry.k8s.io/kube-apiserver:v1.28.2\ndocker push myrepo/web-app:latest"
  );
  const [replacement, setReplacement] = useState("Image: $1 (Version $2)");
  const [activeTab, setActiveTab] = useState<"matches" | "groups" | "replace" | "snippet" | "cheatsheet">("matches");
  const [copied, setCopied] = useState<string | null>(null);

  const flagString = useMemo(() => {
    let f = "";
    if (flags.g) f += "g";
    if (flags.i) f += "i";
    if (flags.m) f += "m";
    if (flags.s) f += "s";
    return f;
  }, [flags]);

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const reg = new RegExp(pattern, flagString);
      const results: { text: string; index: number; groups: string[] }[] = [];
      if (flags.g) {
        let match;
        let guard = 0;
        while ((match = reg.exec(testText)) !== null && guard < 500) {
          guard++;
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (match.index === reg.lastIndex) reg.lastIndex++;
        }
      } else {
        const m = reg.exec(testText);
        if (m) {
          results.push({
            text: m[0],
            index: m.index,
            groups: m.slice(1)
          });
        }
      }
      return { matches: results, error: null };
    } catch (err: any) {
      return { matches: [], error: err.message };
    }
  }, [pattern, flagString, testText, flags.g]);

  const replacedText = useMemo(() => {
    if (!pattern || error) return testText;
    try {
      const reg = new RegExp(pattern, flagString);
      return testText.replace(reg, replacement);
    } catch {
      return testText;
    }
  }, [pattern, flagString, testText, replacement, error]);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadPreset = (p: PresetPattern) => {
    setPattern(p.pattern);
    setTestText(p.sample);
    setFlags({
      g: p.flags.includes("g"),
      i: p.flags.includes("i"),
      m: p.flags.includes("m"),
      s: p.flags.includes("s")
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/tools"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All DevOps Tools</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Regex Studio
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                Regex Tester &amp; <span className="text-gradient-orange">Pattern Builder</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Test regular expressions with live match highlighting, capture group extraction, replace preview, and instant multi-language code generators (JS, Python, Go, Java, PHP).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/tools/python-regex-tester"
                className="px-3 py-1.5 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-medium text-gray-300 transition-all"
              >
                Python Flavor
              </Link>
              <Link
                href="/tools/java-regex-tester"
                className="px-3 py-1.5 rounded-xl bg-[#161826] hover:bg-[#1e2133] border border-white/10 text-xs font-medium text-gray-300 transition-all"
              >
                Java Flavor
              </Link>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <span className="text-xs text-gray-400 font-medium block mb-2">Common DevOps Presets:</span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => loadPreset(p)}
                  className="px-3 py-1 rounded-lg text-xs bg-[#0b0c13] hover:bg-[#181a28] border border-white/10 hover:border-orange-500/40 text-gray-300 hover:text-white transition-all font-mono"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pattern & Flags Input */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 flex items-center bg-[#0a0b12] border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-orange-500 transition-all font-mono text-sm">
              <span className="text-gray-500 select-none mr-2 font-bold text-base">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern (e.g. ([a-z]+):(\d+))..."
                className="w-full bg-transparent text-orange-300 outline-none"
              />
              <span className="text-gray-500 select-none ml-2 font-bold text-base">/{flagString}</span>
            </div>

            {/* Flag Toggles */}
            <div className="flex items-center gap-1.5 bg-[#0a0b12] p-1 rounded-xl border border-white/10 shrink-0">
              {(["g", "i", "m", "s"] as const).map((flag) => {
                const isActive = flags[flag];
                const labels: Record<string, string> = {
                  g: "Global (g)",
                  i: "Case-insensitive (i)",
                  m: "Multiline (m)",
                  s: "DotAll (s)"
                };
                return (
                  <button
                    key={flag}
                    onClick={() => setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }))}
                    title={labels[flag]}
                    className={`w-9 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                      isActive
                        ? "bg-gradient-orange text-white shadow-md shadow-orange-500/20"
                        : "text-gray-400 hover:text-white hover:bg-[#181a28]"
                    }`}
                  >
                    {flag}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              Syntax Error: {error}
            </div>
          )}
        </div>

        {/* Test String Input */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-5 shadow-xl space-y-2">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
            Test String
          </label>
          <textarea
            rows={4}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Paste logs, IP addresses, configuration files or strings to test..."
            className="w-full bg-[#0a0b12] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm font-mono text-gray-200 focus:border-orange-500 outline-none transition-all"
          />
        </div>

        {/* Tabbed Results Panel */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex border-b border-white/10 bg-[#0e1018] px-4 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("matches")}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "matches"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <span>Matches ({matches.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "groups"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <span>Capture Groups</span>
            </button>
            <button
              onClick={() => setActiveTab("replace")}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "replace"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <span>Replace Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("snippet")}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "snippet"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code Snippets</span>
            </button>
            <button
              onClick={() => setActiveTab("cheatsheet")}
              className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "cheatsheet"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quick Tokens</span>
            </button>
          </div>

          <div className="p-6">
            {activeTab === "matches" && (
              <div className="space-y-4">
                {matches.length === 0 ? (
                  <p className="text-gray-400 text-sm italic py-4">No matches found in test string.</p>
                ) : (
                  <div className="space-y-2.5">
                    {matches.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0a0b12] border border-white/5 rounded-xl p-3 flex items-start justify-between gap-3 font-mono text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-300 font-bold">
                              #{idx + 1}
                            </span>
                            <span className="text-gray-400 text-[11px]">
                              Index: {m.index}..{m.index + m.text.length} ({m.text.length} chars)
                            </span>
                          </div>
                          <div className="text-emerald-400 font-bold bg-[#141624] px-2.5 py-1.5 rounded-lg border border-emerald-500/20 select-all">
                            {m.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "groups" && (
              <div className="space-y-4">
                {matches.length === 0 ? (
                  <p className="text-gray-400 text-sm italic py-4">No matches or groups detected.</p>
                ) : (
                  <div className="space-y-3">
                    {matches.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0a0b12] border border-white/5 rounded-xl p-4 font-mono text-xs space-y-2"
                      >
                        <div className="text-orange-400 font-bold">Match #{idx + 1}: &quot;{m.text}&quot;</div>
                        {m.groups.length === 0 ? (
                          <span className="text-gray-500 text-xs">No capture groups in pattern.</span>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {m.groups.map((g, gIdx) => (
                              <div
                                key={gIdx}
                                className="bg-[#121422] p-2 rounded-lg border border-white/5 flex items-center justify-between"
                              >
                                <span className="text-gray-400 text-[11px] font-bold">
                                  Group ${gIdx + 1}:
                                </span>
                                <span className="text-cyan-300 select-all font-semibold">{g || "null"}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "replace" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Replacement Pattern ($1, $2, &amp;)
                  </label>
                  <input
                    type="text"
                    value={replacement}
                    onChange={(e) => setReplacement(e.target.value)}
                    placeholder="e.g. Transformed: $1"
                    className="w-full bg-[#0a0b12] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-orange-300 focus:border-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Result Preview
                  </label>
                  <pre className="bg-[#080910] border border-orange-500/20 rounded-xl p-4 text-xs font-mono text-gray-200 whitespace-pre-wrap select-all">
                    {replacedText}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "snippet" && (
              <div className="space-y-4">
                {[
                  {
                    lang: "JavaScript",
                    code: `const pattern = /${pattern}/${flagString};\nconst text = \`${testText}\`;\n\nconst matches = [...text.matchAll(pattern)];\nfor (const match of matches) {\n  console.log('Match:', match[0], 'Groups:', match.slice(1));\n}`
                  },
                  {
                    lang: "Python",
                    code: `import re\n\npattern = re.compile(r"${pattern}"${flags.i ? ", re.IGNORECASE" : ""}${flags.m ? " | re.MULTILINE" : ""}${flags.s ? " | re.DOTALL" : ""})\ntext = """${testText}"""\n\nfor match in pattern.finditer(text):\n    print("Match:", match.group(0), "Groups:", match.groups())`
                  },
                  {
                    lang: "Go",
                    code: `package main\n\nimport (\n\t"fmt"\n\t"regexp"\n)\n\nfunc main() {\n\tre := regexp.MustCompile(\`${pattern}\`)\n\ttext := \`${testText}\`\n\tmatches := re.FindAllStringSubmatch(text, -1)\n\tfor _, match := range matches {\n\t\tfmt.Println("Match:", match[0], "Groups:", match[1:])\n\t}\n}`
                  }
                ].map((snip) => (
                  <div key={snip.lang} className="bg-[#0a0b12] border border-white/5 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-400">{snip.lang}</span>
                      <button
                        onClick={() => copySnippet(snip.code, snip.lang)}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-[#181a28] px-2.5 py-1 rounded-lg border border-white/10"
                      >
                        {copied === snip.lang ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[11px]">Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-gray-300 overflow-x-auto p-2 bg-[#080910] rounded-lg">
                      {snip.code}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "cheatsheet" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
                {[
                  { token: "\\d", desc: "Any digit [0-9]" },
                  { token: "\\D", desc: "Any non-digit [^0-9]" },
                  { token: "\\w", desc: "Word character [a-zA-Z0-9_]" },
                  { token: "\\W", desc: "Non-word character" },
                  { token: "\\s", desc: "Whitespace (space, tab, newline)" },
                  { token: "\\b", desc: "Word boundary" },
                  { token: "^", desc: "Start of string / line" },
                  { token: "$", desc: "End of string / line" },
                  { token: "+", desc: "1 or more times (greedy)" },
                  { token: "*", desc: "0 or more times (greedy)" },
                  { token: "?", desc: "0 or 1 time (lazy/optional)" },
                  { token: "{n,m}", desc: "Between n and m times" },
                  { token: "(abc)", desc: "Capture group" },
                  { token: "(?:abc)", desc: "Non-capturing group" },
                  { token: "[abc]", desc: "Character set (a or b or c)" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#0a0b12] border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
                    <code className="text-orange-400 font-bold bg-[#141624] px-1.5 py-0.5 rounded">
                      {item.token}
                    </code>
                    <span className="text-gray-400 text-[11px] font-sans">{item.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-[#11131c] border border-orange-500/20 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-orange-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-gray-300">
            <div>
              <h3 className="font-semibold text-white">What regex flavor does this tester use?</h3>
              <p className="text-gray-400 mt-0.5">
                JavaScript (ECMAScript), running client-side inside your browser sandbox. For Python-specific named groups (`(?P&lt;name&gt;...)`) or Java syntax, switch to the dedicated Python or Java regex tools above.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Is my test data uploaded to any server?</h3>
              <p className="text-gray-400 mt-0.5">
                No. All regex evaluation and substitutions happen 100% in your local browser memory. No private log entries, IPs, or credentials leave your machine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

