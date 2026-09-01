import { notFound } from "next/navigation"
import { getProjects } from "@/lib/data"
import { ProjectForm } from "@/components/admin/project-form"
import { updateProject } from "../actions"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjects().find((p) => p.id === id)

  if (!project) notFound()

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Project</h1>
      <div className="mt-6">
        <ProjectForm project={project} action={updateProject.bind(null, id)} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  )
}
