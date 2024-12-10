"use client";

import React from "react";
import Spline from "@splinetool/react-spline";

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
      description: "A beginner's guide to building modern web applications with React.",
      link: "#",
    },
    {
      id: 3,
      title: "이게맞나?",
      description:
        "Learn the best practices for writing clean and maintainable code.",
      link: "#",
    },
  ];

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Spline 배경 */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VxnxPvzwsP66B9kk/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-transparent opacity-80"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <h1 className="text-6xl font-extrabold text-white mb-6">
          Welcome to <span className="text-purple-500">My Tech Blog</span>
        </h1>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl">
          코딩하기 싫어도 해야겠지?
        </p>

        {/* 블로그 글 리스트 */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-6">{post.description}</p>
              <a
                href={post.link}
                className="text-purple-500 hover:text-purple-400 font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
