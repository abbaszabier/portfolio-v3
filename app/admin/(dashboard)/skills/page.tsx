import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { getSkills } from "@/lib/data"
import { deleteSkill } from "./actions"
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

export default function AdminSkillsPage() {
  const skills = getSkills()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Skill</h1>
          <p className="mt-1 text-sm text-muted-foreground">{skills.length} skill.</p>
        </div>
        <Button render={<Link href="/admin/skills/new" className="gap-1.5"><Plus className="size-4" />Tambah Skill</Link>} />
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
              <TableHead>Kategori</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.category}</TableCell>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>{skill.level}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      render={<Link href={`/admin/skills/${skill.id}`}><Pencil className="size-4" /></Link>}
                    />
                    <form action={deleteSkill.bind(null, skill.id)}>
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
