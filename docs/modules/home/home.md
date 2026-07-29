---
name: Home Module Documentation
relation: RULES.md → modules/home/
description: Documentation for the home page module (landing page with hero, about, and programs sections)
type: editable
---

# Home Module

## Overview

The `home` module is the landing page (`/`). It composes three section components — `Hero`, `About`, and `Programs` — and renders them inside a single page wrapper. All display content is sourced from co-located JSON files under `components/data/`, never hardcoded in the components.

## Structure

```
src/modules/home/
├── home.tsx                 — Page component, composes Hero / About / Programs
├── home.json                — Module metadata (currently empty `{}`)
├── css/home.css             — Page styles
└── components/
    ├── Hero.tsx             — Hero banner section
    ├── About.tsx            — About + stats section
    ├── Programs.tsx         — Programs grid section
    └── data/
        ├── hero.json        — Hero title, subtitle, CTA links
        ├── about.json       — About heading, paragraph, stats
        └── programs.json    — Programs heading + items
```

## Rules

- Every component reads its display data from a JSON file in `components/data/`. No hardcoded strings in `.tsx`.
- `home.tsx` is a thin orchestrator — it only renders child section components.

## Examples

Rendering the page:

```tsx
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";

function Home() {
  return (
    <div className="home">
      <Hero />
      <About />
      <Programs />
    </div>
  );
}
```

Consuming JSON in a component:

```tsx
import data from "./data/hero.json";

function Hero() {
  return <h1>{data.title}</h1>;
}
```
