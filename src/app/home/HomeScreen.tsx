"use client";

import React from "react";

const HomeScreen = () => {
  const posts = [
    {
      id: 1,
      title: "Next 재밌다",
      description:
        "Explore how artificial intelligence is shaping the future of technology.",
      link: "#",
    },
    {
      id: 2,
      title: "테일윈드는 별로",
      description:
        "A beginner's guide to building modern web applications with React.",
      link: "#",
    },
    {
      id: 3,
      title: "이게맞나",
      description:
        "Learn the best practices for writing clean and maintainable code.",
      link: "#",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 헤더 */}
      <header className="sticky top-0 bg-gray-800 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
            Gomminjae <span className="text-white">Blog</span>
          </h1>
          <button className="text-sm sm:text-base text-gray-300 hover:text-blue-400">
            Menu
          </button>
        </div>
      </header>

      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
        >
          <rect width="100%" height="100%" fill="url(#grid)" />
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
        </svg>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-blue-500">My Tech Blog</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-12">
          공부한 내용을 기록합니다.
        </p>

        {/* 블로그 글 리스트 */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6">{post.description}</p>
              <a
                href={post.link}
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;

