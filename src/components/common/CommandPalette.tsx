"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Terminal, BookOpen, Wrench, AlertCircle, Compass, X } from "lucide-react";
import { TUTORIAL_TRACKS } from "@/data/tutorialsData";
import { TOOLS_LIST } from "@/data/toolsData";
import { TROUBLESHOOTING_GUIDES } from "@/data/troubleshootingData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open in parent
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search aggregations
  const results: { title: string; category: string; href: string; icon: any }[] = [];

  // Playgrounds
  [
    { title: "Docker Playground & Lab", href: "/playground/docker", category: "Playgrounds" },
    { title: "Kubernetes Cluster Simulator", href: "/playground/kubernetes", category: "Playgrounds" },
    { title: "CKA Exam Simulator", href: "/playground/kubernetes/cka", category: "Playgrounds" },
    { title: "Linux & Bash Sandbox", href: "/playground/linux", category: "Playgrounds" },
    { title: "Terraform IaC Sandbox", href: "/playground/terraform", category: "Playgrounds" },
  ].forEach((p) => {
    if (!query || p.title.toLowerCase().includes(query.toLowerCase())) {
      results.push({ ...p, icon: Terminal });
    }
  });

  // Tools
  TOOLS_LIST.forEach((t) => {
    if (!query || t.name.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title: t.name, href: `/tools/${t.slug}`, category: "Tools", icon: Wrench });
    }
  });

  // Tracks
  TUTORIAL_TRACKS.forEach((tr) => {
    if (!query || tr.title.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title: tr.title, href: `/tutorials/${tr.slug}`, category: "Tutorials", icon: BookOpen });
    }
  });

  // Troubleshooting
  TROUBLESHOOTING_GUIDES.forEach((tg) => {
    if (!query || tg.title.toLowerCase().includes(query.toLowerCase()) || tg.errorSnippet.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title: tg.title, href: `/troubleshooting`, category: "Troubleshooting", icon: AlertCircle });
    }
  });

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#11131c] border border-orange-500/30 rounded-2xl w-full max-w-xl shadow-2xl shadow-orange-950/40 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-orange-500/10">
          <Search className="w-5 h-5 text-orange-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, tool, playground, or error..."
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {results.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No matching resources found for &quot;{query}&quot;.
            </div>
          ) : (
            results.slice(0, 10).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  className="p-3 rounded-xl flex items-center justify-between hover:bg-[#181b29] hover:border-orange-500/20 cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-gradient-orange group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-orange-400/80 font-mono">Jump →</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0a0b12] border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

