import "server-only";
import { commitRepoFile, getRepoFile } from "@/lib/github-content";
import type { Experience, SkillGroup } from "@/lib/profile-data";

const CONTENT_PATH = "src/data/site-content.json";

export type SiteContent = {
  about: string[];
  contact: { email: string; linkedin: string };
  photo: { path: string; version: number };
  experience: Experience[];
  skillGroups: SkillGroup[];
};

/** Always reads the latest committed content from GitHub (source of truth),
 * not the version bundled into the running deployment. */
export async function readSiteContent(): Promise<SiteContent> {
  const file = await getRepoFile(CONTENT_PATH);
  if (!file) {
    throw new Error(`${CONTENT_PATH} was not found in the repository.`);
  }
  return JSON.parse(file.content) as SiteContent;
}

export async function updateSiteContent(
  partial: Partial<SiteContent>,
  message: string,
) {
  const current = await readSiteContent();
  const next: SiteContent = { ...current, ...partial };
  await commitRepoFile({
    path: CONTENT_PATH,
    content: `${JSON.stringify(next, null, 2)}\n`,
    message,
  });
  return next;
}

/** Commits a new profile photo binary and bumps the cache-busting version.
 * Note: if the file extension changes between uploads, the previous image
 * file is left in place unused rather than deleted. */
export async function updateProfilePhoto(base64Data: string, extension: string) {
  const current = await readSiteContent();
  const publicPath = `public/profile.${extension}`;
  const servedPath = `/profile.${extension}`;
  const nextVersion = (current.photo?.version ?? 0) + 1;

  await commitRepoFile({
    path: publicPath,
    content: base64Data,
    message: `Update profile photo (v${nextVersion})`,
    isBase64: true,
  });

  return updateSiteContent(
    { photo: { path: servedPath, version: nextVersion } },
    `Update photo reference (v${nextVersion})`,
  );
}
