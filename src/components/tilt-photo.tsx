"use client";

import Image from "next/image";
import { useRef } from "react";

export default function TiltPhoto() {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  }

  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
      <div
        aria-hidden="true"
        className="animate-blob-float absolute -inset-6 rounded-full bg-gradient-to-br from-accent/25 via-accent/10 to-transparent blur-2xl"
      />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 300ms ease-out",
        }}
        className="relative h-full w-full overflow-hidden rounded-full border border-hairline bg-paper-alt shadow-[0_20px_45px_-20px_rgba(0,0,0,0.25)]"
      >
        <Image
          src="/profile.png"
          alt="Portrait of Irfandio Daffa Agustantio"
          fill
          priority
          sizes="192px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
