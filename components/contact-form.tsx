"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const WA_PHONE = "6285715731493";

export function ContactForm({ dict }: { dict: Dictionary["contact"] }) {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) return;

    setSending(true);

    const text = [`Halo, saya ${name}`, `Email: ${email}`, "", message].join(
      "\n",
    );

    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");

    setSending(false);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">{dict.formName}</Label>
        <Input
          id="name"
          name="name"
          placeholder={dict.formNamePlaceholder}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{dict.formEmail}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={dict.formEmailPlaceholder}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">{dict.formMessage}</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={dict.formMessagePlaceholder}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={sending}
        size="lg"
        className="mt-2 gap-1.5 self-start"
      >
        {sending ? dict.submitting : dict.submit}
        <Send className="size-4" />
      </Button>
    </form>
  );
}
