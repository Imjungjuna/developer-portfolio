# Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle scroll-triggered entrance animations and hero stagger to the portfolio using the `motion` lightweight package.

**Architecture:** Install `motion`, define shared Variants in `lib/animations.ts`, then apply them component by component — `SectionLabel` gets a simple fadeUp (auto-applies to all sections), Hero gets a stagger sequence, Projects/Skills get per-card stagger, and remaining sections get simple fadeUp.

**Tech Stack:** `motion` (motion.dev lightweight package), `motion/react` React bindings, `useInView` scroll trigger hook

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `lib/animations.ts` | **Create** | Shared `fadeUp` and `staggerContainer` Variants |
| `components/section-label.tsx` | **Modify** | Add `"use client"`, `useInView`, `motion.p` wrapper |
| `components/hero.tsx` | **Modify** | Add `"use client"`, stagger sequence on all children |
| `components/education.tsx` | **Modify** | Add `"use client"`, fadeUp on content container |
| `components/projects.tsx` | **Modify** | Add `"use client"`, stagger per project card |
| `components/skills.tsx` | **Modify** | Add `"use client"`, stagger per skill category card |
| `components/contact.tsx` | **Modify** | Add `"use client"`, fadeUp on content |
| `components/footer.tsx` | **Modify** | Add `"use client"`, fadeUp on content |

---

### Task 1: Install `motion` package

**Files:**
- Modify: `package.json` (auto-updated by npm)

- [ ] **Step 1: Install the package**

```bash
npm install motion
```

Expected output: `added 1 package` (or similar — no peer dependency errors)

- [ ] **Step 2: Verify install**

```bash
node -e "require('motion/react'); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install motion package for animations"
```

---

### Task 2: Create shared animation variants

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Create the file**

```ts
// lib/animations.ts
import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add shared animation variants"
```

---

### Task 3: Animate SectionLabel

SectionLabel is shared across Education, Projects, and Skills — animating it here handles all three section labels at once.

**Files:**
- Modify: `components/section-label.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp } from "@/lib/animations";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.p
      ref={ref}
      className="text-sm font-medium text-muted-foreground"
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.p>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Open `http://localhost:3000`, scroll down — section labels (Projects, Skills, Education) should fade up as they enter the viewport.

- [ ] **Step 4: Commit**

```bash
git add components/section-label.tsx
git commit -m "feat: animate SectionLabel with scroll-triggered fadeUp"
```

---

### Task 4: Animate Hero (stagger sequence)

Hero is the first thing visitors see — its children stagger in on page load (no scroll trigger needed; `isInView` fires immediately since it starts in view).

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="py-24 sm:py-32"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
        사용자와 동료의 경험을 고민합니다.
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        임정준
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground text-balance"
      >
        좋은 UI는 예쁜 게 아니라, 사용자의 뇌를 쉬게 하는 것입니다. 기술을 쓸
        수 있는 것보다{" "}
        <span className="font-semibold text-foreground">왜 그 기술인지</span>를
        먼저 묻는 프론트엔드 개발자입니다.
      </motion.p>

      <motion.dl
        variants={fadeUp}
        className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3"
      >
        <div>
          <dt className="text-muted-foreground">생년월일</dt>
          <dd className="mt-1 font-medium">2004.09.09</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">전화번호</dt>
          <dd className="mt-1 font-medium">010.4740.3604</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">위치</dt>
          <dd className="mt-1 font-medium">성남시 분당구</dd>
        </div>
      </motion.dl>

      <motion.a
        variants={fadeUp}
        href="mailto:dalbichi9801@gmail.com"
        className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail className="h-4 w-4" />
        dalbichi9801@gmail.com
      </motion.a>
    </motion.section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Open `http://localhost:3000` — the hero tagline, name, bio, info grid, and email link should stagger in sequentially on page load.

- [ ] **Step 4: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: animate Hero with stagger entrance sequence"
```

---

### Task 5: Animate Education

**Files:**
- Modify: `components/education.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/section-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/education";
import { fadeUp } from "@/lib/animations";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="education" className="py-16">
      <SectionLabel>Education</SectionLabel>
      <motion.div
        ref={ref}
        className="mt-6 space-y-4"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {education.map((edu) => (
          <Card key={edu.school}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{edu.school}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{edu.degree}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {edu.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {edu.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Scroll to Education section — the cards block should fade up together.

- [ ] **Step 4: Commit**

```bash
git add components/education.tsx
git commit -m "feat: animate Education section with scroll fadeUp"
```

---

### Task 6: Animate Projects (stagger per card)

**Files:**
- Modify: `components/projects.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/section-label";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="py-16">
      <SectionLabel>Projects</SectionLabel>
      <motion.div
        ref={ref}
        className="mt-6 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeUp}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

Note: `amount: 0.1` (10%) is used instead of 0.2 because the projects container is tall — 10% visible is enough to trigger.

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Scroll to Projects — cards should stagger in one by one (0.08s apart). Hover effects (shadow, border) should still work normally.

- [ ] **Step 4: Commit**

```bash
git add components/projects.tsx
git commit -m "feat: animate Projects cards with scroll stagger"
```

---

### Task 7: Animate Skills (stagger per category card)

**Files:**
- Modify: `components/skills.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/section-label";
import { SkillCard } from "@/components/skill-card";
import { skillCategories } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="py-16">
      <SectionLabel>Skills</SectionLabel>
      <motion.div
        ref={ref}
        className="mt-6 grid gap-4 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={fadeUp}>
            <SkillCard category={category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Scroll to Skills — 3 category cards should stagger in left to right.

- [ ] **Step 4: Commit**

```bash
git add components/skills.tsx
git commit -m "feat: animate Skills cards with scroll stagger"
```

---

### Task 8: Animate Contact

**Files:**
- Modify: `components/contact.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { fadeUp, staggerContainer } from "@/lib/animations";

const contacts = [
  { icon: Phone, label: "전화번호", value: "010.4740.3604" },
  { icon: Mail, label: "이메일", value: "dalbichi9801@gmail.com", href: "mailto:dalbichi9801@gmail.com" },
  { icon: GithubIcon, label: "GitHub", value: "@imjungjuna", href: "https://github.com/Imjungjuna" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="py-16"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight">
        감사합니다
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-2 text-muted-foreground">
        누구나, 언제든지, 무엇이든 편하게 연락주세요
      </motion.p>
      <motion.div variants={fadeUp}>
        <Card className="mt-8">
          <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              const content = (
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="text-sm font-medium">{contact.value}</p>
                  </div>
                </div>
              );
              return contact.href ? (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-primary"
                >
                  {content}
                </a>
              ) : (
                <div key={contact.label}>{content}</div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Scroll to Contact — heading, subtext, and card should stagger in.

- [ ] **Step 4: Commit**

```bash
git add components/contact.tsx
git commit -m "feat: animate Contact section with scroll stagger"
```

---

### Task 9: Animate Footer

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { fadeUp } from "@/lib/animations";

const quickLinks = [
  { label: "About", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer className="mx-auto w-full max-w-4xl px-6 pb-8">
      <Separator />
      <motion.div
        ref={ref}
        className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div>
          <p className="font-semibold">임정준</p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3">
          <a
            href="https://github.com/Imjungjuna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="mailto:dalbichi9801@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Scroll to bottom — footer content should fade up as it enters viewport.

- [ ] **Step 4: Final full build**

```bash
npm run build
```

Expected: Build completes with no errors or TypeScript issues.

- [ ] **Step 5: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: animate Footer with scroll fadeUp"
```
