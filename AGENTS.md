# JHIC-FE-User

React + TypeScript + Vite single-page application for JHIC (user-facing frontend).

## Documentation Source of Truth

All project documentation lives in the `docs/` directory. Before writing any code, read the relevant docs in order:

1. `docs/README.md` — Base rules and agent workflow
2. `docs/index.md` — Master TOC and section-specific rules
3. `docs/core/systemDesign.md` — Architecture and system design
4. `docs/core/codingPrinciple.md` — Code standards and conventions
5. `docs/core/design.md` — Design decisions and rationale
6. `docs/modules/RULES.md` — Module creation rules

## Quick Start

```bash
npm run dev    # Start dev server
npm run build  # Type-check + production build
npm run lint   # Run ESLint
```

## Current State

The codebase is bootstrapped from the Vite template (React + TypeScript). No application-level code has been written yet. The architecture described in `docs/` is the **intended design** — all modules, components, and routing are yet to be built.
