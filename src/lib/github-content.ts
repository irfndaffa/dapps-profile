import "server-only";

const API_BASE = "https://api.github.com";
const DEFAULT_REPO = "irfndaffa/dapps-profile";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "GITHUB_TOKEN must be set (a GitHub personal access token with repo write access) to save admin changes.",
    );
  }
  const repo = process.env.GITHUB_REPO ?? DEFAULT_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  return { token, repo, branch };
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/** Fetches a repo file's current content (utf-8 decoded) and blob sha, or null if it doesn't exist yet. */
export async function getRepoFile(
  path: string,
): Promise<{ content: string; sha: string } | null> {
  const { token, repo, branch } = getConfig();
  const res = await fetch(
    `${API_BASE}/repos/${repo}/contents/${path}?ref=${branch}`,
    { headers: authHeaders(token), cache: "no-store" },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to read ${path} from GitHub (${res.status}).`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha as string };
}

/**
 * Creates or updates a file in the repo, triggering a redeploy on Vercel.
 * `content` may be a utf-8 string or already-base64-encoded binary data.
 */
export async function commitRepoFile(options: {
  path: string;
  content: string;
  message: string;
  isBase64?: boolean;
}) {
  const { token, repo, branch } = getConfig();
  const existing = await getRepoFile(options.path).catch(() => null);

  const base64Content = options.isBase64
    ? options.content
    : Buffer.from(options.content, "utf-8").toString("base64");

  const res = await fetch(`${API_BASE}/repos/${repo}/contents/${options.path}`, {
    method: "PUT",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: options.message,
      content: base64Content,
      branch,
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to commit ${options.path} to GitHub (${res.status}): ${body}`);
  }

  return res.json();
}
