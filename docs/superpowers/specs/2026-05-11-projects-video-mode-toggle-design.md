# Projects Video Mode Toggle — Design Spec

**Date:** 2026-05-11

## Problem

On desktop, each project card shows a full-width 16:9 video/placeholder at the top, which means only one project is visible at a time without scrolling. Visitors need a way to control how demo videos are displayed.

## Solution

Add an icon toggle group next to the "Projects" section label with three modes: Desktop (default), Mobile, Hidden.

---

## Component Architecture

### State

`Projects` component owns `useState<'desktop' | 'mobile' | 'hidden'>('desktop')`.
Default is `'desktop'`. No persistence (resets on page refresh).

### Props

`ProjectCard` receives a new `videoMode: 'desktop' | 'mobile' | 'hidden'` prop.

### Data

`Project` type gains two optional fields:

```ts
videoDesktop?: string;  // URL for desktop demo video
videoMobile?: string;   // URL for mobile demo video
```

For now, a placeholder `<div>` renders when the URL is absent. Supplying a URL later automatically activates the video — no further code changes needed.

---

## UI: Icon Toggle Group

Placed inline with the `SectionLabel` ("Projects"), right-aligned.

Three icon buttons using **Lucide** icons (already in project, monochrome):

| Mode | Icon | Label (aria) |
|------|------|--------------|
| `desktop` | `Monitor` | Desktop view |
| `mobile` | `Smartphone` | Mobile view |
| `hidden` | `EyeOff` | Hide videos |

Active button: `text-foreground`
Inactive buttons: `text-muted-foreground`

---

## Card Layout Per Mode

### `desktop` (default)

Current layout unchanged:
- Top: `aspect-video` full-width placeholder/video
- Below: title, description, stack badges, links

### `mobile`

Card becomes horizontal flex row:
- **Left 2/3**: text content (title, period/team, description, stack badges, links) — vertically centered
- **Right 1/3**: `aspect-[9/16]` portrait placeholder/video

### `hidden`

Video area removed entirely. Card shows text content only (same as current card minus the top video area).

---

## Next Steps (follow-up work)

After this feature is implemented: design the mobile-screen layout for the Projects section, covering how the mode toggle and card layouts adapt to small viewports.
