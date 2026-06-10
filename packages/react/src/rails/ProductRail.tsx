"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../cards/ProductCard";
import { ArrowButton } from "../primitives/ArrowButton";
import { SectionHeading } from "../primitives/SectionHeading";

type Product = {
  image: string;
  name: string;
  color: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
};

function getRailControls(el: HTMLDivElement | null) {
  if (!el) return { canScrollLeft: false, canScrollRight: false };
  const max = Math.max(0, el.scrollWidth - el.clientWidth);
  return { canScrollLeft: el.scrollLeft > 4, canScrollRight: el.scrollLeft < max - 4 };
}

export function ProductRail({
  id,
  eyebrow,
  title,
  products,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  products: Product[];
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
  }, [products]);

  const scrollBy = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir === "left" ? -rail.clientWidth * 0.8 : rail.clientWidth * 0.8, behavior: "smooth" });
  };

  const showArrows = controls.canScrollLeft || controls.canScrollRight;

  return (
    <section id={id} className={className}>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-end justify-between gap-4 px-2 md:px-6">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
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
                {products.map((product, i) => (
                  <ProductCard key={`${product.name}-${i}`} {...product} />
                ))}
              </div>
              <div aria-hidden="true" className="h-px shrink-0 basis-2 md:basis-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
