"use client";

import { useEffect, useRef, useState } from "react";

export const ScrollingText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      setShouldScroll(
        textRef.current.offsetWidth > containerRef.current.offsetWidth
      );
    }
  }, [text]);

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap">
      <div
        ref={textRef}
        className={`inline-block ${shouldScroll ? "animate-marquee" : ""}`}
      >
        {text}
      </div>
    </div>
  );
};
