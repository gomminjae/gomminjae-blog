// src/app/components/SplineBackground.tsx
"use client";

import React from "react";
import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
    return (
        <div className="absolute inset-0 -z-10">
            <Spline scene="https://prod.spline.design/VxnxPvzwsP66B9kk/scene.splinecode" />
        </div>
    );
}
