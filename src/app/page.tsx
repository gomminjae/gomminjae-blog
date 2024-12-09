// src/app/home/page.tsx
"use client";

import React from "react";
import Spline from "@splinetool/react-spline";
import HomeSection from "../app/home/HomeScreen";

export default function HomePage() {
  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col">
      {/* Home Section */}
      <div className="bg-gray-800 p-6">
        <HomeSection title="Latest Posts" />
      </div>
    </div>
  );
}

