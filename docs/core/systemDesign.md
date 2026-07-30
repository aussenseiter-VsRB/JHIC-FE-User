---
name: System Design
relation: index.md → core/
description: Intended architecture and system design documentation
type: Enforce
---

# System Design

## Project architecture

Ini adalah **React + TypeScript** single-page application (AI chatbot platform "Nexxa AI") yang dibangun dengan Vite. Arsitektur mengikuti pola **module-based** — setiap route adalah direktori module sendiri di `src/modules/`.

## Module architecture

```
src/modules/{moduleName}/
├── {moduleName}.tsx       — Page component (React + TypeScript)
├── css/{moduleName}.css   — Page styles
├── {moduleName}.json      — Static data consumed by the page
├── components/            — Reusable UI components (module-scoped, optional)
└── services/              — API calls and business logic (optional)
```

Pages may also live in `services/` when they serve as route-level page components with data-fetching logic. Sub-pages can be nested inside a parent module directory (e.g., `profile/settings/`).

## Global components

```
src/components/
├── sidebar/       — Sidebar navigation + user footer + recent items
└── settings/      — Settings modal (akun & tampilan)
```

- Global components live in `src/components/`. They are imported **only** by `src/core/layout.tsx` and rendered in the page shell.
- Individual modules must **not** import from `src/components/` directly. If a component is used by a single module, it belongs in that module's `components/` directory.
- **Pengecualian:** Sidebar mengimpor data dari `modules/nexxa/nexxa.json` (static data reuse antar-module diakui).

## Routing

Routing menggunakan **react-router-dom** dengan central route config di `src/core/routes.tsx`. Layout component (`src/core/layout.tsx`) membungkus semua routes dengan sidebar + `<Outlet />` + SettingsModal.

```tsx
// App.tsx
const router = createBrowserRouter(routes);
function App() { return <RouterProvider router={router} />; }
```

## Current source tree

```
src/
├── main.tsx              — React entry point (StrictMode + createRoot)
├── App.tsx               — createBrowserRouter + RouterProvider
├── index.css             — Root styles, CSS variables (dark theme)
├── core/
│   ├── layout.tsx        — App shell (sidebar + Outlet + SettingsModal)
│   ├── layout.css        — Layout + sidebar styles
│   └── routes.tsx        — Declarative route config
├── components/
│   ├── sidebar/
│   │   ├── Sidebar.tsx   — Navigasi, recent items, user footer
│   │   └── RecentItem.tsx
│   └── settings/
│       ├── SettingsModal.tsx — Modal pengaturan akun & tampilan
│       ├── settings.css
│       └── settingsData.json
└── modules/
    ├── nexxa/            — Chat AI utama (/)
    ├── search/           — Pencarian riwayat (/search)
    ├── dashboard-pkl/    — Placeholder (/dashboard-pkl)
    ├── cv-review/        — Analisis CV (/cv-review)
    └── timeline-agit/    — Timeline interaktif (/timeline-agit)
```

## Key principles

- **Module hierarchy.** Each route is a top-level module.
- **Data from JSON.** Every page reads its data from a co-located JSON file. No hardcoded data in components.
- **Separation of concerns.** UI lives in `components/`, logic lives in `services/`. Pages orchestrate both.
- **Animation via framer-motion.** All page transitions, hovers, taps, and stagger animations use framer-motion variants.
- **Icons via lucide-react.** No icon fonts or SVGs — all icons are lucide-react components.
- **CSS + postcss-nested.** Global CSS with nesting, no CSS modules or CSS-in-JS.
