"use client";

import React from "react";
import HomeScreen from "../app/home/HomeScreen"; // HomeScreen 컴포넌트를 import

export default function HomePage() {
  return (
    <div className="w-full h-screen">
      {/* HomeScreen을 전체 화면에 렌더링 */}
      <HomeScreen />
    </div>
  );
}
