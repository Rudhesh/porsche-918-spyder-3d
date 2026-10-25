"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-30 w-full px-6 md:px-16 py-8 border-t border-white/5 bg-black flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-neutral-500">
      <div className="flex items-center gap-4">
        <span>© 2026 DR. ING. H.C. F. PORSCHE AG</span>
        <span className="hidden sm:inline text-neutral-700">·</span>
        <span className="hidden sm:inline">LEGAL NOTICE</span>
        <span className="hidden sm:inline text-neutral-700">·</span>
        <span className="hidden sm:inline">PRIVACY POLICY</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-neutral-400">918 SPYDER ASPHALT EDITION</span>
        <span className="text-[10px] font-mono text-sky-400/80 bg-sky-950/40 border border-sky-800/30 px-2 py-0.5 rounded">
          3D INTERACTIVE
        </span>
      </div>
    </footer>
  );
}
