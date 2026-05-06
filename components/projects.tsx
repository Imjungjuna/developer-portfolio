import { SectionLabel } from "@/components/section-label";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-16">
      <SectionLabel>Projects</SectionLabel>
      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
