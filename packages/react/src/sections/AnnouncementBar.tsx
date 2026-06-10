"use client";

import { useEffect, useState } from "react";

type Slide = {
  text: string;
  detail: string;
};

export function AnnouncementBar({
  slides,
  interval = 4000,
  className = "",
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [slides.length, interval]);

  const slide = slides[activeIndex];
  if (!slide) return null;

  return (
    <header role="banner" className={`flex h-[36px] items-center justify-center gap-2 bg-black text-white ${className}`.trim()}>
      <span className="text-[10px] font-semibold uppercase tracking-[2.6px]">{slide.text}</span>
      <span className="text-[10px] font-normal tracking-[0.3px] text-white/80">{slide.detail}</span>
    </header>
  );
}
