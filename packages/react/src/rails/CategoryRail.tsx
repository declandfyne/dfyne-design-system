"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryCard } from "../cards/CategoryCard";
import { ArrowButton } from "../primitives/ArrowButton";

type Category = {
  image: string;
  title: string;
  href: string;
  caption?: string;
};

function getRailControls(el: HTMLDivElement | null) {
  if (!el) return { canScrollLeft: false, canScrollRight: false };
  const max = Math.max(0, el.scrollWidth - el.clientWidth);
  return { canScrollLeft: el.scrollLeft > 4, canScrollRight: el.scrollLeft < max - 4 };
}

export function CategoryRail({
  cards,
  className = "",
}: {
  cards: Category[];
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [controls, setControls] = useState({ canScrollLeft: false, canScrollRight: true });

  useEffect(() => {
    const update = () => setControls(getRailControls(railRef.current));
    update();
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", update); };
  }, [cards]);

  const scrollBy = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir === "left" ? -rail.clientWidth * 0.8 : rail.clientWidth * 0.8, behavior: "smooth" });
  };

  const showArrows = controls.canScrollLeft || controls.canScrollRight;

  return (
    <section className={className}>
      <div className="group/rail relative">
        {showArrows ? (
          <div className="pointer-events-none absolute inset-0 z-10 hidden opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100 lg:block">
            {controls.canScrollLeft ? (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 md:left-6">
                <ArrowButton direction="left" onClick={() => scrollBy("left")} variant="edge" />
              </div>
            ) : null}
            {controls.canScrollRight ? (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 md:right-6">
                <ArrowButton direction="right" onClick={() => scrollBy("right")} variant="edge" />
              </div>
            ) : null}
          </div>
        ) : null}
        <div ref={railRef} data-rail className="no-scrollbar overflow-x-auto" onScroll={() => setControls(getRailControls(railRef.current))}>
          <div className="flex">
            <div aria-hidden="true" className="h-px shrink-0 basis-2 md:basis-6" />
            <div className="flex gap-2">
              {cards.map((card) => (
                <CategoryCard key={card.title} {...card} />
              ))}
            </div>
            <div aria-hidden="true" className="h-px shrink-0 basis-2 md:basis-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
