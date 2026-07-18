"use client";

import { useId, useState } from "react";
import type { Experience } from "@/lib/profile-data";

export default function ExperienceAccordion({ job }: { job: Experience }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <article className="border-t border-hairline py-8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="grid w-full cursor-pointer gap-3 text-left md:grid-cols-[13rem_1fr] md:gap-10"
      >
        <div>
          <p className="text-sm font-medium text-ink-soft">{job.period}</p>
          {job.current && (
            <p className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              Current
            </p>
          )}
        </div>
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{job.role}</h3>
            <p className="mt-1 text-sm text-ink-soft">
              {job.company}
              {job.client ? ` · Client: ${job.client}` : ""}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-ink-soft transition-transform duration-300 ease-out"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            +
          </span>
        </div>
      </button>

      <div
        id={contentId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden md:pl-[calc(13rem+2.5rem)]">
          <ul className="mt-5 space-y-2.5 pb-1">
            {job.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-soft/60"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
