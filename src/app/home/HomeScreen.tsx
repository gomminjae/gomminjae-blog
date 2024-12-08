import React from "react";
import Spline from "@splinetool/react-spline";
import HomeSection from "./HomeSection";

const HomeScreen = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Spline 3D 배경 */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/VxnxPvzwsP66B9kk/scene.splinecode" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-100 mb-6">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          Discover the latest articles and updates from my blog.
        </p>

        {/* HomeSection 컴포넌트 추가 */}
        <HomeSection title="Latest Posts" />
        <HomeSection title="Popular Topics" />
      </div>
    </div>
  );
};

export default HomeScreen;
