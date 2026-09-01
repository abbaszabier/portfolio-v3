import Link from "next/link"
import { FolderGit2, Layers, Briefcase } from "lucide-react"
import { getProjects, getSkills, getExperiences } from "@/lib/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function AdminOverviewPage() {
  const sections = [
    {
      href: "/admin/projects",
      label: "Project",
      count: getProjects().length,
      icon: FolderGit2,
    },
    {
      href: "/admin/skills",
      label: "Skill",
      count: getSkills().length,
      icon: Layers,
    },
    {
      href: "/admin/experience",
      label: "Pengalaman",
      count: getExperiences().length,
      icon: Briefcase,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Kelola data yang ditampilkan di halaman portfolio.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {sections.map(({ href, label, count, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
                <CardTitle className="mt-2">{label}</CardTitle>
                <CardDescription>{count} item</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
