# JHIC-FE-User

React 19 + TypeScript 6 + Vite 8 single-page application. This is the user-facing frontend for JHIC.

## Current State

The project is bootstrapped from the official Vite template. The `src/` directory contains only the default template files (`App.tsx`, `main.tsx`, `index.css`, `App.css`). **No application code has been written yet.** The architecture described throughout this `docs/` folder is the intended design — treat it as the blueprint for all future work.

## Base Documentation Rules

This project uses a frontmatter-based documentation system. Every `.md` file (except this one) has YAML frontmatter with these fields:

- `name` — Document name
- `relation` — Position in the documentation hierarchy
- `description` — What the document covers
- `type` — Either `Enforce` (read-only ground truth) or `editable` (agents may modify)

### Rules for agents

1. **Frontmatter is sacred.** Never add, remove, or modify frontmatter fields on `type: Enforce` files. Only modify `type: editable` files.
2. **Respect the relation chain.** Before writing code in any area, read all docs in its relation chain. For example, to write a new module, read: `README.md → index.md → docs/modules/RULES.md`.
3. **No duplicate rules.** If a rule exists in an `Enforce` doc, do not repeat it elsewhere. Reference it by document name instead.
4. **Read Enforce files before writing.** Always read all `Enforce` files relevant to your task before creating or modifying any code.
5. **Module structure.** Each route is a top-level module folder. Sub-pages can be either sibling modules named after their parent (e.g., `profileSettings/`) or nested inside the parent with `<Route children>`.
6. **Static data comes from JSON.** Every module's page component reads data from `{moduleName}.json`. Never hardcode data in components.
7. **Components = UI, Services = logic.** `components/` contains reusable UI. `services/` contains API calls and business logic.

### Agent workflow

1. Read `AGENTS.md` (root) for project context.
2. Read `README.md` (this file) for base rules.
3. Read `index.md` for the documentation TOC and section-specific rules.
4. Read the relevant section docs (e.g., `docs/modules/RULES.md` for module work).
5. Read `type: Enforce` docs before writing any code.
6. For module creation, read the examples in `docs/modules/examples/{moduleName}/` for reference.
7. Write your code following the documented patterns.
8. If modifying existing docs, only touch `type: editable` files.
