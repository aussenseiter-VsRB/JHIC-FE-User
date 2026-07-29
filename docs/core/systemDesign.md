---
name: System Design
relation: index.md → core/
description: Intended architecture and system design documentation
type: Enforce
---

# System Design

## Project architecture

This is a **React + TypeScript** single-page application built with Vite. The architecture follows a **module-based** pattern where each route is encapsulated in its own module directory under `src/modules/`.

> **Note:** This architecture is the **intended design**. The current `src/` directory only contains the default Vite template files. No modules, layout, or routing infrastructure exists yet.

## Module architecture (intended)

```
src/modules/{moduleName}/
├── {moduleName}.tsx       — Page component (React + TypeScript)
├── css/{moduleName}.css   — Page styles
├── {moduleName}.json      — Static data consumed by the page
├── components/            — Reusable UI components (module-scoped, optional)
├── services/              — API calls and business logic (optional)
└── data/                  — Static data files (optional, for multi-page modules)
```

Pages may also live in `services/` when they serve as route-level page components with data-fetching logic. Sub-pages can be nested inside a parent module directory (e.g., `profile/settings/`).

## Global components (intended)

```
src/components/
├── navbar/        — Site-wide navigation
├── footer/        — Site-wide footer
└── ...
```

- Global components live in `src/components/`. They are imported **only** by `src/core/layout.tsx` and rendered in the page shell (above/below `<Outlet />`).
- Individual modules must **not** import from `src/components/` directly. If a component is used by a single module, it belongs in that module's `components/` directory.
- `src/components/` is reserved for components that appear on **every page** (navbar, footer) or are genuinely shared across multiple modules.

## Routing (planned)

Routing will use `react-router-dom` with a central route config in `src/core/routes.tsx`. A `Layout` component will wrap all routes, rendering shared shell components (navbar, footer) with an `<Outlet />` for page content.

## Current source tree

```
src/
├── main.tsx       — React entry point (StrictMode + createRoot)
├── App.tsx        — Default Vite template component (counter demo)
├── App.css        — Vite template styles
├── index.css      — Root styles, CSS variables, light/dark theme
└── assets/        — Template images (hero.png, react.svg, vite.svg)
```

## Key principles

- **Module hierarchy.** Each route is a top-level module. Sub-pages may be sibling modules with parent-prefixed names (e.g., `profileSettings/`) or nested inside the parent (e.g., `profile/settings/`).
- **Data from JSON.** Every page reads its data from a co-located JSON file. No hardcoded data in components.
- **Separation of concerns.** UI lives in `components/`, logic lives in `services/`. Pages orchestrate both.
