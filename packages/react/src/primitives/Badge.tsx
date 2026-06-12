/**
 * Badge — matches DFYNE live site (.grid-product__tag)
 *
 * From theme.css.liquid:
 * Mobile:  font-size calc(base*0.65) ~8.45px, padding 6px 5px 6px 7px
 * Desktop: font-size calc(base*0.85) ~11.05px, padding 7px 7px 7px 9px
 * Weight 600, line-height 1, position absolute top-right
 * border-radius: 0 var(--productTileRadius) 0 var(--productTileRadius) = 0 4px 0 4px
 *
 * Variants (from codebase):
 *   custom   — "NEW", metafield labels: bg #111 (--colorBtnPrimary), white text
 *   sold-out — "Sold Out": bg #fff (--colorBody), black text (--colorTextBody)
 *   sale     — "Sale": bg #1c1d1d (--colorSaleTag), white text
 *   bottom   — bottom-left label from metafield: bg #fff, black, 9px/11px, weight 400
 */
export function Badge({
  text,
  variant = "custom",
  position = "top-right",
  className = "",
}: {
  text: string;
  variant?: "custom" | "sold-out" | "sale" | "bottom";
  position?: "top-right" | "bottom-left" | "inline";
  className?: string;
}) {
  const variantClasses =
    variant === "sold-out"
      ? "bg-white text-black"
      : variant === "sale"
        ? "bg-[#1c1d1d] text-white"
        : variant === "bottom"
          ? "bg-white text-black"
          : "bg-[#111111] text-white";

  const positionClasses =
    position === "top-right"
      ? "absolute top-0 right-0"
      : position === "bottom-left"
        ? "absolute bottom-0 left-0"
        : "";

  const isBottom = variant === "bottom";

  return (
    <span
      className={`inline-flex items-center text-[11.05px] leading-none ${
        isBottom ? "font-normal tracking-[0.3px]" : "font-semibold tracking-[0.325px]"
      } ${variantClasses} ${positionClasses} ${className}`.trim()}
      style={{
        fontFamily: "Raleway, sans-serif",
        borderRadius: "0px 4px 0px 4px",
        padding: isBottom ? "8px 7px" : "7px 7px 7px 9px",
      }}
    >
      {text}
    </span>
  );
}
