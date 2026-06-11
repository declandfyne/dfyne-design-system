const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
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
  return (
    <article className={`group flex shrink-0 flex-col ${className}`.trim()}>
      <div className="relative overflow-hidden bg-[#f4f4f4]" style={{ aspectRatio: "224 / 368" }}>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
        />
        {badge ? (
          <span className="absolute top-0 right-0 inline-flex items-center bg-[#111111] px-[7px] py-[7px] pl-[9px] text-[11.05px] font-semibold leading-none text-white" style={{ borderRadius: "0px 4px" }}>
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-[8px]">
        <h3 className="font-[Raleway,sans-serif] text-[13px] font-normal leading-[19.5px] tracking-[0.325px] text-black">{name}</h3>
        <p className="font-[Raleway,sans-serif] text-[11.05px] font-normal leading-[16.575px] tracking-[1.105px] text-black">{color}</p>
        <p className="font-sans text-[11.05px] font-normal leading-[16.575px] tracking-[0.325px] text-[#1c1d1d]">{currencyFormatter.format(price)}</p>
        <div className="mt-[2px] flex items-center gap-[4px]">
          <span className="text-[11.05px] font-normal leading-[15.47px] tracking-[0.325px] text-[#1c1d1d]" aria-label={`Average rating ${rating.toFixed(1)} out of 5`}>
            {"★".repeat(Math.round(rating))}
          </span>
          <span className="text-[11.05px] font-normal leading-[15.47px] tracking-[0.325px] text-[#1c1d1d]">
            ({reviewCount.toLocaleString()})
          </span>
        </div>
      </div>
    </article>
  );
}
