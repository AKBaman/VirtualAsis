import React from "react";
import "./StarrySky.css";

export default function StarrySky() {
  // Create 5 shooting stars dynamically
  const shootingStars = Array.from({ length: 5 });

  return (
    <div className="sky-container">
      <div className="sky-stars"></div>
      {shootingStars.map((_, i) => (
        <div
          key={i}
          className="sky-shooting-star"
          style={{ animationDelay: `${i * 1}s`, top: `${20 + i * 15}%` }}
        ></div>
      ))}
    </div>
  );
}
