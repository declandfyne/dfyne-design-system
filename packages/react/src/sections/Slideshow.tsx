"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface Slide {
  image: string;
  alt: string;
  heading?: string;
  caption?: string;
  cta?: { label: string; href: string };
}

export interface SlideshowProps {
  slides: Slide[];
  autoplay?: boolean;
  interval?: number;
  activeIndex?: number;
  onSlideChange?: (index: number) => void;
  className?: string;
}

export function Slideshow({
  slides,
  autoplay = true,
  interval = 5000,
  activeIndex,
  onSlideChange,
  className = "",
}: SlideshowProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = activeIndex ?? internalIndex;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % slides.length) + slides.length) % slides.length;
      if (onSlideChange) {
        onSlideChange(next);
      }
      if (activeIndex === undefined) {
        setInternalIndex(next);
      }
    },
    [slides.length, onSlideChange, activeIndex],
  );

  const goNext = useCallback(() => goTo(current + 1), [goTo, current]);
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || hovered || slides.length <= 1) return;
    timerRef.current = setInterval(goNext, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, hovered, interval, goNext, slides.length]);

  // Sync internal index when controlled
  useEffect(() => {
    if (activeIndex !== undefined) {
      setInternalIndex(activeIndex);
    }
  }, [activeIndex]);

  const slide = slides[current];
  if (!slide) return null;

  return (
    <section
      className={`relative h-[80vh] w-full overflow-hidden ${className}`.trim()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-16 px-6 lg:px-10">
        <div className="flex flex-col items-start gap-3">
          {slide.caption && (
            <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-white">
              {slide.caption}
            </p>
          )}
          {slide.heading && (
            <h2 className="text-[34px] font-extrabold uppercase leading-[0.95] text-white">
              {slide.heading}
            </h2>
          )}
          {slide.cta && (
            <a
              href={slide.cta.href}
              className="mt-2 inline-block bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[2.7px] text-[#111111] transition-colors hover:bg-white/90"
            >
              {slide.cta.label}
            </a>
          )}
        </div>
      </div>

      {/* Arrow buttons */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-md transition-opacity duration-200 hover:bg-white/90 group-hover:opacity-100 [section:hover_&]:opacity-100"
          >
            <svg aria-hidden="true" viewBox="0 0 18 18" className="h-[14px] w-[14px]">
              <path
                d="M11 4.5 6.3 8.7a.4.4 0 0 0 0 .6L11 13.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-md transition-opacity duration-200 hover:bg-white/90 group-hover:opacity-100 [section:hover_&]:opacity-100"
          >
            <svg aria-hidden="true" viewBox="0 0 18 18" className="h-[14px] w-[14px]">
              <path
                d="M7 4.5l4.7 4.2a.4.4 0 0 1 0 .6L7 13.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-opacity duration-200 ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
