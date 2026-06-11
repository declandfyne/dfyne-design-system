export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[3px] ${className}`.trim()}>
      <p className="text-[10px] font-semibold uppercase tracking-[1.2px] leading-[15px] text-[#0a0a0a]">
        {eyebrow}
      </p>
      <h2 className="text-[14px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-[#0a0a0a]">
        {title}
      </h2>
    </div>
  );
}
