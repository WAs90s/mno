import { useEffect, useRef, useState, type ReactNode } from "react";

function useInView<T extends HTMLElement>(amount = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return { ref, inView };
}

type Direction = "up" | "down" | "left" | "right" | "scale";

const hidden: Record<Direction, string> = {
  up: "translate3d(0,56px,0) scale(.97)",
  down: "translate3d(0,-40px,0) scale(.97)",
  left: "translate3d(-64px,0,0) scale(.97)",
  right: "translate3d(64px,0,0) scale(.97)",
  scale: "scale(.9)",
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
};

export function Reveal({ children, delay = 0, className, direction = "up" }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(6px)",
        transform: inView ? "translate3d(0,0,0) scale(1)" : hidden[direction],
        transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s, filter .8s ease ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/** Reveals its children line by line as it scrolls into view. */
export function RevealGroup({
  children,
  stagger = 0.1,
  className,
  direction = "up",
}: {
  children: ReactNode[];
  stagger?: number;
  className?: string;
  direction?: Direction;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} direction={direction}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

export function RevealWords({ words }: { words: { text: string; color?: string }[] }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.05);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(t);
  }, []);
  const shown = ready && inView;

  return (
    <span
      ref={ref}
      className="inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 align-top"
    >
      {words.map((w, i) => (
        <span key={`${w.text}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
          <span
            className={w.color}
            style={{
              display: "inline-block",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0) rotate(0deg)" : "translateY(105%) rotate(-5deg)",
              transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${i * 0.09}s, transform .8s cubic-bezier(.16,1,.3,1) ${i * 0.09}s`,
            }}
          >
            {w.text}
          </span>
        </span>
      ))}
    </span>
  );
}
