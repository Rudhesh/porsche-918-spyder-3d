"use client";
import React, { useState } from "react";

interface SectorInfo {
  id: string;
  name: string;
  distance: string;
  speed: string;
  highlight: string;
  timeMark: string;
  description: string;
}

const SECTORS: SectorInfo[] = [
  {
    id: "s1",
    name: "Sector 1 · Flugplatz to Schwedenkreuz",
    distance: "KM 0.0 – 6.8",
    speed: "265 km/h",
    highlight: "Downforce Equilibrium",
    timeMark: "01:38.4",
    description:
      "Cresting the blind rise at Flugplatz with active aero wing deployed to Race Mode. High-speed stability and CFRP torsional rigidity keep all four wheels planted.",
  },
  {
    id: "s2",
    name: "Sector 2 · Caracciola-Karussell",
    distance: "KM 6.8 – 14.2",
    speed: "118 km/h",
    highlight: "Dual-Motor Torque Vectoring",
    timeMark: "03:42.1",
    description:
      "Dropping into the rough 33° concrete banking. Independent front electric motor powers through understeer, delivering instant pull onto the Hohe Acht climb.",
  },
  {
    id: "s3",
    name: "Sector 3 · Döttinger Höhe",
    distance: "KM 14.2 – 20.8",
    speed: "338 km/h",
    highlight: "887 PS Full Hybrid Boost",
    timeMark: "06:57.0",
    description:
      "The 2.13-kilometer straight. Flat-six and dual e-motors unleash full 887 PS and 1,280 Nm torque, pushing past 330 km/h before the Tiergarten braking zone.",
  },
];

