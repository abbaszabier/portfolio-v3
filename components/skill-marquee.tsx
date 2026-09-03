import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillMarquee({
  items,
  className,
  reverse = false,
  duration = 32,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 font-heading text-4xl font-semibold tracking-tight text-foreground/80 sm:text-5xl"
          >
            {item}
            <Sparkle
              aria-hidden
              className="size-5 shrink-0 fill-brand/60 text-brand/60"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
