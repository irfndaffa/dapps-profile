"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const DURATION = 900;
const EXIT_DELAY = 200;
const EXIT_DURATION = 600;

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

export default function Preloader() {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf: number;
    let exitTimeout: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        exitTimeout = window.setTimeout(() => setExiting(true), EXIT_DELAY);
      }
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimeout);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!exiting) return;

    document.body.style.overflow = "";
    const timeout = window.setTimeout(() => setHidden(true), EXIT_DURATION);
    return () => window.clearTimeout(timeout);
  }, [exiting]);

  if (reducedMotion || hidden) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`preloader ${exiting ? "preloader-exit" : ""}`}
    >
      <div className="preloader-inner">
        <div className="preloader-mark" aria-hidden="true">
          ID
        </div>
        <div className="preloader-status">
          <div className="preloader-track">
            <div className="preloader-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="preloader-pct" aria-hidden="true">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
