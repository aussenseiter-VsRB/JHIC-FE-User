---
name: Coding Principles
relation: index.md → core/
description: Code standards, naming conventions, and best practices
type: Enforce
---

# Coding Principles

This document covers the broader software design philosophy for JHIC-FE.

---

## Core Tenets

### 1. Composition over Inheritance

React components compose. We don't use class inheritance, HOCs, or wrapper patterns.
Prefer: small components assembled together.
Avoid: god components, render props used as control flow.

### 2. Explicit over Implicit

- Props are typed, not `any`.
- Imports are explicit (`import type` for types).
- Side effects are contained in `services/`, not scattered across components.
- If something is required, the type system enforces it — not a runtime check.

### 3. Colocation over Centralization

Code lives next to what it serves:
- Module styles live in `css/` inside the module directory.
- Module components live in `components/` inside the module directory.
- Module data fetching lives in `services/` inside the module directory.
- Only truly shared code goes in `src/components/` or `src/core/`.

### 4. Declarative over Imperative

- Routes are declarative objects in `routes.tsx`, not programmatic navigation.
- UI state drives rendering — don't imperatively manipulate the DOM.

### 5. No Dead Code

Don't generate files, exports, or data that nothing consumes. Empty stubs create confusion and maintenance burden. If a file has no consumer, it shouldn't exist.

### 6. Progressive Complexity

Start simple. Add complexity only when the simple solution fails:
- Inline types → extracted interfaces → shared type files.
- Local state → context → external state management.
- Fetch in component → service function → API client → data layer.

Don't build infrastructure for problems you don't have yet.

## Decision Framework

When choosing an approach, ask:

1. **Does it match the existing pattern?** Follow what's already here.
2. **Is it the simplest solution that works?** KSS — keep it simple, ship.
3. **Will it scale to the next two requirements?** Not ten — two.
4. **Can I explain it in one sentence?** If not, it's probably too complex.

## Error Handling

- Fail fast: validate inputs at the boundary.
- Errors bubble up, not swallowed silently.
- UI feedback: show the user what went wrong, don't just log to console.

## Code Review Self-Check

After writing any code, ask:

1. Is it simple and necessary right now?
2. Is it isolated and predictable?
3. Is it safe to run and deploy?
4. Every file, import, and export has at least one consumer — no dead code.
