export function CategoryCard({
  image,
  title,
  href,
  caption,
  className = "",
}: {
  image: string;
  title: string;
  href: string;
  caption?: string;
  className?: string;
}) {
  return (
    <a href={href} className={`group relative aspect-[599/781] w-[min(82vw,599px)] shrink-0 overflow-hidden rounded-[2px] lg:w-[clamp(500px,31vw,599px)] ${className}`.trim()}>
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
      />
      {/* Grid overlay tint: #000 at 10% + bottom gradient for text legibility */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
      <div className="absolute inset-x-[16px] bottom-[16px] flex items-center justify-between gap-5 text-white">
        <div>
          {caption ? (
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[1.2px] text-white/78 transition-colors duration-300 group-hover:text-white">
              {caption}
            </p>
          ) : null}
          <h3 className="font-display text-[13px] font-semibold uppercase leading-none tracking-[1.5px] underline underline-offset-[3px] decoration-white/0 decoration-[1.5px] transition-all duration-300 group-hover:decoration-white/100">
            {title}
          </h3>
        </div>
        <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-white transition-colors group-hover:bg-white group-hover:text-black">
          <svg aria-hidden="true" viewBox="0 0 18 18" className="h-[14px] w-[14px]">
            <path d="M6.5 4.75 11 9l-4.5 4.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
    </a>
  );
}
