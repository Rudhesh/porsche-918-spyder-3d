"use client";
import React from "react";
import { Html, useProgress } from "@react-three/drei";
import Bars from "./Bars";

const LoadingSkeleton = () => {
  const { progress } = useProgress();
  const pct = Math.min(100, Math.floor(progress));

  return (
    <Html position={[0, 0, 0]} center prepend>
      <div className="flex items-center justify-center bg-black/95 w-screen h-screen select-none">
        <div className="flex flex-col items-center w-64 sm:w-80 p-6 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <Bars />

          <div className="w-full mt-6">
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-2">
              <span className="tracking-wider uppercase">V8 HYBRID CALIBRATION</span>
              <span className="text-sky-400 font-bold">{pct}%</span>
            </div>

            {/* Glowing Progress Track */}
            <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-200 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
                887 PS · 1,280 NM · WEISSACH PACKAGE
              </span>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default LoadingSkeleton;
