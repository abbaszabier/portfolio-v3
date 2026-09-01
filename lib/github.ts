import { writeFile } from "fs/promises"
import path from "path"

const GITHUB_API = "https://api.github.com"

function getConfig() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || "main"

  if (!token || !owner || !repo) {
    throw new Error(
      "GITHUB_TOKEN, GITHUB_OWNER, dan GITHUB_REPO belum di-set di environment variables."
    )
  }

  return { token, owner, repo, branch }
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
}

/** Ambil isi file JSON dari repo GitHub beserta sha-nya (dibutuhkan untuk update). */
export async function readJsonFile<T>(path: string): Promise<{ data: T; sha: string }> {
  const { token, owner, repo, branch } = getConfig()

  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers: authHeaders(token), cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error(`Gagal membaca ${path} dari GitHub (${res.status})`)
  }

  const json = await res.json()
  const content = Buffer.from(json.content, "base64").toString("utf-8")

  return { data: JSON.parse(content) as T, sha: json.sha as string }
}

/** Commit perubahan file JSON ke repo GitHub. */
export async function writeJsonFile(
  path: string,
  data: unknown,
  sha: string,
  message: string
): Promise<void> {
  const { token, owner, repo, branch } = getConfig()

  const content = Buffer.from(JSON.stringify(data, null, 2) + "\n").toString("base64")

  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ message, content, sha, branch }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Gagal menyimpan ${path} ke GitHub (${res.status}): ${body}`)
  }
}

/**
 * Commit ke GitHub (source of truth untuk production), dan di local dev
 * sekaligus tulis ke disk supaya langsung terlihat lewat hot reload
 * tanpa menunggu Vercel redeploy.
 */
export async function commitJsonFile(
  filePath: string,
  data: unknown,
  sha: string,
  message: string
): Promise<void> {
  await writeJsonFile(filePath, data, sha, message)

  if (process.env.NODE_ENV === "development") {
    const absolutePath = path.join(process.cwd(), filePath)
    await writeFile(absolutePath, JSON.stringify(data, null, 2) + "\n", "utf-8")
  }
}
