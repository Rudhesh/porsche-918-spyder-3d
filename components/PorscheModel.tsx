"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import {
  useGLTF,
  Environment,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Responsive breakpoint hook ──────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

gsap.registerPlugin(ScrollTrigger);

// Track user scroll progress, velocity & directional mode
const scrollState = {
  progress: 0,
  velocity: 0,
  upFactor: 0, // 0 = scrolling down (slightly higher eye-level), 1 = scrolling up (higher top-down angle)
};

// Ground plane & car alignment
const GROUND_Y = -0.38;

// True physical center of the vehicle body
const CAR_TARGET = new THREE.Vector3(0, 0.05, 0);

// Camera angles — desktop
const CAM_DOWN_Y = 0.35;
const CAM_DOWN_Z = 4.9;
const CAM_UP_Y = 1.45;
const CAM_UP_Z = 4.3;

// Camera angles — mobile (wider Z pulls back so full car fits within wider FOV cone)
const CAM_DOWN_Y_MOBILE = 0.25;
const CAM_DOWN_Z_MOBILE = 4.2;
const CAM_UP_Y_MOBILE = 1.0;
const CAM_UP_Z_MOBILE = 3.8;

// Initial 3/4 front beauty angle & total scroll rotation
const INITIAL_ROTATION_Y = -Math.PI * 0.22;
const TOTAL_SCROLL_ROTATION = Math.PI * 2.5;

