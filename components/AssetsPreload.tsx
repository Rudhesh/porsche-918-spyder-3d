"use client";
import { useGLTF } from "@react-three/drei";

export default function AssetsPreload() {
  useGLTF.preload("/models/porsche.glb");
  return null;
}
