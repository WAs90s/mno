import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  initialVisible?: boolean;
};

export function ScrollSection({
  id,
  className,
  children,
  initialVisible = false,
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(initialVisible);

  useEffect(() => {
    if (initialVisible) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [initialVisible]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        className,
      )}
    >
      {children}
    </section>
  );
}
