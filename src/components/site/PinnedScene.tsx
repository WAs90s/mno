import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Progress of a tall wrapper while it is pinned: 0 when its top reaches the
 * top of the viewport, 1 when its bottom reaches the bottom of the viewport.
 * This is the Apple product-page timing model (scroll drives the animation).
 */
function usePinProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smoothly chase the scroll value so the motion glides instead of snapping.
    let target = 0;
    let current = 0;
    let smoothRaf = 0;
    const measureTarget = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(r.height - vh, 1);
      target = Math.min(Math.max(-r.top / total, 0), 1);
    };
    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0004) current = target;
      setProgress(current);
      smoothRaf = requestAnimationFrame(tick);
    };
    measureTarget();
    current = target;
    tick();
    const onSmooth = () => measureTarget();
    window.addEventListener("scroll", onSmooth, { passive: true });
    window.addEventListener("resize", onSmooth);
    return () => {
      window.removeEventListener("scroll", onSmooth);
      window.removeEventListener("resize", onSmooth);
      cancelAnimationFrame(smoothRaf);
    };
  }, []);

  return { ref, progress };
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/**
 * Apple-style pinned scene: the wrapper is `height` viewports tall, the inner
 * stage sticks to the screen and its children are driven by scroll progress.
 */
export function PinnedScene({
  children,
  heightVh = 300,
  className,
}: {
  children: (p: number) => ReactNode;
  heightVh?: number;
  className?: string;
}) {
  const { ref, progress } = usePinProgress<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}

/** Image that scales up and sharpens as you scroll through the pinned scene. */
export function ScrollZoom({
  src,
  alt,
  p,
  from = 0.62,
  to = 1.08,
  start = 0,
  end = 0.85,
}: {
  src: string;
  alt: string;
  p: number;
  from?: number;
  to?: number;
  start?: number;
  end?: number;
}) {
  const t = range(p, start, end);
  const eased = 1 - Math.pow(1 - t, 2);
  const scale = from + (to - from) * eased;
  return (
    <div
      className="pop-card overflow-hidden p-2"
      style={{
        transform: `scale(${scale})`,
        borderRadius: `${28 - eased * 12}px`,
        willChange: "transform",
      }}
    >
      <img src={src} alt={alt} className="w-full max-w-3xl rounded-2xl" loading="lazy" />
    </div>
  );
}

/**
 * Big statement that reveals word by word as you scroll, the way Apple's
 * product copy lights up while pinned.
 */
export function ScrollWords({
  words,
  p,
  start = 0.05,
  end = 0.8,
  className,
}: {
  words: { text: string; color?: string }[];
  p: number;
  start?: number;
  end?: number;
  className?: string;
}) {
  const t = range(p, start, end);
  return (
    <span className={className}>
      {words.map((w, i) => {
        const at = i / words.length;
        const local = clamp((t - at) / (1 / words.length));
        return (
          <span key={`${w.text}-${i}`} className="inline-block pt-[0.12em] pb-[0.22em] align-bottom">
            <span
              className={`${w.color ?? ""} mr-[0.25em] inline-block`}
              style={{
                opacity: local,
                transform: `translateY(${(1 - local) * 30}%)`,
                filter: `blur(${(1 - local) * 5}px)`,
              }}
            >
              {w.text}
            </span>
          </span>
        );
      })}
    </span>
  );
}
