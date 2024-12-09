"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black text-gray-200 shadow-lg fixed top-0 left-0 w-full z-10">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* 로고 -> Home 링크 */}
        <Link
          href="/"
          className="text-2xl font-semibold text-gray-200 hover:text-gray-400 transition-colors"
        >
          Gomminjae
        </Link>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="lg:hidden bg-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 hover:bg-gray-700 transition-colors"
          onClick={toggleMenu}
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden lg:flex space-x-8">
        <Link
            href="/posts"
            className="text-lg font-medium text-gray-200 hover:text-gray-400 transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-gray-200 hover:text-gray-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-gray-200 hover:text-gray-400 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <nav className="lg:hidden bg-gray-900 text-gray-200 px-8 py-4">
          <ul className="space-y-6">
            <li>
              <Link
                href="/about"
                className="text-lg font-medium text-gray-200 hover:text-gray-400 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-lg font-medium text-gray-200 hover:text-gray-400 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
