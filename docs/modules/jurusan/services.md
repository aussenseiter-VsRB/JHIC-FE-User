---
name: Jurusan Services Documentation
relation: jurusan.md → modules/jurusan/services/
description: Page-level (data-driven) components in the jurusan module's services directory
type: editable
---

# Jurusan Services

This documents the `services/` directory of the `jurusan` module. Because `jurusan` is a data-centric module, its route-level **page components** live here rather than at the module root.

## Purpose

- `PageJurusan.tsx` — renders the `/jurusan` listing. Maps over `jurusanData` and renders a `JurusanCard` per major.
- `PageJurusanDetail.tsx` — renders `/jurusan/:slug`. Reads the `slug` param, resolves the major via `getJurusanBySlug`, and shows detail (subjects, career). Renders a "not found" fallback when the slug is unknown.

## Data access

Both pages import from `../data` (which re-exports `jurusanData` and `getJurusanBySlug`). They do not fetch at runtime — data is static JSON.

## Naming

- Files are the route page components, named with PascalCase (`PageJurusan`, `PageJurusanDetail`).
- Consumed by `routes.tsx` directly: `import PageJurusan from "../modules/jurusan/services/PageJurusan"`.
