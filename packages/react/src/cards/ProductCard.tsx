const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({
  image,
  name,
  color,
  price,
  rating,
  reviewCount,
  badge,
  className = "",
}: {
  image: string;
  name: string;
  color: string;
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  className?: string;
}) {
  const reviewLabel = `★ ${rating.toFixed(1)}`;

  return (
    <article className={`group flex w-[calc((100vw-16px)/1.75)] shrink-0 flex-col gap-[10px] sm:w-[calc((100vw-16px)/1.5)] md:w-[calc((100vw-32px)/3)] lg:w-[min(393.38px,calc((100vw-48px)/5))] ${className}`.trim()}>
      <div className="relative aspect-[393.38/491.72] overflow-hidden rounded-[4px] bg-[#f4f4f4]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
        />
        {badge ? (
          <span className="absolute top-0 right-0 inline-flex h-[29px] items-center rounded-bl-[4px] bg-black px-[7px] text-[8.5px] font-semibold leading-none text-white lg:px-[9px] lg:text-[11px]">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-0 px-[4px]">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 text-[13px] font-normal leading-[1.5] text-[#1c1d1d]">{name}</h3>
          <p className="shrink-0 whitespace-nowrap pt-[2px] font-sans text-[11px] font-normal leading-[1.3] text-black/75" aria-label={`Average rating ${rating.toFixed(1)} out of 5`}>
            {reviewLabel}
          </p>
        </div>
        <p className="text-[11px] font-normal tracking-[0.1em] text-black/65">{color}</p>
        <p className="pt-px font-sans text-[11px] font-semibold text-[#1c1d1d]">{currencyFormatter.format(price)}</p>
      </div>
    </article>
  );
}
