"use server"

import { Resend } from "resend"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/locales"

const TO_EMAIL = "abbas.zabier06@gmail.com"

export type ContactState = { error?: string; success?: boolean } | undefined

export async function sendContactMessage(
  locale: Locale,
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const dict = getDictionary(locale).contact

  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !email || !message) {
    return { error: dict.errorRequired }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { error: dict.errorNoApiKey }
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Pesan baru dari ${name} lewat portfolio`,
      text: `Nama: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      return { error: error.message }
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : dict.errorGeneric }
  }

  return { success: true }
}
