type FooterColumn = {
  heading: string;
  links: string[];
};

export function Footer({
  columns,
  className = "",
}: {
  columns: FooterColumn[];
  className?: string;
}) {
  return (
    <footer className={`border-t border-[#e8e8e1] bg-white px-4 py-12 sm:px-6 lg:px-0 lg:pt-[61px] lg:pb-[60px] ${className}`.trim()}>
      <div className="mx-auto grid max-w-[1442px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:justify-center lg:gap-0">
        {columns.map((column) => (
          <div key={column.heading} className="px-0 lg:px-[22px]">
            <h3 className="text-[10px] font-semibold uppercase tracking-[1.5px]">{column.heading}</h3>
            <ul className="mt-[34px] space-y-[14px] text-[11.05px]">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
