"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function AboutPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const monoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const frame = frameRef.current;
    const mono = monoRef.current;
    if (!container || !frame || !mono) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mono.style.opacity = "0";
      return;
    }

    let ticking = false;

    function update() {
      ticking = false;
      if (!container || !frame || !mono) return;

      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Parallax: image drifts toward the viewport center as the section scrolls by.
      const rectCenter = rect.top + rect.height / 2;
      const parallax = clamp((viewportH / 2 - rectCenter) * 0.08, -36, 36);
      frame.style.transform = `translate3d(0, ${parallax}px, 0)`;

      // Reveal: the monochrome layer fades out as the portrait scrolls into view,
      // uncovering the color photo underneath — a nod to Apple's scroll narratives.
      const revealed = clamp((viewportH - rect.top) / (viewportH * 0.75), 0, 1);
      mono.style.opacity = `${1 - revealed}`;
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[56vh] min-h-[380px] max-h-[680px] overflow-hidden sm:h-[72vh]"
    >
      <div
        ref={frameRef}
        className="absolute -inset-y-10 inset-x-0 will-change-transform"
      >
        <Image
          src="/profile.png"
          alt="Portrait of Irfandio Daffa Agustantio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_18%]"
        />
        <div ref={monoRef} className="absolute inset-0">
          <Image
            src="/profile.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover object-[50%_18%] grayscale contrast-[1.05]"
          />
        </div>
      </div>

      {/* Fade the portrait into the section background — only a thin solid
       * strip at the very bottom, so the headline overlaps real photo pixels
       * (softly tinted) rather than sitting on a flat gap. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full"
        style={{
          background:
            "linear-gradient(to top, var(--paper-alt) 0%, var(--paper-alt) 14%, transparent 60%)",
        }}
      />
    </div>
  );
}
