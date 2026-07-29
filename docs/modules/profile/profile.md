---
name: Profile Module Documentation
relation: RULES.md → modules/profile/
description: Documentation for the profile module (school profile page with about, vision/mission, and principal greeting)
type: editable
---

# Profile Module

## Overview

The `profile` module is the `/profile` route. It renders a page shell (`profile.tsx`) that composes `ProfileCard`, `TentangSekolah`, and `SambutanKepsek`, and exposes an `<Outlet />` for nested sub-pages. Each child component reads its content from a JSON file in `components/data/`.

## Structure

```
src/modules/profile/
├── profile.tsx                       — Page shell, composes child components + <Outlet />
├── profile.json                      — Module metadata (currently empty `{}`)
├── css/profile.css                   — Page styles
├── components/
│   ├── ProfileCard.tsx               — Placeholder card
│   ├── TentangSekolah.tsx            — About + vision/mission section
│   ├── SambutanKepsek.tsx            — Principal greeting section
│   └── data/
│       ├── tentang-sekolah.json      — Heading, description, stats, CTA, visi & misi
│       └── sambutan-kepsek.json      — Heading, photo, name, title, paragraphs
└── settings/                         — Nested sub-page (see Sub-pages)
    ├── page.tsx                      — /profile/settings
    ├── page.json                     — Module metadata (empty `{}`)
    └── css/page.css
```

## Sub-pages

`profile/settings` is a **nested** sub-route (parent-prefixed sibling is also valid per `RULES.md`). It is wired via React Router `<Route children>` under `/profile`:

```tsx
{
  path: "/profile",
  element: <Profile />,
  children: [
    { path: "settings", element: <ProfileSettings /> },
  ],
}
```

The settings page lives at `src/modules/profile/settings/page.tsx` with its own `page.json` and `css/page.css`.

## Rules

- `profile.tsx` must render `<Outlet />` so nested sub-pages mount beneath it.
- Child components read display data from `components/data/*.json`. No hardcoded content.

## Examples

Composing the page:

```tsx
import { Outlet } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";
import TentangSekolah from "./components/TentangSekolah";
import SambutanKepsek from "./components/SambutanKepsek";

function Profile() {
  return (
    <div className="profile">
      <ProfileCard />
      <TentangSekolah />
      <SambutanKepsek />
      <Outlet />
    </div>
  );
}
```
