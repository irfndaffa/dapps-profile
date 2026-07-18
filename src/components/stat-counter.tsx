"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const isDecimal = value.includes(".");

  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            if (prefersReducedMotion) {
              setDisplay(target);
              return;
            }
            const duration = 900;
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - (1 - progress) ** 3;
              setDisplay(target * eased);
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplay(target);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="text-center">
      <p
        ref={ref}
        className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {isDecimal ? display.toFixed(1) : Math.round(display)}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-ink-soft sm:text-sm">{label}</p>
    </div>
  );
}
