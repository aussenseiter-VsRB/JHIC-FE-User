---
name: ProfileEdit Sub-Module Example
relation: RULES.md → modules/examples/profileEdit/
description: Example sub-module showing the parent-named convention for /profile/edit
type: editable
---

# ProfileEdit Module

This is an example sub-module for the `/profile/edit` route. It demonstrates the parent-named convention.

## Naming

The parent module is `profile/`. The sub-module for editing is named `profileEdit/` (parent name + child identifier, PascalCase).

## Structure

```
src/modules/profileEdit/
├── profileEdit.tsx          — Page component
├── css/profileEdit.css      — Styles
├── profileEdit.json         — Static data
├── components/              — UI components (optional)
└── services/                — API/business logic (optional)
```

## Routing

- Parent `/profile` → `src/modules/profile/profile.tsx`
- Child `/profile/edit` → `src/modules/profileEdit/profileEdit.tsx`

The router maps the URL path to the module name by concatenation convention.

Alternatively, sub-pages may be nested inside the parent module directory using React Router `<Route children>`.
