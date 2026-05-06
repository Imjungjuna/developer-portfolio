import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { codeToHtml } from "shiki";
import { GithubIcon } from "@/components/icons";
import { ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | 임정준`,
    description: project.description,
  };
}

async function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      const code = codeLines.join("\n");
      const html = await codeToHtml(code, {
        lang,
        themes: { light: "github-light", dark: "github-dark" },
      });

      elements.push(
        <div
          key={key++}
          className="my-4 overflow-x-auto rounded-lg border text-sm [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
      continue;
    }

    // Heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mb-3 mt-8 text-xl font-semibold">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{
              __html: item
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                .replace(/`(.+?)`/g, '<code class="rounded bg-muted px-1 py-0.5 text-xs">$1</code>')
            }} />
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph
    if (line.trim()) {
      elements.push(
        <p
          key={key++}
          className="my-2 text-sm leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="rounded bg-muted px-1 py-0.5 text-xs">$1</code>')
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const contentElements = await renderMarkdown(project.content);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Projects
      </Link>

      <h1 className="mt-8 text-2xl font-bold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{project.subtitle}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{project.period}</span>
        <span>·</span>
        <span>{project.team}</span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        )}
        {project.deploy && (
          <a
            href={project.deploy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Demo
          </a>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      <article className="mt-10">{contentElements}</article>
    </main>
  );
}