// ─── High-Resolution Procedural Underbody & Tire Contact Shadow Generator ──────
function useCarShadowTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 1024, 1024);

    // Canvas center is (512, 512).
    // Car length runs along Z (mapped to canvas Y), car width along X (mapped to canvas X).
    // Model scaled by 68: length ~ 3.1m, width ~ 2.0m, wheelbase ~ 2.7m.

    // 1. Broad soft ambient occlusion penumbra under the entire vehicle
    const broadAOGrad = ctx.createRadialGradient(512, 512, 80, 512, 512, 420);
    broadAOGrad.addColorStop(0, "rgba(0, 0, 0, 0.72)");
    broadAOGrad.addColorStop(0.35, "rgba(0, 0, 0, 0.55)");
    broadAOGrad.addColorStop(0.65, "rgba(0, 0, 0, 0.25)");
    broadAOGrad.addColorStop(0.85, "rgba(0, 0, 0, 0.08)");
    broadAOGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = broadAOGrad;
    ctx.beginPath();
    ctx.ellipse(512, 512, 270, 420, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. High-density undercarriage tray shadow (carbon tub & battery floor)
    const undertrayGrad = ctx.createRadialGradient(512, 512, 30, 512, 512, 300);
    undertrayGrad.addColorStop(0, "rgba(0, 0, 0, 0.96)");
    undertrayGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.88)");
    undertrayGrad.addColorStop(0.8, "rgba(0, 0, 0, 0.45)");
    undertrayGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = undertrayGrad;
    ctx.beginPath();
    const w = 180, h = 320, r = 60;
    ctx.roundRect(512 - w, 512 - h, w * 2, h * 2, r);
    ctx.fill();

    // 3. Four precision tire contact patches (ultra-dark rubber contact on asphalt/stage)
    // In local space, Porsche 918 Spyder wheel coordinates:
    // Front wheels: Z ≈ +0.92, X ≈ ±0.74 (canvas Y ≈ 512 - 210)
    // Rear wheels:  Z ≈ -0.88, X ≈ ±0.78 (canvas Y ≈ 512 + 205)
    const tirePatches = [
      { x: 512 - 172, y: 512 - 210, rx: 34, ry: 64, rot: -0.04 }, // Front Left
      { x: 512 + 172, y: 512 - 210, rx: 34, ry: 64, rot: 0.04 },  // Front Right
      { x: 512 - 178, y: 512 + 205, rx: 42, ry: 72, rot: 0.0 },   // Rear Left (wider 325 profile)
      { x: 512 + 178, y: 512 + 205, rx: 42, ry: 72, rot: 0.0 },   // Rear Right (wider 325 profile)
    ];

    tirePatches.forEach((tire) => {
      // Soft contact halo around tire
      const halo = ctx.createRadialGradient(tire.x, tire.y, 8, tire.x, tire.y, 80);
      halo.addColorStop(0, "rgba(0, 0, 0, 0.98)");
      halo.addColorStop(0.45, "rgba(0, 0, 0, 0.82)");
      halo.addColorStop(0.8, "rgba(0, 0, 0, 0.28)");
      halo.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.translate(tire.x, tire.y);
      ctx.rotate(tire.rot);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.ellipse(0, 0, tire.rx * 1.5, tire.ry * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dense contact footprint directly under tread
      const core = ctx.createRadialGradient(0, 0, 4, 0, 0, tire.ry * 0.95);
      core.addColorStop(0, "rgba(0, 0, 0, 1.0)");
      core.addColorStop(0.65, "rgba(0, 0, 0, 0.96)");
      core.addColorStop(1.0, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.ellipse(0, 0, tire.rx, tire.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);
}

// ─── Procedural High-Precision Turntable Stage Texture Generator ─────────────
function useTurntableTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    const center = 512;

    // Deep obsidian stage with subtle metallic radial gradient
    const bgGrad = ctx.createRadialGradient(center, center, 40, center, center, 510);
    bgGrad.addColorStop(0.0, "#0d1424");
    bgGrad.addColorStop(0.45, "#080c16");
    bgGrad.addColorStop(0.78, "#04060c");
    bgGrad.addColorStop(0.96, "#020306");
    bgGrad.addColorStop(1.0, "#000000");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle carbon-weave concentric guide rings
    ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(center, center, 280, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(center, center, 370, 0, Math.PI * 2);
    ctx.stroke();

    // Precision German telemetry degree tick marks (72-division circle)
    for (let i = 0; i < 72; i++) {
      const angle = (i * Math.PI * 2) / 72;
      const isMajor = i % 6 === 0;
      const rInner = isMajor ? 418 : 424;
      const rOuter = 432;
      ctx.strokeStyle = isMajor ? "rgba(56, 189, 248, 0.65)" : "rgba(56, 189, 248, 0.22)";
      ctx.lineWidth = isMajor ? 2.5 : 1.2;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * rInner, center + Math.sin(angle) * rInner);
      ctx.lineTo(center + Math.cos(angle) * rOuter, center + Math.sin(angle) * rOuter);
      ctx.stroke();
    }

    // Outer primary glowing halo rim
    const haloGrad = ctx.createRadialGradient(center, center, 440, center, center, 480);
    haloGrad.addColorStop(0.0, "rgba(56, 189, 248, 0.85)");
    haloGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.45)");
    haloGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.strokeStyle = haloGrad;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(center, center, 458, 0, Math.PI * 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, []);
}

// ─── Procedural Curved Studio Backdrop Texture ────────────────────────────────
function useStudioBackdropTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Rich cinematic vertical studio lighting gradient
    // Center glow behind the hero car, smooth dark vignette toward edges and ceiling
    const vGrad = ctx.createLinearGradient(0, 1024, 0, 0);
    vGrad.addColorStop(0.0, "#010206");
    vGrad.addColorStop(0.12, "#071224");
    vGrad.addColorStop(0.32, "#0b1d38");
    vGrad.addColorStop(0.55, "#081427");
    vGrad.addColorStop(0.85, "#030711");
    vGrad.addColorStop(1.0, "#010204");
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle horizontal studio horizon light band
    const hGrad = ctx.createRadialGradient(512, 780, 20, 512, 780, 500);
    hGrad.addColorStop(0.0, "rgba(56, 189, 248, 0.45)");
    hGrad.addColorStop(0.3, "rgba(14, 165, 233, 0.25)");
    hGrad.addColorStop(0.7, "rgba(3, 105, 161, 0.08)");
    hGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, 400, 1024, 624);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }, []);
}

// ─── Procedural Soft Radial Mist Texture Generator ────────────────────────────
function useSmokeTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Multi-stop realistic vapor falloff with luminous core that catches studio light
    const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
    grad.addColorStop(0.0, "rgba(224, 242, 254, 0.55)");
    grad.addColorStop(0.2, "rgba(125, 211, 252, 0.38)");
    grad.addColorStop(0.5, "rgba(14, 116, 144, 0.16)");
    grad.addColorStop(0.8, "rgba(3, 20, 45, 0.04)");
    grad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }, []);
}

