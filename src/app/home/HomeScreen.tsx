"use client";

import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const HomeScreen = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // 애니메이션 트리거
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 2000); // 2초 후 블로그 글 등장
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Spline 배경 */}
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          animationStarted ? "spline-animation" : ""
        }`}
      >
        <Spline scene="https://prod.spline.design/VxnxPvzwsP66B9kk/scene.splinecode" />
      </div>

      {/* 블로그 콘텐츠 */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full px-6 text-center ${
          animationStarted ? "blog-animation" : ""
        }`}
      >
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to My Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-700 transition"
            >
              <h3 className="text-lg font-bold text-blue-400 mb-2">Post Title {i}</h3>
              <p className="text-sm text-gray-300">
                This is a brief description of the post.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
