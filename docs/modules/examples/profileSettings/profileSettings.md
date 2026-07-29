---
name: ProfileSettings Sub-Module Example
relation: RULES.md → modules/examples/profileSettings/
description: Example sub-module showing the parent-named convention for /profile/settings
type: editable
---

# ProfileSettings Module

This is an example sub-module for the `/profile/settings` route. It demonstrates the parent-named convention.

## Naming

The parent module is `profile/`. The sub-module for settings is named `profileSettings/`.

## Structure

```
src/modules/profileSettings/
├── profileSettings.tsx           — Page component
├── css/profileSettings.css       — Styles
├── profileSettings.json          — Static data
├── components/                   — UI components (optional)
└── services/                     — API/business logic (optional)
```

## Routing

- Parent `/profile` → `src/modules/profile/profile.tsx`
- Child `/profile/settings` → `src/modules/profileSettings/profileSettings.tsx`

Alternatively, sub-pages may be nested inside the parent module directory with `<Route children>`.
