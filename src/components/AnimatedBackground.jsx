import React from "react";

const shapes = [
  { style: "w-20 h-20 top-[20%] left-[10%] animate-float delay-0" },
  { style: "w-16 h-16 top-[60%] left-[80%] animate-float delay-2000" },
  { style: "w-24 h-24 top-[80%] left-[20%] animate-float delay-4000" },
  { style: "w-10 h-10 top-[30%] left-[70%] animate-float delay-1000" },
  { style: "w-32 h-32 top-[10%] left-[60%] animate-float delay-3000" },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
      <div className="absolute w-full h-full">
        {shapes.map((s, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-violet-500 to-violet-300 ${s.style}`}
            style={{
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${(i * 2) % 6}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-violet-600" />
    </div>
  );
} 