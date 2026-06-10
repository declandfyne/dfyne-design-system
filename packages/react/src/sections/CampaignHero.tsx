export function CampaignHero({
  image,
  desktopImage,
  caption,
  heading,
  cta,
  secondaryCta,
  className = "",
}: {
  image: string;
  desktopImage?: string;
  caption: string;
  heading: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section className={`relative h-[70svh] min-h-[520px] overflow-hidden sm:h-[74svh] lg:h-[78svh] xl:h-[80svh] ${className}`.trim()}>
      <img
        src={desktopImage ?? image}
        alt={heading}
        className="hidden h-full w-full object-cover lg:block"
      />
      <img
        src={image}
        alt={heading}
        className="h-full w-full object-cover lg:hidden"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[180px] bg-gradient-to-b from-black/55 via-black/24 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-10 w-full">
        <div className="flex flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-2 px-4 lg:px-10">
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-white">
              {caption}
            </p>
            <h1 className="max-w-[9ch] text-[34px] font-medium uppercase leading-[0.9] tracking-[0.035em] text-white sm:text-[46px] lg:text-[70px] xl:text-[84px]">
              {heading}
            </h1>
          </div>
          <div className="flex w-full items-center gap-3 px-4 lg:px-10">
            <a
              href={cta.href}
              className="inline-flex h-[38px] items-center justify-center rounded-full border border-white/35 bg-white px-5 text-[10px] font-bold uppercase tracking-[1.5px] text-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              {cta.label}
            </a>
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                className="inline-flex h-[38px] items-center justify-center rounded-full border border-white px-5 text-[10px] font-bold uppercase tracking-[1.5px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-black"
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
