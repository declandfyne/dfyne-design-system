const icons = {
  check: { viewBox: "0 0 12 12", d: "M2.5 6.2 5 8.7 9.5 3.8", fill: false },
  star: { viewBox: "0 0 10 10", d: "M5 0.5 6.18 3l2.82.31-2.08 1.93.55 2.76L5 6.62 2.53 8l.55-2.76L1 3.31 3.82 3 5 .5Z", fill: true },
  menu: { viewBox: "0 0 24 24", d: "M4 7h16M4 12h16M4 17h16", fill: false },
  user: { viewBox: "0 0 28 28", d: "M14 5.25a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5ZM6.5 22c1.7-3.55 4.28-5.32 7.5-5.32S19.8 18.45 21.5 22", fill: false },
  search: { viewBox: "0 0 28 28", d: "M12.5 5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15ZM18.5 18.5 24 24", fill: false },
  cart: { viewBox: "0 0 28 28", d: "M8 4 5 8v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8l-3-4ZM5 8h18M18 12a4 4 0 0 1-8 0", fill: false },
  "arrow-left": { viewBox: "0 0 18 18", d: "M11 4.5 6.3 8.7a.4.4 0 0 0 0 .6L11 13.5", fill: false },
  "arrow-right": { viewBox: "0 0 18 18", d: "M7 4.5l4.7 4.2a.4.4 0 0 1 0 .6L7 13.5", fill: false },
  "chevron-right": { viewBox: "0 0 18 18", d: "M6.5 4.75 11 9l-4.5 4.25", fill: false },
  "chevron-down": { viewBox: "0 0 16 16", d: "M4 6l4 4 4-4", fill: false },
  close: { viewBox: "0 0 28 28", d: "M8 8l12 12M20 8 8 20", fill: false },
  pause: { viewBox: "0 0 16 16", d: "M5.5 3.5v9M10.5 3.5v9", fill: false },
  play: { viewBox: "0 0 16 16", d: "M4.5 2.5 12.5 8l-8 5.5Z", fill: true },
  support: { viewBox: "0 0 16 16", d: "M4 8a4 4 0 0 1 8 0v1a3 3 0 0 1-3 3H8M4 9v2M12 9v2", fill: false },
  mail: { viewBox: "0 0 16 16", d: "M2 4h12v8H2zM2 4l6 5 6-5", fill: false },
  package: { viewBox: "0 0 16 16", d: "M2 5l6-3 6 3v6l-6 3-6-3zM2 5l6 3M8 8v6M14 5l-6 3", fill: false },
  reward: { viewBox: "0 0 16 16", d: "M8 1l2 4 4.5.6-3.3 3 .8 4.4L8 11l-4 2 .8-4.4L1.5 5.6 6 5Z", fill: false },
  calendar: { viewBox: "0 0 16 16", d: "M3 3h10v10H3zM5 1v4M11 1v4M3 7h10", fill: false },
  instagram: { viewBox: "0 0 24 24", d: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm5.5-1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z", fill: false },
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const icon = icons[name];

  return (
    <svg aria-hidden="true" viewBox={icon.viewBox} className={className}>
      <path
        d={icon.d}
        fill={icon.fill ? "currentColor" : "none"}
        stroke={icon.fill ? undefined : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={icon.fill ? undefined : "1.3"}
      />
    </svg>
  );
}
