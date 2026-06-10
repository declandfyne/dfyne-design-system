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
      <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-black">
        {eyebrow}
      </p>
      <h2 className="text-[14px] font-semibold uppercase tracking-[1.5px] text-black">
        {title}
      </h2>
    </div>
  );
}
