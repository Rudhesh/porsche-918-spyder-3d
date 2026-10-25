"use client";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import LoadingSkeleton from "./LoadingSkeleton";
import AssetsPreload from "./AssetsPreload";
import { patchThreeLoadingManager } from "@/lib/patchThreeLoadingManager";

patchThreeLoadingManager();

const ViewCanvas = () => {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setEventSource(document.body);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      // Wider FOV on mobile so the full car stays in frame without being cut off
      camera={{ position: [0, 0.35, 4.9], fov: isMobile ? 52 : 38 }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
      // Cap pixel ratio at 1.5 on mobile to halve GPU fill-rate cost
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        // Disable expensive MSAA on mobile; browser FXAA is sufficient at mobile PPI
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false, // stencil buffer unused; saves GPU memory bandwidth
      }}
    >
      <AssetsPreload />
      <Suspense fallback={<LoadingSkeleton />}>
        <View.Port />
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;
