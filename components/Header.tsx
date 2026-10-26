"use client";
import React from "react";
import MusicStreamLine from "./MusicStreamLine";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-between items-center w-full px-6 md:px-16 py-6 md:py-8 backdrop-blur-md bg-black/20 border-b border-white/[0.06]">
      {/* Brand logo & name */}
      <a href="#hero" className="flex items-center gap-3 group">
        <img
          src="/icons/porsche.svg"
          alt="Porsche Crest"
          className="w-7 h-9 object-contain drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-105"
        />
        <div className="flex items-center gap-2.5">
          <span className="text-xl md:text-2xl font-black tracking-[0.25em] text-white uppercase font-sans">
            PORSCHE
          </span>
          <span className="text-[10px] tracking-widest text-sky-400 font-mono px-2 py-0.5 rounded border border-sky-500/30 bg-sky-950/30">
            918 SPYDER
          </span>
        </div>
      </a>

      {/* Nav items */}
      <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">
        <a href="#hero" className="hover:text-white transition-colors">Overview</a>
        <a href="#specs" className="hover:text-white transition-colors">Engineering</a>
        <a href="#video-section" className="hover:text-white transition-colors">Film</a>
      </nav>

      {/* Sound toggle & CTA */}
      <div className="flex items-center gap-5">
        <MusicStreamLine color="bg-white" />
        <a
          href="#video-section"
          className="hidden sm:inline-flex text-[11px] tracking-widest uppercase font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition-all backdrop-blur-sm"
        >
          Experience
        </a>
      </div>
    </header>
  );
}
