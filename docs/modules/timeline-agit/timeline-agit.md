---
name: Timeline Agit Module Documentation
relation: RULES.md → modules/timeline-agit/
description: Documentation for the Timeline Agit module (interactive academic timeline)
type: editable
---

# Timeline Agit Module

## Overview

The `timeline-agit` module renders an interactive academic timeline page (`/timeline-agit`) showing phases with animated step cards. Data sourced from `timeline-agit.json`.

## Structure

```
src/modules/timeline-agit/
├── timeline-agit.tsx       — Page component
├── timeline-agit.json      — Static data (phases, steps, titles)
└── css/timeline-agit.css   — Page styles
```

## Animations (framer-motion)

- **Header:** blur-deblur entrance (title + subtitle)
- **Phases:** stagger children, slide-in from left with spring
- **Icons:** spring pop-in (scale + rotate), hover effects
- **Timeline line:** `scaleY` growth from top
- **Step cards:** staggered fade-up entrance, hover lift + glow, tap scale

## Animations via `whileInView`

Components use `whileInView` with `viewport={{ once: true, amount: 0.15 }}` instead of `animate` — triggers on scroll into view and plays only once.

## Icons

Maps JSON `icon` strings to lucide-react components via `iconMap` constant (`BookOpen`, `GraduationCap`, `Award`).
