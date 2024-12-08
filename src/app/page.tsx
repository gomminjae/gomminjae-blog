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
      <div className="absolute top-10 left-10 z-10 text-white">
        <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
        <p className="text-lg mt-4">
          Discover amazing 3D content powered by Spline.
        </p>
      </div>
    </div>
  );
}
