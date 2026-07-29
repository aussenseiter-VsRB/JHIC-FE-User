---
name: Jurusan Module Documentation
relation: RULES.md → modules/jurusan/
description: Documentation for the jurusan module (majors listing and detail pages, data-driven)
type: editable
---

# Jurusan Module

## Overview

The `jurusan` module powers `/jurusan` (majors listing) and `/jurusan/:slug` (major detail). It is a **data-centric** module: there is no root `{module}.tsx`. Instead, the route-level page components live in `services/` (the documented "pages in services" variant from `RULES.md`), and all content is aggregated from JSON files in `data/`.

## Structure

```
src/modules/jurusan/
├── css/jurusan.css                 — Styles for listing and detail
├── components/
│   └── JurusanCard.tsx             — Card linking to /jurusan/:slug
├── data/
│   ├── index.ts                    — Aggregates JSON, exports jurusanData + getJurusanBySlug
│   ├── pplg.json                   — RPL major
│   ├── hotel.json                  — Perhotelan major
│   └── akuntansi.json              — Akuntansi major
└── services/
    ├── PageJurusan.tsx             — /jurusan listing page
    └── PageJurusanDetail.tsx       — /jurusan/:slug detail page
```

## Rules

- Page components live in `services/` because the module is primarily data-driven (no dedicated root `.tsx`). This is the accepted variant in `RULES.md`.
- All major data is static JSON under `data/`, aggregated by `data/index.ts`.
- `JurusanCard` is a pure presentational component (no data fetching).

## Examples

Routing (in `src/core/routes.tsx`):

```tsx
{ path: "/jurusan", element: <PageJurusan /> },
{ path: "/jurusan/:slug", element: <PageJurusanDetail /> },
```

Looking up a major by slug:

```ts
import { getJurusanBySlug } from "../data";

const jurusan = getJurusanBySlug(slug);
```
