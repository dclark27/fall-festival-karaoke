"use client";

import { useEffect, useRef, useState } from "react";

export const ScrollingText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const shouldAnimate = textWidth > containerWidth;
      setShouldScroll(shouldAnimate);
      if (shouldAnimate) {
        const duration = textWidth / 50; // Adjust 50 to change speed
        setAnimationDuration(duration);
      }
    }
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap text-lg"
    >
      <div
        ref={textRef}
        className={
          shouldScroll ? "inline-block animate-float-scroll" : "inline-block"
        }
        style={
          shouldScroll
            ? ({ "--duration": `${animationDuration}s` } as React.CSSProperties)
            : {}
        }
      >
        {text}
      </div>
    </div>
  );
};
