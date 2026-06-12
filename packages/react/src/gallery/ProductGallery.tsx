"use client";

import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}

export function ProductGallery({
  images,
  activeIndex: controlledIndex,
  onIndexChange,
  className = "",
}: ProductGalleryProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;
  const currentImage = images[activeIndex];

  function handleSelect(index: number) {
    setInternalIndex(index);
    onIndexChange?.(index);
  }

  return (
    <div className={`flex flex-col ${className}`.trim()}>
      {/* Main image */}
      <div
        className="w-full overflow-hidden rounded-[4px] bg-[#f4f4f4]"
        style={{ aspectRatio: "4 / 5" }}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="mt-3 flex flex-row gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            aria-label={img.alt}
            onClick={() => handleSelect(i)}
            className="shrink-0 cursor-pointer overflow-hidden rounded-[2px] p-0"
            style={{
              width: 60,
              height: 75,
              border:
                i === activeIndex
                  ? "1px solid #111111"
                  : "1px solid #e8e8e1",
            }}
          >
            <img
              src={img.src}
              alt=""
              role="presentation"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
