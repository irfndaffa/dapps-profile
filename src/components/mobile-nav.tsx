"use client";

import { useState } from "react";

type NavLink = { href: string; label: string };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative flex h-8 w-8 items-center justify-center"
      >
        <span
          aria-hidden="true"
          className="absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ease-out"
          style={{
            transform: open
              ? "translateY(0) rotate(45deg)"
              : "translateY(-3px) rotate(0deg)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute h-[1.5px] w-4 bg-ink transition-transform duration-300 ease-out"
          style={{
            transform: open
              ? "translateY(0) rotate(-45deg)"
              : "translateY(3px) rotate(0deg)",
          }}
        />
      </button>

      <div
        id="mobile-nav-panel"
        className="absolute inset-x-0 top-12 grid border-b border-hairline bg-paper/95 backdrop-blur-xl backdrop-saturate-150 transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <ul className="flex flex-col px-5 sm:px-8">
            {links.map((link) => (
              <li
                key={link.href}
                className="border-b border-hairline last:border-b-0"
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
