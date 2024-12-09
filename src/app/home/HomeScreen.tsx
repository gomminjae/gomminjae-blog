"use client";

import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import HomeSection from "./HomeSection";

const HomeScreen = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Flex 컨테이너 */}
      <div className="flex w-full h-full">
        {/* Spline 배경 (왼쪽 영역) */}
        <div
          className={`relative h-full transition-all duration-1000 ${
            animationStarted ? "w-1/2" : "w-full"
          } px-8`} // 여백 추가
        >
          <Spline
            scene="https://prod.spline.design/VxnxPvzwsP66B9kk/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* 블로그 콘텐츠 (오른쪽 영역) */}
        <div
          className={`transition-opacity duration-1000 flex flex-col items-center justify-center h-full text-center ${
            animationStarted ? "opacity-100 w-1/2" : "opacity-0 w-0"
          } px-8`} // 여백 추가
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to My Blog
          </h1>
          <HomeSection title="Latest Posts" />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
