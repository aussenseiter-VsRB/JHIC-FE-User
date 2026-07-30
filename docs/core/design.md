---
name: Design Decisions
relation: index.md → core/
description: Design decisions and rationale to prevent agent drift
type: Enforce
---

# Design Decisions

## Module structure (2026-07-20)

**Decision:** Routes are top-level modules. Sub-pages can be either sibling modules named with their parent as a prefix (e.g., `profileSettings/`) or nested directories (e.g., `profile/settings/`). Both patterns are valid.

**Rationale:** Flat sibling modules keep imports simple and boundaries clear. Nested sub-routes better reflect route hierarchy in the filesystem when the sub-page is tightly coupled to the parent (e.g., settings as a child section of profile). The choice depends on coupling — loose coupling → sibling, tight coupling → nested.

**Status:** Implemented. 5 modules exist: `nexxa/`, `search/`, `dashboard-pkl/`, `cv-review/`, `timeline-agit/`.

## Static data from JSON (2026-07-20)

**Decision:** Every page component reads its data from a co-located `{moduleName}.json` file.

**Rationale:** Hardcoding data in components makes them harder to maintain, test, and localize. External JSON files keep components focused on presentation and allow data changes without touching component code.

**Status:** Implemented. `nexxa.json`, `search.json`, `cv-review.json`, `timeline-agit.json`, `settingsData.json` all active.

## Components vs Services (2026-07-20)

**Decision:** `components/` holds reusable UI pieces. `services/` holds API calls and business logic.

**Rationale:** Clear separation between presentation and data logic prevents components from becoming tangled with side effects. Services remain independently testable.

**Status:** Implemented. `cv-review/` has both `components/` (UploadForm, LoadingScreen, ReviewDashboard) and `services/` (reviewService.ts with mock API).

## Animation library (2026-07-29)

**Decision:** Use `framer-motion` for all non-trivial animations (page transitions, hover effects, stagger children, spring loading). CSS keyframes only for simple looping animations (typing indicator, scanner beam).

**Rationale:** framer-motion provides declarative animation API that aligns with React's component model. CSS keyframes are kept minimal to avoid maintenance overhead.

**Status:** Implemented across all modules. See `docs/core/desain.md` for complete pattern reference.

## Icons (2026-07-29)

**Decision:** Use `lucide-react` for all icons. No icon fonts, SVG sprite sheets, or inline SVGs.

**Rationale:** Tree-shakeable, consistent styling, typed components. Matches project's "explicit over implicit" principle.

## Routing library (2026-07-29)

**Decision:** Use `react-router-dom` for client-side routing with a declarative route config in `src/core/routes.tsx`.

**Rationale:** Industry standard for React SPAs. Declarative route objects align with the project's "declarative over imperative" principle.

**Status:** Implemented. Layout + 5 routes active.
