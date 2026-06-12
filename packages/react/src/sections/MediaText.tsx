export interface MediaTextProps {
  image: { src: string; alt: string };
  heading: string;
  body: string;
  cta?: { label: string; href: string };
  reverse?: boolean;
  className?: string;
}

export function MediaText({
  image,
  heading,
  body,
  cta,
  reverse = false,
  className = "",
}: MediaTextProps) {
  return (
    <section
      className={`flex min-h-[500px] flex-col md:flex-row ${reverse ? "md:flex-row-reverse flex-row-reverse" : ""} ${className}`.trim()}
    >
      <div className="w-full md:w-1/2">
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-center gap-4 p-12 md:w-1/2">
        <h2 className="font-['Raleway'] text-[24px] font-semibold uppercase tracking-[1.5px] text-[#111]">
          {heading}
        </h2>
        <p className="font-['Raleway'] text-[13px] font-normal leading-[1.6] text-[#555]">
          {body}
        </p>
        {cta ? (
          <a
            href={cta.href}
            className="inline-block w-fit border-b border-[#111] pb-0.5 font-['Raleway'] text-[9px] font-semibold uppercase tracking-[2.7px] text-[#111] transition-opacity hover:opacity-60"
          >
            {cta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
