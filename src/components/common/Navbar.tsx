"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Search, Menu, X, ChevronDown, Sparkles, BookOpen, Wrench, AlertCircle, Compass, Award } from "lucide-react";
import CommandPalette from "./CommandPalette";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: "Playgrounds", href: "/playground", icon: Terminal, badge: "Interactive" },
    { label: "Tutorials", href: "/tutorials", icon: BookOpen },
    { label: "Tools", href: "/tools", icon: Wrench },
    { label: "Troubleshooting", href: "/troubleshooting", icon: AlertCircle },
    { label: "Roadmaps", href: "/roadmaps", icon: Compass },
    { label: "Interviews", href: "/interview-questions", icon: Sparkles },
    { label: "Certifications", href: "/certifications", icon: Award },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f172a]/85 border-b border-orange-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-orange flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1.5 leading-none">
                <span className="text-white">Learn</span>
                <span className="text-gradient-orange">DevOps</span>
              </span>
              <span className="text-[10px] text-orange-400/90 font-mono tracking-wider uppercase mt-0.5">
                Hands-On Labs
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-orange-500/15 transition-all flex items-center gap-1.5"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#141724] border border-orange-500/20 text-gray-400 hover:text-white hover:border-orange-500/40 text-xs transition-all shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-[#1d2133] text-gray-400 font-mono border border-white/10">
                Ctrl K
              </kbd>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/chairielazizi/learn-devops-website"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#141724] border border-white/10 text-gray-300 hover:text-orange-400 hover:border-orange-500/30 transition-all hidden sm:flex items-center"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#141724] text-gray-300 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-[#0c0e17] border-b border-orange-500/20 space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-gray-200 hover:bg-orange-500/10 hover:text-orange-300 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-orange-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-orange-500/20 text-orange-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
