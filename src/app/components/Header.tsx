import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col items-start bg-gray-800 text-white w-64 h-screen p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-6">My Blog</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="text-lg hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-lg hover:text-blue-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-lg hover:text-blue-400">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;