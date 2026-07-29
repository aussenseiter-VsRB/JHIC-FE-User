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
│   ├── systemDesign.md     — Architecture and system design (intended)
│   ├── design.md           — Design decisions and rationale
│   ├── codingPrinciple.md  — Code standards and conventions
│   └── SKILLS.md           — Agent skills and subagent reference
└── modules/                # Module patterns (Enforce rules + editable examples)
    ├── RULES.md            — Module creation rules (Enforce)
    ├── docsRules.md        — Module documentation boilerplate (Enforce)
    ├── berita/berita.md    — Stub module doc (editable)
    ├── fasilitas/fasilitas.md — Stub module doc (editable)
    ├── home/
    │   ├── home.md         — Home module doc (editable)
    │   └── components.md   — Home components doc (editable)
    ├── jurusan/
    │   ├── jurusan.md      — Jurusan module doc (editable)
    │   ├── components.md   — Jurusan components doc (editable)
    │   └── services.md     — Jurusan services doc (editable)
    ├── ppdb/ppdb.md        — Stub module doc (editable)
    ├── profile/
    │   ├── profile.md      — Profile module doc (editable)
    │   └── components.md   — Profile components doc (editable)
    └── examples/           — Editable pattern references (NOT real docs)
        ├── profile/        — Example module with components/ and services/
        ├── profileEdit/
        └── profileSettings/
```

## Section-specific rules

### docs/core/

- All `type: Enforce`. Read these before any architectural or coding decisions.
- `systemDesign.md` describes the **intended** architecture. The source tree does not yet reflect it — treat it as the blueprint, not a description of what exists.
- `design.md` records past decisions — do not contradict them without updating the file.

### docs/modules/

- `RULES.md` is `type: Enforce`. All modules must follow its rules. These rules will apply once module creation begins.
- `docsRules.md` is `type: Enforce`. It is the boilerplate template for writing module documentation.
- `examples/` contains example modules (`profile/`, `profileEdit/`, `profileSettings/`). These are `type: editable` pattern references, NOT real documentation.
- Create new modules at the same level as `examples/`, not inside it.
```
