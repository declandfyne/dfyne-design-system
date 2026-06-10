const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CrossSellCard({
  image,
  name,
  color,
  price,
  className = "",
}: {
  image: string;
  name: string;
  color: string;
  price: number;
  className?: string;
}) {
  return (
    <article className={`group flex shrink-0 flex-col gap-2 ${className}`.trim()}>
      <div className="relative aspect-[123/154] w-[123px] overflow-hidden rounded-[2px] bg-[#f4f4f4]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
        />
      </div>
      <div className="space-y-0">
        <h3 className="text-[11px] font-normal leading-[1.5] text-[#1c1d1d]">{name}</h3>
        <p className="text-[10px] font-normal tracking-[0.1em] text-black/65">{color}</p>
        <p className="pt-px text-[11px] font-semibold text-[#1c1d1d]">{currencyFormatter.format(price)}</p>
      </div>
    </article>
  );
}
