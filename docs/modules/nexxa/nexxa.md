---
name: Nexxa Module Documentation
relation: RULES.md → modules/nexxa/
description: Documentation for the Nexxa AI chat module (main chat interface)
type: editable
---

# Nexxa Module

## Overview

The `nexxa` module is the main chat AI page (`/`). It renders a greeting with animated text, a multi-functional chat input with model selector, chat messages, and shortcut chips. All display content is sourced from `nexxa.json`.

## Structure

```
src/modules/nexxa/
├── nexxa.tsx                  — Page component (orchestrator)
├── nexxa.json                 — Static data (strings, models, shortcuts, nav items)
├── css/nexxa.css              — Page styles (chat input, messages, animations)
└── components/
    ├── ChatHeader.tsx         — Header with history & settings buttons
    ├── ChatInput.tsx          — Textarea with model selector, file attach, mic, send
    ├── ChatMessage.tsx        — Single message bubble (user/assistant/typing)
    ├── Greeting.tsx           — "Selamat {waktu}, {nama}" with character-stagger animation
    └── ShortcutChip.tsx       — Clickable chip with icon + label
```

## Key patterns

- **Two states:** Empty state (greeting + input + shortcut chips) vs chat state (messages + input at bottom)
- **Chat context** via `useOutletContext<ChatContext>()` — receives `resetKey`, `onOpenSettings`, `font`
- **Reset:** When `resetKey` changes, messages clear
- **Mock send:** `handleSend()` adds user message, simulates AI response after 1.2s timeout

## Data flow

```
nexxa.json → nexxa.tsx (import data)
           → Sidebar.tsx (import data untuk navItems, alatItems, recents)
```
