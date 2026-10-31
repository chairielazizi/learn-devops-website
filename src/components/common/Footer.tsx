import React from "react";
import Link from "next/link";
import { Terminal, Heart, Shield, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07080c] border-t border-orange-500/15 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight flex items-center gap-1.5">
              <span className="text-white">Learn</span>
              <span className="text-gradient-orange">DevOps</span>
            </span>
          </Link>
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
            Master Docker, Kubernetes, Terraform, CI/CD, AWS, and Linux with hands-on, zero-install interactive browser playgrounds and production-ready incident guides.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-400 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Client-Side In-Memory Engine · 0ms Latency</span>
          </div>
        </div>

        {/* Playgrounds */}
        <div className="space-y-2.5">
          <div className="font-bold uppercase tracking-wider text-[11px] text-white">Playgrounds</div>
          <ul className="space-y-1.5">
            <li><Link href="/playground/docker" className="hover:text-orange-400 transition-colors">Docker Sandbox</Link></li>
            <li><Link href="/playground/kubernetes" className="hover:text-orange-400 transition-colors">Kubernetes Simulator</Link></li>
            <li><Link href="/playground/kubernetes/cka" className="hover:text-orange-400 transition-colors">CKA Exam Mode</Link></li>
            <li><Link href="/playground/linux" className="hover:text-orange-400 transition-colors">Linux & Bash Shell</Link></li>
            <li><Link href="/playground/terraform" className="hover:text-orange-400 transition-colors">Terraform IaC</Link></li>
          </ul>
        </div>

        {/* Learning */}
        <div className="space-y-2.5">
          <div className="font-bold uppercase tracking-wider text-[11px] text-white">Curriculum</div>
          <ul className="space-y-1.5">
            <li><Link href="/tutorials" className="hover:text-orange-400 transition-colors">All 260+ Tutorials</Link></li>
            <li><Link href="/tutorials/docker" className="hover:text-orange-400 transition-colors">Docker Course</Link></li>
            <li><Link href="/tutorials/kubernetes" className="hover:text-orange-400 transition-colors">Kubernetes Course</Link></li>
            <li><Link href="/tutorials/terraform" className="hover:text-orange-400 transition-colors">Terraform IaC</Link></li>
            <li><Link href="/roadmaps" className="hover:text-orange-400 transition-colors">Career Roadmaps</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-2.5">
          <div className="font-bold uppercase tracking-wider text-[11px] text-white">Resources</div>
          <ul className="space-y-1.5">
            <li><Link href="/troubleshooting" className="hover:text-orange-400 transition-colors">Troubleshooting Matrix</Link></li>
            <li><Link href="/tools" className="hover:text-orange-400 transition-colors">Linters & Generators</Link></li>
            <li><Link href="/interview-questions" className="hover:text-orange-400 transition-colors">Interview Questions</Link></li>
            <li><Link href="/certifications" className="hover:text-orange-400 transition-colors">Certifications (CKA)</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
        <div>
          © 2026 DevOpsLesson. Built with Dark Orange Gradient Theme. Free and open source.
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/chairielazizi/learn-devops-website" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
