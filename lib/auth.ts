import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

const SESSION_COOKIE = "admin_session"

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error("SESSION_SECRET belum di-set di environment variables.")
  }
  return secret
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    throw new Error("ADMIN_PASSWORD belum di-set di environment variables.")
  }
  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function createSession() {
  const token = sign("admin")
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
  })
}

export async function destroySession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function isAuthenticated() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return false
  return token === sign("admin")
}
