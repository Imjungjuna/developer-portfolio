# Animation Design Spec

**Date:** 2026-05-06
**Topic:** Framer Motion animations for jungjun-portfolio

---

## Goal

Add subtle, restrained animations to the portfolio using the `motion` lightweight package. The tone is minimal — animations should feel like a natural part of the experience, not a showcase in themselves.

## Package

Install `motion` (not `framer-motion`) — the official lightweight standalone build from motion.dev.

```bash
npm install motion
```

Bundle size: ~17KB gzip (vs ~45KB for full framer-motion).

## Animation Variants

Create `lib/animations.ts` with two reusable variants:

```ts
import type { Variants } from "motion/react";

// Primary pattern: fade in + slight upward movement
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Container that staggers children sequentially
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};
```

Values are intentionally small (`y: 16`, `0.5s`, `stagger: 0.08s`) to stay subtle.

## Scroll Trigger Strategy

Use `useInView` from `motion/react` with:
- `amount: 0.2` — triggers when 20% of element is in viewport
- `once: true` — fires only once, no reverse on scroll up

```ts
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });
```

## Component-by-Component Plan

| Component | Animation | Pattern |
|-----------|-----------|---------|
| `section-label.tsx` | fadeUp on scroll | Applied once here → auto-applies to all sections |
| `hero.tsx` | Children stagger in sequence | `staggerContainer` + `fadeUp` on name, bio, CTA |
| `education.tsx` | fadeUp on scroll | Simple, few items |
| `projects.tsx` | Cards stagger on scroll | `staggerContainer` + `fadeUp` per card |
| `skills.tsx` | Category cards stagger on scroll | `staggerContainer` + `fadeUp` per card |
| `contact.tsx` | fadeUp on scroll | Simple |
| `footer.tsx` | fadeUp on scroll | Simple |

Existing CSS hover effects (`hover:shadow-lg`, `hover:border-primary/50`, etc.) are preserved — `motion` wraps the element without overriding Tailwind hover classes.

## Client Component Strategy

`motion` requires client components. Since all data is static (`data/*.ts`) with no server-side fetching, the simplest approach is to add `"use client"` directly to each animated component.

**Add `"use client"` to:**
- `components/hero.tsx`
- `components/education.tsx`
- `components/projects.tsx`
- `components/skills.tsx`
- `components/contact.tsx`
- `components/section-label.tsx`
- `components/footer.tsx`

**Keep as server components:**
- `app/layout.tsx`
- `app/page.tsx`
- `app/project/[id]/page.tsx`

## What We Are Not Doing

- No `prefers-reduced-motion` support (out of scope)
- No page transition animations (`AnimatePresence`)
- No spring physics or complex sequences
- No changes to existing hover CSS — motion only adds entrance behavior
