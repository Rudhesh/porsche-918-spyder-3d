"use client";
import React from "react";
import { View } from "@react-three/drei";
import { PorscheModel } from "./PorscheModel";

export default function Scene() {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
      <View className="w-full h-full pointer-events-none">
        <PorscheModel />
      </View>
    </div>
  );
}
