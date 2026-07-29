---
name: Module Documentation Rules
relation: index.md → modules1/
description: Boilerplate template and rules for agents writing documentation for a new module
type: Enforce
---

# Module Documentation Rules

Use this file as a boilerplate whenever you write documentation for a new module. Follow the structure below exactly.

## 1. Required frontmatter

Every module documentation file must start with this frontmatter block:

```yaml
---
name: {Module Name} Documentation
relation: {parent doc} → modules/{moduleName}/{path}
description: One-sentence summary of what this doc covers
type: editable
---
```

- `name` — Human-readable title. Use `{Module Name} Documentation` format.
- `relation` — The documentation chain that leads here. Always start from the nearest `Enforce` ancestor. Example: `RULES.md → modules/{moduleName}/`.
- `description` — Concise, one sentence. Describes the doc's content, not the module's purpose.
- `type` — Always `editable` for module docs (agents may modify examples and module-specific documentation).

## 2. Required sections

Every module documentation must contain these sections in order:

1. **# Title** — H1 matching the `name` field.
2. **Overview** — What the module is for (1-3 sentences).
3. **Structure** — A fenced code block showing the module's file tree.
4. **Rules** (if any) — Module-specific constraints not covered by `RULES.md`.
5. **Examples** — Concrete usage examples (component usage, service calls, data shape).

## 3. Module doc placement

- Place each module's documentation inside `docs/modules/{moduleName}/`.
- Use one file per concern: `{moduleName}.md` for the module overview, `components/components.md`, `services/services.md`.
- Do not nest module docs inside other modules. Each module is a sibling directory.

## 4. Naming convention

- Directory: `docs/modules/{moduleName}/` (PascalCase or kebab-case matching the source module).
- Files: `{moduleName}.md`, `components.md`, `services.md` — lowercase, descriptive.

## 5. Relation chain rules

- The first segment of `relation` must be a file you actually read before writing.
- Chain order: root → index.md → section rule → specific module.
- Example full chain: `README.md → index.md → RULES.md → modules/profile/`.
- Never reference a file you have not read.
