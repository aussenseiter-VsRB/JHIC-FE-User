---
name: Search Module Documentation
relation: RULES.md → modules/search/
description: Documentation for the search module (consultation history search)
type: editable
---

# Search Module

## Overview

The `search` module is the search page (`/search`). It provides a search input to filter through consultation history chats with real-time text highlighting.

## Structure

```
src/modules/search/
├── search.tsx             — Page component
├── search.json            — Static data (chat history items)
└── css/search.css         — Page styles
```

## Key behavior

- Auto-focuses search input on mount
- Filters `data.chats` by `title` and `snippet` (case-insensitive)
- `highlightMatch()` splits text by query and wraps matches in `<mark>`
- Clear button with animation via AnimatePresence
- Results count display: `{filtered} dari {total} konsultasi`
- Empty state when no results match

## Animations

- Header stagger (title, input, count)
- Result items: fade-up entrance, fade-down exit
- Icons: scale + rotate on hover