// ─── Gentle Realistic Ground Smoke (Stays Low, Never Covers Car) ──────────────
function GentleGroundSmoke() {
  const smokeTexture = useSmokeTexture();
  const groupRef = useRef<THREE.Group>(null);

  // Slow, delicate atmospheric drift around the stage perimeter
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Mesh;
      const speed = (i % 2 === 0 ? 0.025 : -0.02) * (0.8 + (i % 3) * 0.2);
      child.rotation.z += speed * delta;
    }
  });

  if (!smokeTexture) return null;

  // Low-lying ground mist puffs arranged around turntable perimeter and behind diffuser
  // All strictly grounded at y = GROUND_Y + 0.015 to 0.025 (well below vehicle body)
  const mistPuffs = [
    { pos: [2.0, GROUND_Y + 0.015, 1.2], scale: 2.7 },
    { pos: [-2.1, GROUND_Y + 0.018, 1.0], scale: 2.9 },
    { pos: [0.0, GROUND_Y + 0.015, -2.2], scale: 3.3 },
    { pos: [2.2, GROUND_Y + 0.018, -1.2], scale: 2.8 },
    { pos: [-2.1, GROUND_Y + 0.015, -1.3], scale: 3.0 },
    { pos: [0.0, GROUND_Y + 0.020, 2.1], scale: 2.6 },
    { pos: [1.4, GROUND_Y + 0.016, -1.9], scale: 2.5 },
    { pos: [-1.4, GROUND_Y + 0.016, -1.9], scale: 2.5 },
  ];

  return (
    <group ref={groupRef}>
      {mistPuffs.map((puff, idx) => (
        <mesh
          key={idx}
          position={puff.pos as [number, number, number]}
          rotation={[-Math.PI / 2, 0, (idx * Math.PI) / 4]}
        >
          <planeGeometry args={[puff.scale, puff.scale]} />
          <meshBasicMaterial
            map={smokeTexture}
            transparent
            opacity={0.42}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Premium Cinematic 3D Automotive Poster Backdrop ──────────────────────────
function CinematicAutomotiveBackdrop() {
  const backdropTexture = useStudioBackdropTexture();

  return (
    <group position={[0, GROUND_Y, 0]}>
      {/* ── 1. Curved Studio Cyclorama Wall with Designed Gradient ── */}
      {backdropTexture && (
        <mesh position={[0, 4.8, -6.5]} rotation={[0, Math.PI, 0]}>
          <cylinderGeometry
            args={[17, 17, 12, 64, 1, true, -Math.PI * 0.4, Math.PI * 0.8]}
          />
          <meshBasicMaterial
            map={backdropTexture}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* ── 2. Cinematic Floor Horizon Light Strip ── */}
      <mesh position={[0, 0.42, -6.2]}>
        <planeGeometry args={[24, 0.08]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 3. Subtle Horizon Atmospheric Anamorphic Glow ── */}
      <mesh position={[0, 0.65, -6.3]}>
        <planeGeometry args={[26, 1.2]} />
        <meshBasicMaterial
          color="#0369a1"
          transparent
          opacity={0.25}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 4. Architectural Studio Slat Accents (Recessed, Non-Distracting) ── */}
      {[-7.5, -4.5, -1.8, 1.8, 4.5, 7.5].map((xPos, idx) => {
        const zPos = -6.1 + Math.abs(xPos) * 0.12;
        const rotY = (xPos / 17) * 0.55;
        return (
          <group key={idx} position={[xPos, 3.4, zPos]} rotation={[0, rotY, 0]}>
            {/* Dark acoustic studio fin */}
            <mesh>
              <boxGeometry args={[0.06, 5.2, 0.12]} />
              <meshStandardMaterial color="#050a14" roughness={0.8} metalness={0.4} />
            </mesh>
            {/* Soft cyan hairline LED accent */}
            <mesh position={[0, 0, 0.07]}>
              <planeGeometry args={[0.018, 4.8]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* ── 5. Minimalist Overhead Studio Rig ── */}
      <mesh position={[0, 7.6, -3.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[20, 0.1, 0.3]} />
        <meshStandardMaterial color="#090f1c" roughness={0.5} metalness={0.7} />
      </mesh>
      <mesh position={[0, 7.54, -3.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[19, 0.12]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── High-End Automotive Turntable Stage ───────────────────────────────────────
function CinematicStudioStage() {
  const turntableTexture = useTurntableTexture();

  return (
    <group position={[0, GROUND_Y, 0]}>
      {/* ── Designed Turntable Floor with Telemetry & Precision Rings ── */}
      {turntableTexture && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
          <circleGeometry args={[2.45, 128]} />
          <meshBasicMaterial
            map={turntableTexture}
            transparent
            opacity={0.98}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* ── Deep Polished Obsidian Sub-Base Pedestal ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[2.55, 128]} />
        <meshStandardMaterial
          color="#03050a"
          roughness={0.16}
          metalness={0.92}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* ── Outer Precision Track Ring ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <ringGeometry args={[2.62, 2.65, 128]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Seamless Dark Ground (Absorptive Black — Merges Flawlessly with UI) ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// ─── Studio Lighting Softboxes ────────────────────────────────────────────────
function StudioDiffusers() {
  return (
    <group>
      {/* Overhead Key Softbox (Creates continuous highlight along roof & hood) */}
      <mesh position={[0, 4.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 2.2]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left Rim Diffuser */}
      <mesh position={[-4.2, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[6.5, 0.4]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Accent Diffuser */}
      <mesh position={[4.2, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[6.5, 0.4]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Main Porsche Model ───────────────────────────────────────────────────────
export function PorscheModel() {
  const { scene } = useGLTF("/models/porsche.glb");
  const carGroupRef = useRef<THREE.Group>(null);
  const carShadowTexture = useCarShadowTexture();
  const isMobile = useIsMobile();

  // Clone scene & tune materials for automotive showroom brilliance
  const clonedScene = useMemo(() => {
    const clone = scene.clone();

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false; // Dedicated procedural shadow locks under car without offset
        mesh.receiveShadow = false;

        const tuneMaterial = (mat: THREE.Material) => {
          if (!mat) return;
          const std = mat as THREE.MeshStandardMaterial;
          const name = (std.name || "").toLowerCase();

          // Metallic Asphalt Blue Body Paint
          if (name.includes("carpaint") || name.includes("body") || name.includes("paint")) {
            std.roughness = 0.09;
            std.metalness = 0.94;
            std.envMapIntensity = 3.4;
          }
          // Aerodynamic Tinted Glass
          else if (name.includes("windwos") || name.includes("glass")) {
            std.transparent = true;
            std.opacity = 0.78;
            std.roughness = 0.03;
            std.metalness = 0.98;
            std.envMapIntensity = 3.6;
          }
          // Carbon Fiber Aero Elements
          else if (name.includes("carbon")) {
            std.roughness = 0.42;
            std.metalness = 0.65;
            std.envMapIntensity = 1.9;
          }
          // Alloy Rims & Wheels
          else if (name.includes("rim") || name.includes("wheel")) {
            std.roughness = 0.16;
            std.metalness = 0.96;
            std.envMapIntensity = 2.8;
          }
          // Calipers
          else if (name.includes("caliper")) {
            std.roughness = 0.28;
            std.metalness = 0.75;
          }
        };

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(tuneMaterial);
        } else if (mesh.material) {
          tuneMaterial(mesh.material);
        }
      }
    });

    return clone;
  }, [scene]);

  // Wire up scroll progress, velocity, and directional intent via native events + GSAP
  useGSAP(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastTime = performance.now();

    const syncScroll = () => {
      const track = document.getElementById("scroll-track");
      const maxScroll = track
        ? track.offsetHeight - window.innerHeight
        : document.documentElement.scrollHeight - window.innerHeight;

      const currentY = window.scrollY;
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.001);
      const deltaY = currentY - lastY;

      // Track directional intent with smooth threshold
      if (deltaY > 1) {
        scrollState.upFactor = 0; // scrolling down -> higher eye-level angle
      } else if (deltaY < -1) {
        scrollState.upFactor = 1; // scrolling up -> higher elevation / top-down angle
      }

      // Track instantaneous velocity (normalized)
      const rawVelocity = Math.abs(deltaY) / dt; // px/sec
      scrollState.velocity = Math.min(rawVelocity / 800, 4.0);

      if (maxScroll > 0) {
        scrollState.progress = Math.min(Math.max(currentY / maxScroll, 0), 1);
      }

      lastY = currentY;
      lastTime = now;
    };

    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll, { passive: true });
    syncScroll();

    // GSAP ScrollTrigger for precise element bounding sync
    const st = ScrollTrigger.create({
      trigger: "#scroll-track",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
        if (self.direction === 1) {
          scrollState.upFactor = 0;
        } else if (self.direction === -1) {
          scrollState.upFactor = 1;
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
      st.kill();
    };
  }, []);

  // Per-frame: Lock camera motion directly onto the car's center & smooth transitions
  useFrame((state, delta) => {
    if (!carGroupRef.current) return;
    const pointer = state.pointer;

    // Decay velocity smoothly per frame so motion stays organic
    scrollState.velocity = THREE.MathUtils.damp(scrollState.velocity, 0, 3.5, delta);

    // 1. Car Y-rotation directly tied to scroll progress (reverses when scrolling up)
    const targetRotationY = INITIAL_ROTATION_Y + scrollState.progress * TOTAL_SCROLL_ROTATION;
    
    // Rotation damping speed dynamically responds to scroll velocity for snappy yet buttery feel
    const dynamicDamp = 6.0 + scrollState.velocity * 3.5;
    carGroupRef.current.rotation.y = THREE.MathUtils.damp(
      carGroupRef.current.rotation.y,
      targetRotationY,
      dynamicDamp,
      delta
    );

    // Subtle interactive tilt on X — disabled on mobile (no pointer hover)
    const targetTiltX = isMobile ? 0 : -pointer.y * 0.02;
    carGroupRef.current.rotation.x = THREE.MathUtils.damp(
      carGroupRef.current.rotation.x,
      targetTiltX,
      4,
      delta
    );

    // 2. Camera motion locked onto car center — use responsive positions
    const downY = isMobile ? CAM_DOWN_Y_MOBILE : CAM_DOWN_Y;
    const downZ = isMobile ? CAM_DOWN_Z_MOBILE : CAM_DOWN_Z;
    const upY   = isMobile ? CAM_UP_Y_MOBILE   : CAM_UP_Y;
    const upZ   = isMobile ? CAM_UP_Z_MOBILE   : CAM_UP_Z;

    const targetCameraY = THREE.MathUtils.lerp(downY, upY, scrollState.upFactor);
    const targetCameraZ = THREE.MathUtils.lerp(downZ, upZ, scrollState.upFactor);

    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetCameraY,
      4.5,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetCameraZ,
      4.5,
      delta
    );

    // Camera always targets the car's body center (y = 0.05)
    state.camera.lookAt(CAR_TARGET.x, CAR_TARGET.y, CAR_TARGET.z);
  });

  return (
    <>
      {/* ── Realistic City HDR Reflection Map ── */}
      <Environment preset="city" environmentIntensity={1.7} />

      {/* ── Starry Night Sky — fewer stars on mobile for perf ── */}
      {!isMobile && (
        <Stars
          radius={45}
          depth={25}
          count={450}
          factor={3.0}
          saturation={0.4}
          fade
          speed={0.3}
        />
      )}

      {/* ── Premium Cinematic 3D Automotive Poster Backdrop ── */}
      <CinematicAutomotiveBackdrop />

      {/* ── Studio Lighting System ── */}
      <ambientLight intensity={0.55} color="#94a3b8" />

      {/* Main Overhead Key Light */}
      <directionalLight
        position={[3, 8, 4]}
        intensity={3.4}
        color="#ffffff"
      />

      {/* Cyan Silhouette Rim Light */}
      <directionalLight position={[-6, 3.5, -4]} intensity={2.8} color="#38bdf8" />

      {/* Warm Fill Light — skip on mobile */}
      {!isMobile && (
        <directionalLight position={[6, 2.5, -3]} intensity={1.8} color="#fb923c" />
      )}

      {/* Overhead Spot for roofline definition — skip on mobile */}
      {!isMobile && (
        <spotLight
          position={[0, 8, 1]}
          intensity={3.2}
          angle={0.65}
          penumbra={0.8}
          color="#e0f2fe"
        />
      )}

      {/* Under-chassis glow accent */}
      <pointLight position={[0, GROUND_Y + 0.12, 0]} intensity={1.0} color="#0284c7" distance={2.8} />

      {/* ── 3D Architectural Showroom Stage & Diffusers ── */}
      <CinematicStudioStage />
      {!isMobile && <StudioDiffusers />}

      {/* ── Gentle Realistic Ground Smoke (Hugs Floor, Never Covers Car) ── */}
      <GentleGroundSmoke />

      {/* ── Floating Atmospheric Particles — reduced count on mobile ── */}
      <Sparkles
        count={isMobile ? 18 : 55}
        size={isMobile ? 0.7 : 0.9}
        speed={0.12}
        opacity={0.22}
        color="#7dd3fc"
        scale={[11, 4, 8]}
        position={[0, 0.8, 0]}
      />

      {/* ── The Porsche Car: Centered at Eye Level ── */}
      {/*
        Tires are at local Y = 0.000.
        Placing car at position={[0, GROUND_Y, 0]} grounds tires flush on stage.
      */}
      <group ref={carGroupRef} position={[0, GROUND_Y, 0]}>
        <primitive object={clonedScene} scale={68} />

        {/*
          Physically locked high-resolution underbody & tire contact shadow.
          Parented directly inside carGroupRef at y = 0.002 (local space):
          Follows car position, Y-rotation, and interactive tilt naturally and synchronously!
        */}
        {carShadowTexture && (
          <mesh
            position={[0, 0.0025, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[2.7, 4.6]} />
            <meshBasicMaterial
              map={carShadowTexture}
              transparent
              opacity={0.98}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </>
  );
}

useGLTF.preload("/models/porsche.glb");
