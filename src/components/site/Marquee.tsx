type Props = {
  items: string[];
  fast?: boolean;
  reverse?: boolean;
};

export function Marquee({ items, fast, reverse }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1">
      <div
        className={`flex w-max items-center gap-4 ${fast ? "animate-marquee-fast" : "animate-marquee"}`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display shrink-0 rounded-full border-2 border-ink bg-card px-5 py-2 text-lg text-ink"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
