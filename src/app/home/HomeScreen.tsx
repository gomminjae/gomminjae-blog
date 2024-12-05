import React from "react";
import HomeSection from "./HomeSection";

const HomeScreen = () => {
  return (
    <div className="px-6 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to My Blog
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Discover the latest articles and updates from my blog.
      </p>

      {/* HomeSection 컴포넌트 추가 */}
      <HomeSection title="Latest Posts" />
      <HomeSection title="Popular Topics" />
    </div>
  );
};

export default HomeScreen;
