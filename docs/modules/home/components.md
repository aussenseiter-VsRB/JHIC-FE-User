---
name: Home Components Documentation
relation: home.md → modules/home/components/
description: UI components used by the home module (Hero, About, Programs) and their data files
type: editable
---

# Home Components

This documents the `components/` directory of the `home` module.

## Purpose

Each section component is a self-contained, presentational block. They accept no props — all content is imported from a co-located JSON file in `components/data/`.

## Components

### Hero.tsx
Top banner with the school name, tagline, and two call-to-action links. Data source: `components/data/hero.json` (`title`, `subtitle`, `ctaPrimary`, `ctaSecondary`).

### About.tsx
"Tentang Kami" section with a paragraph and a stats grid. Data source: `components/data/about.json` (`heading`, `paragraph`, `stats[]`).

### Programs.tsx
"Program Keahlian" grid listing the available majors. Data source: `components/data/programs.json` (`heading`, `items[]` with `name`/`code`).

## Naming

- Components: PascalCase, one component per file (`.tsx`).
- Data: lowercase JSON under `components/data/`, named after the consuming component.
