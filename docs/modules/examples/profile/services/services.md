---
name: Profile Services Example
relation: profile.md → modules/examples/profile/services/
description: Example showing the services (API/business logic) pattern for modules
type: editable
---

# Profile Services

This documents the `services/` directory pattern within a module.

## Purpose

Holds data access and business logic for the module. Services:

- Handle API calls, data transformation, and side effects.
- Return Promises.
- Never import UI components.
- Are consumed by page components via hooks or effects.

## Naming

Use camelCase, one service per domain concern.

```
services/
├── profileApi.ts        — Fetch/save profile data
├── profileValidation.ts — Form validation logic
└── profileCache.ts      — Client-side caching logic
```
