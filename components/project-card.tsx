"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/data/projects";

export type VideoMode = "desktop" | "mobile" | "hidden";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && !project.deploy) return null;
  return (
    <div className="flex gap-2 border-t px-6 py-4">
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
  );
}

function ProjectInfo({ project }: { project: Project }) {
  return (
    <>
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
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </>
  );
}

export function ProjectCard({
  project,
  videoMode,
}: {
  project: Project;
  videoMode: VideoMode;
}) {
  if (videoMode === "desktop") {
    return (
      <Card className="group pt-0 pb-0 transition-all hover:border-primary/50 hover:shadow-lg">
        <Link href={`/project/${project.id}`} className="block">
          {project.videoDesktop ? (
            <video
              src={project.videoDesktop}
              className="aspect-video w-full rounded-t-xl bg-muted object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="aspect-video w-full rounded-t-xl bg-muted" />
          )}
          <ProjectInfo project={project} />
        </Link>
        <ProjectLinks project={project} />
      </Card>
    );
  }

  if (videoMode === "mobile") {
    return (
      <Card className="group overflow-hidden sm:py-0 transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center min-w-0">
            <Link href={`/project/${project.id}`} className="block">
              <ProjectInfo project={project} />
            </Link>
            <ProjectLinks project={project} />
          </div>
          {project.videoMobile ? (
            <video
              src={project.videoMobile}
              className="hidden sm:block w-1/3 flex-shrink-0 aspect-[9/16] bg-muted rounded-r-xl object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="hidden sm:block w-1/3 flex-shrink-0 aspect-[9/16] bg-muted rounded-r-xl" />
          )}
        </div>
      </Card>
    );
  }

  // hidden
  return (
    <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
      <Link href={`/project/${project.id}`} className="block">
        <ProjectInfo project={project} />
      </Link>
      <ProjectLinks project={project} />
    </Card>
  );
}
