import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { getProjects } from "@/lib/data"
import { deleteProject } from "./actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export default function AdminProjectsPage() {
  const projects = getProjects()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Project</h1>
          <p className="mt-1 text-sm text-muted-foreground">{projects.length} project.</p>
        </div>
        <Button render={<Link href="/admin/projects/new" className="gap-1.5"><Plus className="size-4" />Tambah Project</Link>} />
      </div>

      <Alert className="mt-6">
        <AlertDescription>
          Perubahan di-commit langsung ke repo GitHub. Di production (Vercel), tunggu
          ~30–60 detik untuk redeploy sebelum berubah di halaman publik. Di local dev,
          file JSON langsung diperbarui.
        </AlertDescription>
      </Alert>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.translations.id.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-[12rem] truncate">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    {project.link}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      render={<Link href={`/admin/projects/${project.id}`}><Pencil className="size-4" /></Link>}
                    />
                    <form action={deleteProject.bind(null, project.id)}>
                      <Button variant="ghost" size="icon" type="submit" aria-label="Hapus">
                        <span className="text-destructive">✕</span>
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
