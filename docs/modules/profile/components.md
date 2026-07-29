---
name: Profile Components Documentation
relation: profile.md → modules/profile/components/
description: UI components used by the profile module (ProfileCard, TentangSekolah, SambutanKepsek) and their data files
type: editable
---

# Profile Components

This documents the `components/` directory of the `profile` module.

## Purpose

Presentational components for the profile page. Each reads its content from a JSON file in `components/data/`. No hardcoded display strings.

## Components

### ProfileCard.tsx
Placeholder card currently rendering static text. No data dependency yet.

### TentangSekolah.tsx
"Tentang Sekolah" section: heading, description, stats grid, CTA, and a vision/mission panel. Data source: `components/data/tentang-sekolah.json`.

### SambutanKepsek.tsx
Principal greeting section: heading, photo, name, title, and paragraphs. Data source: `components/data/sambutan-kepsek.json`.

## Naming

- Components: PascalCase, one component per file (`.tsx`).
- Data: kebab-case JSON under `components/data/`, named after the consumed content.

## Nested sub-page

The `settings/` directory is a nested page (`/profile/settings`), not a component. See `profile.md` → Sub-pages.
