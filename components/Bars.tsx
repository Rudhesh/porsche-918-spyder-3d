"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Bars() {
  const pulseRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 3,
        ease: "none",
      });
    }
    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.08,
        opacity: 0.9,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer Rotating Tachometer Ring */}
      <div className="relative size-24 flex items-center justify-center">
        <svg
          ref={ringRef}
          className="absolute inset-0 size-full text-sky-400/40"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="40 180"
            strokeLinecap="round"
          />
        </svg>

        {/* Ambient Crest Glow */}
        <div
          ref={pulseRef}
          className="absolute size-16 rounded-full bg-amber-500/20 blur-md pointer-events-none"
        />

        {/* Porsche Crest */}
        <img
          src="/icons/porsche.svg"
          alt="Porsche Crest"
          className="relative size-12 object-contain drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)]"
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
          Porsche 918 Telemetry
        </span>
      </div>
    </div>
  );
}
