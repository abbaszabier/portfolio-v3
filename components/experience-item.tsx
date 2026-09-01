import { Badge } from "@/components/ui/badge"
import type { LocalizedExperience } from "@/lib/types"

export function ExperienceItem({
  experience,
  isLast,
}: {
  experience: LocalizedExperience
  isLast: boolean
}) {
  return (
    <div className="relative flex gap-5 pl-1">
      <div className="flex flex-col items-center">
        <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/15" />
        {!isLast && <span className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <div className="flex-1 pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {experience.role}
          </h3>
          <Badge variant="outline">{experience.type}</Badge>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {experience.company} · {experience.period}
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground/80">
          {experience.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
