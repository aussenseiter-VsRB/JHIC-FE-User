---
name: Jurusan Components Documentation
relation: jurusan.md → modules/jurusan/components/
description: UI components used by the jurusan module (JurusanCard)
type: editable
---

# Jurusan Components

This documents the `components/` directory of the `jurusan` module.

## Components

### JurusanCard.tsx
Presentational card for a single major. Receives `name`, `code`, `slug`, `description` as props and links to `/jurusan/{slug}`. No data fetching.

## Naming

- PascalCase, one component per file (`.tsx`).
- Pure UI: receives data via props from the page in `services/`.
