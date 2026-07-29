---
name: Berita Module Documentation
relation: RULES.md → modules/berita/
description: Documentation for the berita module (stub/placeholder page)
type: editable
---

# Berita Module

## Overview

The `berita` module is a **stub** page for `/berita` (news). It currently renders a placeholder heading and has no real content yet.

## Structure

```
src/modules/berita/
├── berita.tsx          — Page component (placeholder)
├── berita.json         — Module metadata (empty `{}`)
└── css/berita.css      — Page styles (empty)
```

## Status

Placeholder only. Once content is added, move display data into `berita.json` (or `components/data/`) per the static-data rule, and extract any reusable UI into `components/`.
