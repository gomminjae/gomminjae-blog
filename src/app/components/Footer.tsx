"use client";

import React, { useState } from "react";
import Link from "next/link";



const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* 왼쪽 텍스트 */}
                <div className="text-sm">
                    <p>
                        © {new Date().getFullYear()} Gomminjae. All rights reserved.
                    </p>
                </div>

                {/* 링크 리스트 */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-300 text-sm"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-300 text-sm"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-300 text-sm"
                    >
                        Support
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-white transition duration-300 text-sm"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
