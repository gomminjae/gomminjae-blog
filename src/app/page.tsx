// src/app/home/page.tsx
"use client";

import React from "react";
import Spline from "@splinetool/react-spline";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Spline 배경 */}
      <Spline scene="https://prod.spline.design/VxnxPvzwsP66B9kk/scene.splinecode" />

      {/* 콘텐츠 */}
    </div>
  );
}
