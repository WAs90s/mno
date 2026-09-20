import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Continuous scroll progress for an element: 0 when its top hits the bottom of
 * the viewport, 1 when its bottom leaves the top of the viewport.
 */
export function useElementProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height + vh;
      const passed = vh - r.top;
      setProgress(Math.min(Math.max(passed / total, 0), 1));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}

/** Moves its children at a different speed than the page as you scroll. */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const { ref, progress } = useElementProgress<HTMLDivElement>();
  const shift = (progress - 0.5) * -2 * speed;
  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0,${shift}px,0)`, willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/**
 * Cashfree-style section entrance that keeps animating while you scroll:
 * the block lifts, scales and sharpens as it travels up the viewport.
 */
export function ScrollScene({
  children,
  className,
  lift = 70,
  scale = 0.94,
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
  tilt?: number;
}) {
  const { ref, progress } = useElementProgress<HTMLDivElement>();
  // 0 -> 1 across the first half of the travel, then settled.
  const t = Math.min(Math.max((progress - 0.1) / 0.35, 0), 1);
  const eased = 1 - Math.pow(1 - t, 3);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          opacity: 0.15 + eased * 0.85,
          filter: `blur(${(1 - eased) * 8}px)`,
          transform: `translate3d(0,${(1 - eased) * lift}px,0) scale(${scale + (1 - scale) * eased}) rotate(${(1 - eased) * tilt}deg)`,
          transition:
            "transform .35s cubic-bezier(.22,1,.36,1), opacity .35s ease-out, filter .35s ease-out",
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Thin progress bar pinned to the top of the page. */
export function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-transparent">
      <div
        className="h-full bg-pink"
        style={{ width: `${p * 100}%`, transition: "width .08s linear" }}
      />
    </div>
  );
}
