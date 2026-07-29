---
name: Module Creation Rules
relation: index.md → modules/
description: Enforceable rules for creating and structuring modules
type: Enforce
---

# Module Creation Rules

> **Current status:** No modules exist yet. These rules define how modules **must** be structured when they are created.

## 1. Module structure

Each route is a **top-level module** under `src/modules/`. Sub-pages may be organized in two ways:

**Option A — Flat sibling modules** (loose coupling):
```
src/modules/
├── profile/            ← /profile
├── profileEdit/        ← /profile/edit
└── profileSettings/    ← /profile/settings
```

**Option B — Nested inside parent** (tight coupling):
```
src/modules/profile/
├── profile.tsx         ← /profile
├── settings/
│   ├── page.tsx        ← /profile/settings
│   └── css/page.css
└── ...
```

## 2. Sub-module naming

Flat sibling modules follow the parent-prefixed naming pattern:

```
Parent:  profile/
Child:   profileSettings/
```

Pattern: `{parent}{childName}` in PascalCase (e.g., `jurusanRPL`, `profileSettings`).

## 3. Static data from JSON

If a page has static data, it must come from a co-located `{moduleName}.json` file. Never hardcode display data inside `.tsx` components. If the page has no static data yet, skip the JSON file entirely.

```
profile.tsx   → imports data from profile.json
profileEdit.tsx → imports data from profileEdit.json
```

## 4. Standard module file set

Every module should include these files:

```
{moduleName}/
├── {moduleName}.tsx    — Page component (default export)
├── css/{moduleName}.css — Styles
├── {moduleName}.json   — Static data
├── components/         — Reusable UI components (optional)
├── services/           — API calls and business logic (optional)
└── data/               — Static data files for multi-page modules (optional)
```

`components/` and `services/` are optional. Modules with only a simple page may omit them.

## 5. Pages in services

Page-level components may live inside `services/` when the page is primarily data-driven (e.g., jurusan listing and detail pages). This is acceptable when the module has no dedicated root `.tsx` and serves as a data-centric route.

## 6. Separation: components vs services

- `components/` — UI only. No API calls, no business logic. Pure presentation.
- `services/` — Logic only. No UI imports. Handles API calls, data transformation, side effects.

## 7. Wiring a module

After creating a module's files, register it in `src/core/routes.tsx`:

1. **Import** the page component:
   ```ts
   import ModuleName from "../modules/{moduleName}/{moduleName}";
   ```

2. **Add a route object** inside the `children` array of the `Layout` route:
   ```ts
   { path: "/route-path", element: <ModuleName /> },
   ```

3. **Nested sub-routes** use a parent with `children`:
   ```ts
   {
     path: "/parent",
     element: <ParentComponent />,  // must render <Outlet />
     children: [
       { path: "child-path", element: <ChildComponent /> },
     ],
   }
   ```

The path should match the module name by convention (e.g., `/berita` → `modules/berita`, `/profile/settings` → `modules/profile/settings/page`).

The import path follows the module's actual file location — flat sibling modules (e.g., `profileEdit/profileEdit.tsx`) import from their own root, nested sub-pages (e.g., `profile/settings/page.tsx`) import from their nested path.

---

## 8. No dead code

Don't generate files, exports, or data that nothing consumes. Empty stubs create confusion and maintenance burden.

- **Don't scaffold empty stubs.** The standard file set (rule 4) lists `components/`, `services/`, and `data/` as optional — only create them when they will be used immediately.
- **JSON must be consumed.** If `{moduleName}.json` exists, the page component must import and render at least one key from it.
- **CSS must have declarations.** Don't create `.{name} {}` with empty braces. Only create the CSS file when there are actual styles to write.
- **Every component must be real.** No placeholder `<div>Name</div>` stubs. Components must have props, meaningful JSX, and be imported somewhere.
- **Every export must be consumed.** Every exported function, type, or component must be imported by at least one other file.
- **Self-check before finishing.** After creating a module, verify: every file exists for a reason, every import resolves to a used symbol, every JSON key is rendered in JSX.
