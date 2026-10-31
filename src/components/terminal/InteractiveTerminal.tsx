"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Copy, Trash2, RotateCcw, Check, Play, Sparkles } from "lucide-react";
import { CommandResult } from "@/lib/playgrounds/dockerEngine";

export interface TerminalProps {
  title: string;
  subtitle?: string;
  promptSymbol?: string;
  onExecute: (cmd: string) => CommandResult;
  onReset: () => void;
  quickCommands?: string[];
  initialLines?: string[];
}

export default function InteractiveTerminal({
  title,
  subtitle = "Interactive Simulated DevOps Shell",
  promptSymbol = "devops@cloud-box:~$",
  onExecute,
  onReset,
  quickCommands = [],
  initialLines = ["DevOps Interactive Shell v2.4 (Simulated In-Browser Environment)", "Type 'help' to see available commands."],
}: TerminalProps) {
  const [history, setHistory] = useState<string[]>(initialLines);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const result = onExecute(trimmed);

    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        `${promptSymbol} ${trimmed}`,
        ...result.lines,
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const runQuick = (cmd: string) => {
    setCmdHistory((prev) => [...prev, cmd]);
    const result = onExecute(cmd);
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, `${promptSymbol} ${cmd}`, ...result.lines]);
    }
    inputRef.current?.focus();
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(history.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetClick = () => {
    onReset();
    setHistory([
      "Environment state reset successfully.",
      "Type 'help' to see available commands.",
    ]);
    setCmdHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-orange-500/20 bg-[#0d0f18] shadow-2xl shadow-orange-950/20">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#131622] border-b border-orange-500/10">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          </div>
          <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
            <TerminalIcon className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-gray-200">{title}</span>
            <span className="text-[11px] text-gray-400 hidden sm:inline">({subtitle})</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={copyOutput}
            title="Copy Terminal Logs"
            className="p-1.5 rounded-lg text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all text-xs flex items-center space-x-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="p-1.5 rounded-lg text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetClick}
            title="Reset Environment State"
            className="p-1.5 rounded-lg text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all text-xs flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Commands Bar */}
      {quickCommands.length > 0 && (
        <div className="px-4 py-2 bg-[#10121d] border-b border-orange-500/10 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-orange-400 font-medium flex items-center gap-1 text-[11px] uppercase tracking-wider shrink-0">
            <Sparkles className="w-3 h-3" /> Quick Run:
          </span>
          <div className="flex items-center space-x-1.5">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => runQuick(cmd)}
                className="px-2.5 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-200 border border-orange-500/20 hover:border-orange-500/40 font-mono text-[11px] transition-all flex items-center gap-1 shrink-0"
              >
                <Play className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Output */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-4 font-mono text-sm leading-relaxed overflow-y-auto h-[380px] sm:h-[440px] text-gray-300 select-text cursor-text"
      >
        {history.map((line, idx) => {
          const isCommand = line.startsWith(promptSymbol);
          const isError = line.toLowerCase().includes("error") || line.toLowerCase().includes("failed");
          return (
            <div
              key={idx}
              className={`whitespace-pre-wrap break-all ${
                isCommand
                  ? "text-orange-300 font-semibold mt-1.5 mb-0.5"
                  : isError
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              {line}
            </div>
          );
        })}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2 group">
          <span className="text-orange-400 font-bold mr-2 select-none shrink-0">{promptSymbol}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm focus:ring-0 p-0 m-0 caret-orange-500"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            placeholder="Type a command (e.g. help, docker ps)..."
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

