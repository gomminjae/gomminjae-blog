"use client";

import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
          Gomminjae <span className="text-white">Blog</span>
        </h1>
        <button className="text-sm sm:text-base text-gray-300 hover:text-blue-400">
          Menu
        </button>
      </div>
    </header>
  );
}
