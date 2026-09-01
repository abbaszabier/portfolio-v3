import { Asterisk, CircleDashed, Plus, Sparkle } from "lucide-react"

export function HeroDecor() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)]"
      />
      <Sparkle
        aria-hidden
        className="pointer-events-none absolute right-10 top-16 size-9 fill-brand/50 text-brand/50 [animation-duration:3s] animate-pulse sm:right-24"
      />
      <Plus
        aria-hidden
        className="pointer-events-none absolute left-8 top-24 size-6 text-muted-foreground/40 [animation-duration:5s] animate-spin sm:left-20"
      />
      <CircleDashed
        aria-hidden
        className="pointer-events-none absolute bottom-24 right-12 size-10 text-muted-foreground/30 [animation-duration:8s] animate-spin sm:right-28"
      />
      <Asterisk
        aria-hidden
        className="pointer-events-none absolute bottom-32 left-10 size-8 text-brand/40 [animation-duration:4s] animate-pulse sm:left-24"
      />
    </>
  )
}
