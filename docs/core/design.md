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

**Status:** Not yet implemented. Apply when creating the first modules.

## Static data from JSON (2026-07-20)

**Decision:** Every page component reads its data from a co-located `{moduleName}.json` file.

**Rationale:** Hardcoding data in components makes them harder to maintain, test, and localize. External JSON files keep components focused on presentation and allow data changes without touching component code.

## Components vs Services (2026-07-20)

**Decision:** `components/` holds reusable UI pieces. `services/` holds API calls and business logic.

**Rationale:** Clear separation between presentation and data logic prevents components from becoming tangled with side effects. Services remain independently testable.

## Routing library (2026-07-29)

**Decision:** Use `react-router-dom` for client-side routing with a declarative route config in `src/core/routes.tsx`.

**Rationale:** Industry standard for React SPAs. Declarative route objects align with the project's "declarative over imperative" principle.

**Status:** Not yet installed. Add `react-router-dom` when creating the first route.
