"use client";

import { useState, useTransition } from "react";
import type { SiteContent } from "@/lib/site-content-store";
import type {
  Experience,
  Skill,
  SkillGroup,
  SkillIcon,
} from "@/lib/profile-data";
import { skillIconMap } from "@/lib/skill-icons";
import {
  saveExperienceAction,
  saveSkillGroupsAction,
  updateAboutAction,
  updateContactAction,
  uploadPhotoAction,
} from "./actions";

const TABS = ["about", "experience", "skills", "contact", "photo"] as const;
type Tab = (typeof TABS)[number];

const SKILL_ICON_KEYS = Object.keys(skillIconMap) as SkillIcon[];

const inputClass =
  "w-full rounded-xl border border-hairline bg-paper px-3.5 py-2 text-sm text-ink outline-none transition-colors duration-200 focus:border-accent";
const saveButtonClass =
  "rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-[background-color,opacity] duration-200 hover:bg-accent-hover disabled:opacity-60";
const ghostButtonClass = "text-xs font-medium text-accent";

type SaveStatus = { type: "idle" | "success" | "error"; message?: string };

function useSaveStatus() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<SaveStatus>({ type: "idle" });

  function run(action: () => Promise<void>) {
    setStatus({ type: "idle" });
    startTransition(async () => {
      try {
        await action();
        setStatus({
          type: "success",
          message: "Saved. The live site will redeploy in about a minute.",
        });
      } catch (err) {
        setStatus({
          type: "error",
          message: err instanceof Error ? err.message : "Something went wrong.",
        });
      }
    });
  }

  return { isPending, status, run };
}

function StatusBanner({ status }: { status: SaveStatus }) {
  if (status.type === "idle") return null;
  return (
    <p
      role="status"
      className={`mt-3 text-sm ${status.type === "error" ? "text-red-600" : "text-accent"}`}
    >
      {status.message}
    </p>
  );
}

