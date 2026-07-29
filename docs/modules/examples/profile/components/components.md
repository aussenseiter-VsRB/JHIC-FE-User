---
name: Profile Components Example
relation: profile.md → modules/examples/profile/components/
description: Example showing the UI component pattern for modules
type: editable
---

# Profile Components

This documents the `components/` directory pattern within a module.

## Purpose

Holds reusable UI pieces specific to this module. Components here:

- Are pure presentation (no API calls, no business logic).
- Accept data via props.
- Are not shared across modules (shared components go in a global `src/components/`).

## Naming

Use PascalCase with a `.tsx` extension. One component per file.

```
components/
├── ProfileHeader.tsx
├── ProfileStats.tsx
└── ProfileAvatar.tsx
```
