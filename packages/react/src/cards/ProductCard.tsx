/**
 * ProductCard — matches DFYNE live site (.grid-product)
 *
 * Verified from live computed styles:
 * Title:  Raleway 13px, weight 400, line-height 19.5px, tracking 0.325px
 * Vendor: Raleway 11.05px, weight 400, tracking 1.105px
 * Price:  sans-serif 11.05px, weight 400, tracking 0.325px, color #1c1d1d
 * Rating: sans-serif 11.05px, weight 400, tracking 0.325px, color #1c1d1d
 * Image:  portrait aspect, 4px radius, cover fill, hover scale 1.02
 */

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
    <article className={`group flex w-[197px] shrink-0 flex-col ${className}`.trim()}>
      <div className="relative overflow-hidden rounded-[4px] bg-[#f4f4f4]" style={{ aspectRatio: "4 / 5" }}>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
        />
        {badge ? (
          <span
            className={`absolute top-0 right-0 inline-flex items-center text-[11.05px] font-semibold leading-none tracking-[0.325px] ${
              badge.toLowerCase() === "sold out"
                ? "bg-white text-black"
                : badge.toLowerCase() === "sale"
                  ? "bg-[#1c1d1d] text-white"
                  : "bg-[#111111] text-white"
            }`}
            style={{ fontFamily: "Raleway, sans-serif", borderRadius: "0px 4px 0px 4px", padding: "7px 7px 7px 9px" }}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-[8px]">
        {/* Title: Raleway 13px, 400, lh 19.5px, ls 0.325px */}
        <h3
          className="text-[13px] font-normal leading-[19.5px] tracking-[0.325px] text-black"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {name}
        </h3>
        {/* Vendor/Color: Raleway 11.05px, 400, ls 1.105px */}
        <p
          className="text-[11.05px] font-normal leading-[16.575px] tracking-[1.105px] text-black"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {color}
        </p>
        {/* Price: sans-serif 11.05px, 400, ls 0.325px, #1c1d1d */}
        <p
          className="text-[11.05px] font-normal leading-[16.575px] tracking-[0.325px] text-[#1c1d1d]"
          style={{ fontFamily: "sans-serif" }}
        >
          {currencyFormatter.format(price)}
        </p>
        {/* Rating: same as price styling */}
        <div className="mt-[2px] flex items-center gap-[4px]">
          <span
            className="text-[11.05px] font-normal leading-[15.47px] tracking-[0.325px] text-[#1c1d1d]"
            aria-label={`Average rating ${rating.toFixed(1)} out of 5`}
          >
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
