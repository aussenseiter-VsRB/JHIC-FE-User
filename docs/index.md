---
name: Documentation Index
relation: README.md
description: Master table of contents with section-specific rules and folder structure overview
type: Enforce
---

# Documentation Index

## Structure

```
docs/
├── core/                   # System-wide ground truth (all Enforce)
│   ├── systemDesign.md     — Architecture and system design (aktual)
│   ├── design.md           — Design decisions and rationale
│   ├── desain.md           — Design context: dependencies, styling, animation patterns
│   ├── codingPrinciple.md  — Code standards and conventions
│   └── SKILLS.md           — Agent skills and subagent reference
└── modules/                # Module patterns (Enforce rules + editable examples)
    ├── RULES.md            — Module creation rules (Enforce)
    ├── docsRules.md        — Module documentation boilerplate (Enforce)
    ├── berita/berita.md    — Stub module doc (editable, belum diimplementasi)
    ├── fasilitas/fasilitas.md — Stub module doc (editable, belum diimplementasi)
    ├── home/
    │   ├── home.md         — Home module doc (editable, belum diimplementasi)
    │   └── components.md   — Home components doc (editable, belum diimplementasi)
    ├── jurusan/
    │   ├── jurusan.md      — Jurusan module doc (editable, belum diimplementasi)
    │   ├── components.md   — Jurusan components doc (editable, belum diimplementasi)
    │   └── services.md     — Jurusan services doc (editable, belum diimplementasi)
    ├── ppdb/ppdb.md        — Stub module doc (editable, belum diimplementasi)
    ├── profile/
    │   ├── profile.md      — Profile module doc (editable, belum diimplementasi)
    │   └── components.md   — Profile components doc (editable, belum diimplementasi)
    └── examples/           — Editable pattern references (NOT real docs)
        ├── profile/        — Example module with components/ and services/
        ├── profileEdit/
        └── profileSettings/
```

## Section-specific rules

### docs/core/

- All `type: Enforce`. Read these before any architectural or coding decisions.
- `systemDesign.md` describes the **current** architecture. Source tree matches the description.
- `desain.md` is the **primary design reference** — read this first for dependencies, animation patterns, styling, and module status.
- `design.md` records past decisions — do not contradict them without updating the file.

### docs/modules/

- `RULES.md` is `type: Enforce`. All modules must follow its rules.
- `docsRules.md` is `type: Enforce`. It is the boilerplate template for writing module documentation.
- `berita/`, `fasilitas/`, `home/`, `jurusan/`, `ppdb/`, `profile/` — **stub docs** for modules that are planned but not yet implemented. Editable.
- `examples/` contains example modules (`profile/`, `profileEdit/`, `profileSettings/`). These are `type: editable` pattern references, NOT real documentation.
- **Existing implemented modules** (nexxa, search, cv-review, timeline-agit, dashboard-pkl) are documented in `docs/core/desain.md`.
- Create new modules at the same level as `examples/`, not inside it.
```
