# Projects Video Mode Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-button icon toggle (Desktop / Mobile / Hidden) next to the "Projects" section label to control how demo videos are displayed in project cards.

**Architecture:** `VideoMode` type and toggle state live in `Projects`; the mode is passed as a prop to each `ProjectCard` which renders one of three layouts. No persistence — resets to `"desktop"` on page refresh.

**Tech Stack:** Next.js App Router, React `useState`, Lucide icons, Tailwind CSS

---

## File Map

| File | Change |
|------|--------|
| `data/projects.ts` | Add `videoDesktop?` and `videoMobile?` to `Project` type |
| `components/project-card.tsx` | Add `VideoMode` export, extract `ProjectInfo`/`ProjectLinks` helpers, render layout per mode |
| `components/projects.tsx` | Add `useState<VideoMode>`, render icon toggle group above cards |

> **No test infrastructure exists in this project.** Each task ends with a dev-server visual check instead of automated tests.

---

## Task 1: Add video URL fields to Project type

**Files:**
- Modify: `data/projects.ts`

- [ ] **Step 1: Add the two optional fields to the `Project` type**

In `data/projects.ts`, update the `Project` type:

```ts
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  team: string;
  status: "active" | "inactive";
  stack: string[];
  github?: string;
  deploy?: string;
  image?: string;
  videoDesktop?: string;
  videoMobile?: string;
  content: string;
};
```

No changes needed to the `projects` array — the fields are optional and default to `undefined`.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add data/projects.ts
git commit -m "feat: add videoDesktop and videoMobile fields to Project type"
```

---

## Task 2: Refactor ProjectCard to support videoMode prop

**Files:**
- Modify: `components/project-card.tsx`

- [ ] **Step 1: Replace the file contents with the new implementation**

```tsx
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
          <div className="aspect-video w-full rounded-t-xl bg-muted" />
          <ProjectInfo project={project} />
        </Link>
        <ProjectLinks project={project} />
      </Card>
    );
  }

  if (videoMode === "mobile") {
    return (
      <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center min-w-0">
            <Link href={`/project/${project.id}`} className="block">
              <ProjectInfo project={project} />
            </Link>
            <ProjectLinks project={project} />
          </div>
          <div className="w-1/3 flex-shrink-0 aspect-[9/16] bg-muted rounded-r-xl" />
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/project-card.tsx
git commit -m "feat: refactor ProjectCard to support desktop/mobile/hidden video modes"
```

---

## Task 3: Add state and icon toggle to Projects

**Files:**
- Modify: `components/projects.tsx`

- [ ] **Step 1: Replace the file contents with the new implementation**

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Monitor, Smartphone, EyeOff } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { ProjectCard, type VideoMode } from "@/components/project-card";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/animations";

const VIDEO_MODES: {
  mode: VideoMode;
  icon: React.ElementType;
  label: string;
}[] = [
  { mode: "desktop", icon: Monitor, label: "Desktop view" },
  { mode: "mobile", icon: Smartphone, label: "Mobile view" },
  { mode: "hidden", icon: EyeOff, label: "Hide videos" },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [videoMode, setVideoMode] = useState<VideoMode>("desktop");

  return (
    <section id="projects" className="py-16">
      <div className="flex items-center justify-between">
        <SectionLabel>Projects</SectionLabel>
        <div className="flex items-center gap-1">
          {VIDEO_MODES.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setVideoMode(mode)}
              aria-label={label}
              className={`p-1 transition-colors ${
                videoMode === mode
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>
      <motion.div
        ref={ref}
        className="mt-6 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeUp}>
            <ProjectCard project={project} videoMode={videoMode} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Visual check on dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
1. "Projects" label has three icons (monitor, smartphone, eye-off) to its right
2. Active icon is `text-foreground`, others are `text-muted-foreground`
3. Clicking Monitor → cards show full-width 16:9 placeholder on top (default)
4. Clicking Smartphone → cards show text left (2/3, vertically centered) + portrait placeholder right (1/3)
5. Clicking EyeOff → cards show text only, no video area
6. Toggle switches instantly with no page reload

- [ ] **Step 4: Commit**

```bash
git add components/projects.tsx
git commit -m "feat: add video mode toggle (desktop/mobile/hidden) to Projects section"
```
