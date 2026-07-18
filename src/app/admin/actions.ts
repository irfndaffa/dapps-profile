"use server";

import { redirect } from "next/navigation";
import { destroyAdminSession, requireAdmin } from "@/lib/admin-auth";
import {
  updateProfilePhoto,
  updateSiteContent,
  type SiteContent,
} from "@/lib/site-content-store";
import type { Experience, SkillGroup } from "@/lib/profile-data";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_PHOTO_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function logoutAction() {
  await requireAdmin();
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function updateAboutAction(paragraphs: string[]) {
  await requireAdmin();
  const cleaned = paragraphs.map((p) => p.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    throw new Error("About needs at least one paragraph.");
  }
  await updateSiteContent({ about: cleaned }, "Update about section");
}

export async function updateContactAction(contact: SiteContent["contact"]) {
  await requireAdmin();
  const email = contact.email.trim();
  const linkedin = contact.linkedin.trim();
  if (!email || !linkedin) {
    throw new Error("Email and LinkedIn URL are required.");
  }
  await updateSiteContent(
    { contact: { email, linkedin } },
    "Update contact info",
  );
}

export async function saveExperienceAction(list: Experience[]) {
  await requireAdmin();
  const cleaned = list
    .map((job) => ({
      ...job,
      role: job.role.trim(),
      company: job.company.trim(),
      period: job.period.trim(),
      highlights: job.highlights.map((h) => h.trim()).filter(Boolean),
    }))
    .filter((job) => job.role && job.company && job.period);

  await updateSiteContent({ experience: cleaned }, "Update work experience");
}

export async function saveSkillGroupsAction(list: SkillGroup[]) {
  await requireAdmin();
  const cleaned = list
    .map((group) => ({
      ...group,
      title: group.title.trim(),
      note: group.note.trim(),
      items: group.items
        .map((item) => ({ ...item, name: item.name.trim() }))
        .filter((item) => item.name),
    }))
    .filter((group) => group.title && group.items.length > 0);

  await updateSiteContent({ skillGroups: cleaned }, "Update skills");
}

export async function uploadPhotoAction(formData: FormData) {
  await requireAdmin();

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose an image file to upload.");
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error("Image must be smaller than 5MB.");
  }
  const extension = ALLOWED_PHOTO_TYPES[file.type];
  if (!extension) {
    throw new Error("Only PNG, JPEG, or WebP images are supported.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await updateProfilePhoto(buffer.toString("base64"), extension);
}