export default function AdminDashboard({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [tab, setTab] = useState<Tab>("about");

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-hairline pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors duration-200 ${
              tab === t
                ? "bg-accent text-white"
                : "bg-paper-alt text-ink-soft hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "about" && <AboutEditor initial={initialContent.about} />}
        {tab === "experience" && (
          <ExperienceEditor initial={initialContent.experience} />
        )}
        {tab === "skills" && (
          <SkillsEditor initial={initialContent.skillGroups} />
        )}
        {tab === "contact" && (
          <ContactEditor initial={initialContent.contact} />
        )}
        {tab === "photo" && <PhotoEditor initial={initialContent.photo} />}
      </div>
    </div>
  );
}

function AboutEditor({ initial }: { initial: string[] }) {
  const [paragraphs, setParagraphs] = useState(initial);
  const { isPending, status, run } = useSaveStatus();

  function updateParagraph(index: number, value: string) {
    setParagraphs((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">About me</h2>
      <div className="mt-4 space-y-4">
        {paragraphs.map((paragraph, i) => (
          <div key={i}>
            <textarea
              value={paragraph}
              onChange={(e) => updateParagraph(i, e.target.value)}
              rows={4}
              className={`${inputClass} rounded-2xl leading-relaxed`}
            />
            <button
              type="button"
              onClick={() =>
                setParagraphs((prev) => prev.filter((_, pi) => pi !== i))
              }
              className="mt-1 text-xs text-ink-soft transition-colors duration-200 hover:text-red-600"
            >
              Remove paragraph
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setParagraphs((prev) => [...prev, ""])}
        className={`mt-2 ${ghostButtonClass}`}
      >
        + Add paragraph
      </button>

      <div className="mt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={() => run(() => updateAboutAction(paragraphs))}
          className={saveButtonClass}
        >
          {isPending ? "Saving…" : "Save about"}
        </button>
        <StatusBanner status={status} />
      </div>
    </div>
  );
}

function emptyExperience(): Experience {
  return { role: "", company: "", period: "", highlights: [] };
}

function ExperienceEditor({ initial }: { initial: Experience[] }) {
  const [jobs, setJobs] = useState<Experience[]>(initial);
  const { isPending, status, run } = useSaveStatus();

  function updateJob(index: number, patch: Partial<Experience>) {
    setJobs((prev) =>
      prev.map((job, i) => (i === index ? { ...job, ...patch } : job)),
    );
  }

  function updateHighlight(jobIndex: number, hIndex: number, value: string) {
    setJobs((prev) =>
      prev.map((job, i) =>
        i === jobIndex
          ? {
              ...job,
              highlights: job.highlights.map((h, hi) =>
                hi === hIndex ? value : h,
              ),
            }
          : job,
      ),
    );
  }

  function moveJob(index: number, direction: -1 | 1) {
    setJobs((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          Work experience
        </h2>
        <button
          type="button"
          onClick={() => setJobs((prev) => [emptyExperience(), ...prev])}
          className={ghostButtonClass}
        >
          + Add role
        </button>
      </div>

      <div className="mt-4 space-y-6">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="rounded-2xl border border-hairline bg-paper p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Role"
                value={job.role}
                onChange={(e) => updateJob(i, { role: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Company"
                value={job.company}
                onChange={(e) => updateJob(i, { company: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Client (optional)"
                value={job.client ?? ""}
                onChange={(e) => updateJob(i, { client: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Period, e.g. Jan 2024 — Present"
                value={job.period}
                onChange={(e) => updateJob(i, { period: e.target.value })}
                className={inputClass}
              />
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={!!job.current}
                onChange={(e) => updateJob(i, { current: e.target.checked })}
              />
              Current role
            </label>

            <div className="mt-4">
              <p className="text-xs font-medium text-ink-soft">Highlights</p>
              <div className="mt-2 space-y-2">
                {job.highlights.map((highlight, hi) => (
                  <div key={hi} className="flex items-center gap-2">
                    <input
                      value={highlight}
                      onChange={(e) => updateHighlight(i, hi, e.target.value)}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateJob(i, {
                          highlights: job.highlights.filter((_, x) => x !== hi),
                        })
                      }
                      className="text-xs text-ink-soft transition-colors duration-200 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  updateJob(i, { highlights: [...job.highlights, ""] })
                }
                className={`mt-2 ${ghostButtonClass}`}
              >
                + Add highlight
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-hairline pt-3 text-xs text-ink-soft">
              <button
                type="button"
                onClick={() => moveJob(i, -1)}
                className="transition-colors duration-200 hover:text-ink"
              >
                ↑ Move up
              </button>
              <button
                type="button"
                onClick={() => moveJob(i, 1)}
                className="transition-colors duration-200 hover:text-ink"
              >
                ↓ Move down
              </button>
              <button
                type="button"
                onClick={() =>
                  setJobs((prev) => prev.filter((_, x) => x !== i))
                }
                className="ml-auto text-red-600 transition-colors duration-200 hover:text-red-700"
              >
                Delete role
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={() => run(() => saveExperienceAction(jobs))}
          className={saveButtonClass}
        >
          {isPending ? "Saving…" : "Save experience"}
        </button>
        <StatusBanner status={status} />
      </div>
    </div>
  );
}

function emptySkillGroup(): SkillGroup {
  return { title: "", note: "", items: [] };
}

function SkillsEditor({ initial }: { initial: SkillGroup[] }) {
  const [groups, setGroups] = useState<SkillGroup[]>(initial);
  const { isPending, status, run } = useSaveStatus();

  function updateGroup(index: number, patch: Partial<SkillGroup>) {
    setGroups((prev) =>
      prev.map((g, i) => (i === index ? { ...g, ...patch } : g)),
    );
  }

  function updateItem(
    groupIndex: number,
    itemIndex: number,
    patch: Partial<Skill>,
  ) {
    setGroups((prev) =>
      prev.map((g, i) =>
        i === groupIndex
          ? {
              ...g,
              items: g.items.map((item, ii) =>
                ii === itemIndex ? { ...item, ...patch } : item,
              ),
            }
          : g,
      ),
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
        <button
          type="button"
          onClick={() => setGroups((prev) => [...prev, emptySkillGroup()])}
          className={ghostButtonClass}
        >
          + Add group
        </button>
      </div>

      <div className="mt-4 space-y-6">
        {groups.map((group, gi) => (
          <div
            key={gi}
            className="rounded-2xl border border-hairline bg-paper p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Group title"
                value={group.title}
                onChange={(e) => updateGroup(gi, { title: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Note"
                value={group.note}
                onChange={(e) => updateGroup(gi, { note: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="mt-4 space-y-2">
              {group.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-2">
                  <input
                    placeholder="Skill name"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(gi, ii, { name: e.target.value })
                    }
                    className={inputClass}
                  />
                  <select
                    value={item.icon}
                    onChange={(e) =>
                      updateItem(gi, ii, { icon: e.target.value as SkillIcon })
                    }
                    className={inputClass}
                  >
                    {SKILL_ICON_KEYS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      updateGroup(gi, {
                        items: group.items.filter((_, x) => x !== ii),
                      })
                    }
                    className="text-xs text-ink-soft transition-colors duration-200 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                updateGroup(gi, {
                  items: [
                    ...group.items,
                    { name: "", icon: SKILL_ICON_KEYS[0] },
                  ],
                })
              }
              className={`mt-2 ${ghostButtonClass}`}
            >
              + Add skill
            </button>

            <div className="mt-4 border-t border-hairline pt-3 text-right">
              <button
                type="button"
                onClick={() =>
                  setGroups((prev) => prev.filter((_, x) => x !== gi))
                }
                className="text-xs text-red-600 transition-colors duration-200 hover:text-red-700"
              >
                Delete group
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={() => run(() => saveSkillGroupsAction(groups))}
          className={saveButtonClass}
        >
          {isPending ? "Saving…" : "Save skills"}
        </button>
        <StatusBanner status={status} />
      </div>
    </div>
  );
}

function ContactEditor({
  initial,
}: {
  initial: { email: string; linkedin: string };
}) {
  const [contact, setContact] = useState(initial);
  const { isPending, status, run } = useSaveStatus();

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Contact info</h2>
      <div className="mt-4 space-y-3">
        <input
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
          className={inputClass}
        />
        <input
          placeholder="LinkedIn URL"
          value={contact.linkedin}
          onChange={(e) =>
            setContact((c) => ({ ...c, linkedin: e.target.value }))
          }
          className={inputClass}
        />
      </div>
      <div className="mt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={() => run(() => updateContactAction(contact))}
          className={saveButtonClass}
        >
          {isPending ? "Saving…" : "Save contact"}
        </button>
        <StatusBanner status={status} />
      </div>
    </div>
  );
}

function PhotoEditor({
  initial,
}: {
  initial: { path: string; version: number };
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isPending, status, run } = useSaveStatus();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  }

  function handleUpload() {
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    run(() => uploadPhotoAction(formData));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Profile photo</h2>
      <div className="mt-4 flex items-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element -- admin-only preview of a local blob/versioned path, not part of the optimized public site */}
        <img
          src={preview ?? `${initial.path}?v=${initial.version}`}
          alt="Current profile"
          className="h-24 w-24 rounded-2xl border border-hairline object-cover"
        />
        <div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="text-sm"
          />
          <p className="mt-1 text-xs text-ink-soft">
            PNG, JPEG, or WebP. Max 5MB.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          disabled={isPending || !file}
          onClick={handleUpload}
          className={saveButtonClass}
        >
          {isPending ? "Uploading…" : "Upload photo"}
        </button>
        <StatusBanner status={status} />
      </div>
    </div>
  );
}
