"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group pt-0 pb-0 transition-all hover:border-primary/50 hover:shadow-lg">
      <Link href={`/project/${project.id}`} className="block">
        <div className="aspect-video w-full rounded-t-xl bg-muted" />
        <CardHeader className="pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <Badge
              variant={project.status === "active" ? "default" : "secondary"}
            >
              {project.status === "active" ? "서비스 중" : "중단"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {project.period} · {project.team}
          </p>
        </CardHeader>
        <CardContent className="">
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
      {(project.github || project.deploy) && (
        <div className="flex gap-2 border-t px-6 py-4 mx-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon className="size-5" />
            </a>
          )}
          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="size-5" />
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
