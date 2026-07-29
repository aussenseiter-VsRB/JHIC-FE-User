---
name: Profile Module Example
relation: RULES.md → modules/examples/profile/
description: Example module showing the page component pattern with static data from JSON
type: editable
---

# Profile Module

This is an example module for the `/profile` route. Follow this pattern when creating new modules.

## Structure

```
src/modules/profile/
├── profile.tsx          — Page component, reads data from profile.json
├── css/profile.css      — Page styles
├── profile.json         — Static data (never hardcode in component)
├── components/          — UI components used by this page (optional)
└── services/            — API calls and business logic (optional)
```

## How to use this example

1. Copy the directory structure (not the code).
2. Replace `profile` with your module name.
3. Define your data in `{moduleName}.json`.
4. Build your UI in `{moduleName}.tsx` consuming that data.
5. Extract reusable UI into `components/`.
6. Move data fetching and business logic into `services/`.

For sub-pages (`/profile/edit`, `/profile/settings`), see `profileEdit/` and `profileSettings/` examples.
