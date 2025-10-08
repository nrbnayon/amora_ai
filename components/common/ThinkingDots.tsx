// components/ai-assistant/ThinkingDots.tsx
"use client";
import React, { useEffect, useState } from "react";

type SizeType = "xs" | "sm" | "md" | "lg";

interface ThinkingDotsProps {
  size?: SizeType;
  colors?: string[];
  duration?: number;
  delay?: number[];
}

const ThinkingDots: React.FC<ThinkingDotsProps> = ({
  size = "sm",
  colors = ["#3B82F6", "#8B5CF6", "#EC4899"], // blue-500, purple-500, pink-500
  duration = 1400,
  delay = [0, 200, 400],
}) => {
  const sizeMapping: Record<SizeType, number> = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  };

  const dotSize = sizeMapping[size];

  // Create animated dot component
  const AnimatedDot = ({
    color,
    delayMs,
  }: {
    color: string;
    delayMs: number;
  }) => {
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
      const animate = () => {
        setTimeout(() => {
          const startTime = Date.now();
          const animationDuration = duration / 2;

          const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Easing function (quad out)
            const eased = 1 - Math.pow(1 - progress, 2);
            const currentY = -8 * eased;

            setTranslateY(currentY);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              // Start reverse animation
              const reverseStartTime = Date.now();
              const reverseStep = () => {
                const elapsed = Date.now() - reverseStartTime;
                const progress = Math.min(elapsed / animationDuration, 1);
                const eased = 1 - Math.pow(1 - progress, 2);
                const currentY = -8 * (1 - eased);

                setTranslateY(currentY);

                if (progress < 1) {
                  requestAnimationFrame(reverseStep);
                } else {
                  // Repeat
                  setTimeout(animate, 0);
                }
              };
              reverseStep();
            }
          };
          step();
        }, delayMs);
      };

      animate();
    }, [delayMs]);

    return (
      <div
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          borderRadius: "50%",
          marginLeft: "2px",
          marginRight: "2px",
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.05s linear",
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "8px",
      }}
    >
      {colors.map((color, index) => (
        <AnimatedDot key={index} color={color} delayMs={delay[index] || 0} />
      ))}
    </div>
  );
};

export default ThinkingDots;
