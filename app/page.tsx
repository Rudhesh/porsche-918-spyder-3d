"use client";
import React from "react";
import Scene from "@/components/Scene";
import CarVideoSection from "@/components/CarVideoSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-sky-500 selection:text-white">
      {/* 3D Scene View Tunnel (Fixed background) */}
      <Scene />

      {/* Scroll Track container for GSAP ScrollTrigger animations */}
      <div id="scroll-track" className="relative z-10">

        {/* ─── SECTION 1: HERO VIEW (100vh) ─── */}
        <section
          id="hero"
          className="relative h-screen w-full flex flex-col justify-between px-4 sm:px-6 md:px-16 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 pointer-events-none"
        >
          {/* Top Left Title Block — text scales fluidly across breakpoints */}
          <div className="max-w-2xl pointer-events-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] font-mono text-emerald-400 uppercase">
                Ready for Launch · Hybrid Supercar
              </span>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans leading-[0.88]">
              PORSCHE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-neutral-400">
                918 SPYDER
              </span>
            </h1>

            {/* Description hidden on very small phones to avoid crowding the car */}
            <p className="hidden sm:block mt-4 md:mt-6 text-sm md:text-base text-neutral-400 max-w-lg font-light tracking-wide leading-relaxed">
              Asphalt Edition. Precision-engineered carbon monocoque with dual-motor hybrid all-wheel drive. 887 horsepower at your command.
            </p>
          </div>

          {/* Bottom Bar: Specs + Scroll prompt */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 pointer-events-auto">
            {/* Quick Specs Pills — always 3 cols, compact on mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 bg-black/50 sm:bg-black/40 backdrop-blur-md border border-white/10 p-2.5 sm:p-3 md:p-4 rounded-xl w-full sm:w-auto">
              <div>
                <span className="block text-base sm:text-xl md:text-2xl font-black font-mono text-white">887 PS</span>
                <span className="block text-[9px] sm:text-[10px] tracking-widest text-neutral-400 uppercase">Hybrid Power</span>
              </div>
              <div className="border-l border-white/10 pl-2 sm:pl-3 md:pl-6">
                <span className="block text-base sm:text-xl md:text-2xl font-black font-mono text-white">2.6s</span>
                <span className="block text-[9px] sm:text-[10px] tracking-widest text-neutral-400 uppercase">0–100 km/h</span>
              </div>
              <div className="border-l border-white/10 pl-2 sm:pl-3 md:pl-6">
                <span className="block text-base sm:text-xl md:text-2xl font-black font-mono text-white">345 km/h</span>
                <span className="block text-[9px] sm:text-[10px] tracking-widest text-neutral-400 uppercase">Top Speed</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-2 sm:gap-3 text-neutral-400">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-medium uppercase">Scroll to Drive</span>
              <div className="size-7 sm:size-8 rounded-full border border-white/20 flex items-center justify-center animate-bounce flex-shrink-0">
                <svg className="size-3 sm:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: SCROLL-DRIVEN 3D CAR TOUR (180vh) ─── */}
        <section
          id="specs"
          className="relative min-h-[180vh] w-full px-4 sm:px-6 md:px-16 pointer-events-none"
        >
          {/* Scroll Milestone 1: Aerodynamics / Side Profile */}
          {/* On mobile: card sits at bottom of the screen half, centred */}
          <div className="h-screen flex items-end sm:items-center justify-center sm:justify-end pb-8 sm:pb-0">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 md:p-8 rounded-2xl bg-neutral-950/80 sm:bg-neutral-950/70 border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-auto mx-auto sm:mx-0">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-sky-400 uppercase">01 / CHASSIS &amp; AERO</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mt-1.5 sm:mt-2 text-white">
                Carbon Monocoque
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Torsional rigidity elevated to motorsport standards. The ultra-lightweight CFRP structure forms the rigid heart of the 918 Spyder.
              </p>
              <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-neutral-400 border-t border-white/10 pt-3 sm:pt-4 flex-wrap">
                <span>DRY WEIGHT: 1,674 KG</span>
                <span>·</span>
                <span>AERO DRAG: 0.35 CD</span>
              </div>
            </div>
          </div>

          {/* Scroll Milestone 2: Powertrain / Rear Aero Profile */}
          <div className="h-screen flex items-end sm:items-center justify-center sm:justify-start pb-8 sm:pb-0">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 md:p-8 rounded-2xl bg-neutral-950/80 sm:bg-neutral-950/70 border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-auto mx-auto sm:mx-0">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-emerald-400 uppercase">02 / PROPULSION</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mt-1.5 sm:mt-2 text-white">
                V8 + Dual Electric Motors
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Naturally aspirated 4.6-liter V8 revving to 9,150 RPM coupled with dual independent electric motors delivering instant torque vectoring.
              </p>
              <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-neutral-400 border-t border-white/10 pt-3 sm:pt-4 flex-wrap">
                <span>MAX RPM: 9,150</span>
                <span>·</span>
                <span>TORQUE: 1,280 NM</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: CINEMATIC VIDEO THEATER (Down below) ─── */}
        <CarVideoSection />

      </div>
    </main>
  );
}
