import Link from "next/link"
import { redirect } from "next/navigation"
import { isAuthenticated, destroySession } from "@/lib/auth"
import { Button } from "@/components/ui/button"

const ADMIN_LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Project" },
  { href: "/admin/skills", label: "Skill" },
  { href: "/admin/experience", label: "Pengalaman" },
]

async function logout() {
  "use server"
  await destroySession()
  redirect("/admin/login")
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <nav className="flex items-center gap-1">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm">
            Logout
          </Button>
        </form>
      </div>

      <div className="py-8">{children}</div>
    </div>
  )
}