export default function CarVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSector, setActiveSector] = useState<SectorInfo>(SECTORS[0]);

  return (
    <section
      id="video-section"
      className="relative z-20 min-h-screen w-full bg-gradient-to-b from-transparent via-[#030712] to-[#000000] px-4 sm:px-6 md:px-16 py-20 sm:py-28 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Cinematic Ambient Atmosphere Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[700px] md:w-[950px] h-[180px] sm:h-[350px] bg-sky-500/10 blur-[100px] sm:blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[260px] sm:w-[600px] md:w-[800px] h-[160px] sm:h-[320px] bg-emerald-500/8 blur-[100px] sm:blur-[160px] pointer-events-none rounded-full" />

      {/* ── Section Header ── */}
      <div className="max-w-4xl w-full text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 mb-3 bg-sky-950/40 border border-sky-800/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-sky-400">
            Nürburgring Nordschleife Benchmark
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-sans">
          The 6:57 Record Lap
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed px-2 sm:px-0">
          The first production road car to shatter the historic seven-minute threshold on the Green Hell. 20.832 kilometers of asphalt, 73 turns, 887 horsepower unleashed.
        </p>
      </div>

      {/* ── Cinematic Video Theater Container ── */}
      <div className="max-w-5xl w-full relative z-10">
        {/* Frame Outer Glow & Carbon Border */}
        <div className="relative rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_20px_70px_rgba(2,132,199,0.15)] border border-white/10 backdrop-blur-xl">

          {/* Top HUD Telemetry Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/60 rounded-t-xl sm:rounded-t-2xl border-b border-white/10 text-[10px] sm:text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-red-400 font-semibold">
                <span className="size-2 rounded-full bg-red-500 animate-ping" />
                REC // 06:57.00
              </span>
              <span className="hidden sm:inline text-neutral-600">|</span>
              <span className="hidden sm:inline text-neutral-400">DRIVER: MARC LIEB</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="hidden md:inline">20.832 KM · 73 CORNERS</span>
              <span className="text-emerald-400 font-semibold">OFFICIAL FIA VERIFIED</span>
            </div>
          </div>

          {/* 16:9 Video Canvas Screen */}
          <div className="relative aspect-video w-full overflow-hidden bg-black rounded-b-xl sm:rounded-b-2xl group">
            {isPlaying ? (
              <div className="relative w-full h-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/2Yygvd1lhpA?autoplay=1&rel=0&modestbranding=1"
                  title="Porsche 918 Spyder Nürburgring Nordschleife 6:57 Lap Record"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 text-[11px] font-mono tracking-wider backdrop-blur-md transition-all cursor-pointer"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>CLOSE FILM</span>
                </button>
              </div>
            ) : (
              /* High-End Cinematic Preview Poster Screen */
              <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-neutral-950 to-black select-none">
                {/* Circuit Grid Graphic Lines */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* Ambient Center Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Top Poster Meta */}
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-sky-400 block mb-1">
                      Onboard In-Car Camera
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
                      Porsche 918 Spyder Weissach Package
                    </h3>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 bg-neutral-900/80 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md font-mono text-[11px] text-neutral-300">
                    <span className="text-emerald-400 font-bold">887 HP</span>
                    <span>·</span>
                    <span>MICHELIN PILOT SPORT CUP 2</span>
                  </div>
                </div>

                {/* Center Launch Play Trigger */}
                <div className="relative z-10 self-center flex flex-col items-center my-auto">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Launch Onboard Lap Film"
                    className="group/btn relative flex items-center justify-center size-20 sm:size-24 rounded-full bg-white text-black shadow-[0_0_50px_rgba(56,189,248,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    {/* Pulsing ring aura */}
                    <span className="absolute inset-0 rounded-full border-2 border-sky-400/80 animate-ping opacity-75 pointer-events-none" />
                    <span className="absolute -inset-2 rounded-full border border-white/30 pointer-events-none" />

                    {/* Play Triangle Icon */}
                    <svg
                      className="size-8 sm:size-9 ml-1 text-black transition-transform duration-300 group-hover/btn:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  <span className="mt-4 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white font-semibold">
                    Launch Onboard Film
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider mt-0.5">
                    Official 4K Nürburgring Record Lap
                  </span>
                </div>

                {/* Bottom Poster Meta */}
                <div className="relative z-10 flex flex-wrap justify-between items-end gap-2 text-[10px] sm:text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-4">
                    <span>AVG SPEED: 179.5 KM/H</span>
                    <span>·</span>
                    <span>MAX G: 1.85 G</span>
                  </div>
                  <span className="text-sky-400">CLICK TO COMMENCE PLAYBACK</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Telemetry Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/70 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider uppercase block">
              Official Lap Time
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
              06:57.00
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
              1st road car under 7 mins
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/70 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider uppercase block">
              Average Speed
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
              179.5 <span className="text-sm font-normal text-neutral-400">km/h</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
              Through 73 corners
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/70 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider uppercase block">
              Top Straight Speed
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
              338 <span className="text-sm font-normal text-neutral-400">km/h</span>
            </div>
            <span className="text-[10px] text-sky-400 font-mono mt-1 block">
              At Döttinger Höhe
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/70 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-wider uppercase block">
              Peak Lateral Force
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
              1.85 <span className="text-sm font-normal text-neutral-400">G</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
              Michelin Pilot Sport Cup 2
            </span>
          </div>
        </div>

        {/* ── Interactive Sector Breakdown Telemetry ── */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-neutral-950/60 border border-white/10 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-sky-400 block mb-1">
                Telemetry Breakdown
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans">
                Key Track Sectors
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              SELECT SECTOR TO INSPECT DYNAMICS
            </span>
          </div>

          {/* Sector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {SECTORS.map((sector) => {
              const active = sector.id === activeSector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setActiveSector(sector)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer border ${
                    active
                      ? "bg-sky-950/40 border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                      : "bg-neutral-900/40 border-white/5 hover:border-white/20 text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className={active ? "text-sky-400 font-bold" : "text-neutral-400"}>
                      {sector.distance}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-white/10 text-neutral-300">
                      {sector.timeMark}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white truncate">
                    {sector.name.split("·")[1]?.trim() || sector.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Sector Detailed Card */}
          <div className="p-4 sm:p-6 rounded-xl bg-black/40 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                  {activeSector.name}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {activeSector.highlight}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {activeSector.description}
              </p>
            </div>

            <div className="flex items-center gap-6 sm:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-8 flex-shrink-0">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Sector Speed
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {activeSector.speed}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Split Mark
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-sky-400">
                  {activeSector.timeMark}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Return to 3D Cockpit Experience button */}
        <div className="mt-12 text-center">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-white px-6 py-3 rounded-full border border-white/10 hover:border-white/30 bg-neutral-950/60 backdrop-blur-md transition-all group"
          >
            <svg
              className="size-4 text-sky-400 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Back to 3D Showroom</span>
          </a>
        </div>
      </div>
    </section>
  );
}
