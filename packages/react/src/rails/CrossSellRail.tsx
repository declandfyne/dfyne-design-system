import { CrossSellCard } from "../cards/CrossSellCard";

type CrossSellProduct = {
  image: string;
  name: string;
  color: string;
  price: number;
};

export function CrossSellRail({
  title,
  products,
  className = "",
}: {
  title: string;
  products: CrossSellProduct[];
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="flex flex-col gap-4">
        <h3 className="px-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-black md:px-6">
          {title}
        </h3>
        <div data-rail className="no-scrollbar overflow-x-auto px-2 md:px-6">
          <div className="flex gap-3">
            {products.map((product, i) => (
              <CrossSellCard key={`${product.name}-${i}`} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
