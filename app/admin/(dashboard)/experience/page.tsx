import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { getExperiences } from "@/lib/data"
import { deleteExperience } from "./actions"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

export default function AdminExperiencePage() {
  const experiences = getExperiences()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pengalaman</h1>
          <p className="mt-1 text-sm text-muted-foreground">{experiences.length} pengalaman.</p>
        </div>
        <Button render={<Link href="/admin/experience/new" className="gap-1.5"><Plus className="size-4" />Tambah Pengalaman</Link>} />
      </div>

      <Alert className="mt-6">
        <AlertDescription>
          Perubahan di-commit langsung ke repo GitHub. Di production (Vercel), tunggu
          ~30–60 detik untuk redeploy sebelum berubah di halaman publik.
        </AlertDescription>
      </Alert>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences.map((experience) => (
              <TableRow key={experience.id}>
                <TableCell className="font-medium">{experience.translations.id.role}</TableCell>
                <TableCell>{experience.company}</TableCell>
                <TableCell>{experience.translations.id.period}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      render={<Link href={`/admin/experience/${experience.id}`}><Pencil className="size-4" /></Link>}
                    />
                    <form action={deleteExperience.bind(null, experience.id)}>
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
