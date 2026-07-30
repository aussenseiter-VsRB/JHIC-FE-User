---
name: CV Review Module Documentation
relation: RULES.md → modules/cv-review/
description: Documentation for the CV Review module (upload, scan, review dashboard)
type: editable
---

# CV Review Module

## Overview

The `cv-review` module is a multi-step page (`/cv-review`) for uploading and analyzing CV documents. It has 3 steps: Upload → Loading/Scanning → Review Dashboard with score gauge, format/ATS/grammar assessment, and suggestions with before/after comparisons.

## Structure

```
src/modules/cv-review/
├── cv-review.tsx               — Page component (step orchestrator)
├── cv-review.json              — Static data (upload, loading, result strings)
├── css/cv-review.css           — Page styles (1572 lines — largest CSS file)
├── components/
│   ├── UploadForm.tsx          — Drag & drop + file select + analyze button
│   ├── LoadingScreen.tsx       — Scanner animation with stages & progress bar
│   ├── ReviewDashboard.tsx     — Score gauge, cards, quick stats
│   ├── SuggestionList.tsx      — Filterable suggestions with before/after
│   └── UsageGuide.tsx          — How-to-use guide with steps + tips
└── services/
    └── reviewService.ts        — Mock API: analyzeCv() returns ReviewResult after 3.6s
```

## Steps

1. **Upload** — Drag & drop zone, file validation, "Analisis CV" button
2. **Loading** — Animated scanner beam over document card, stage progression (3 stages), progress bar
3. **Result** — Score gauge (SVG arc), 4 cards (score, format, ATS, grammar), quick stats, suggestion list with category filters + before/after expand

## Data types (reviewService.ts)

```typescript
interface ReviewResult {
  score: number;         // 0-100
  summary: string;
  strengths: string[];
  weaknesses: string[];
  completeness: { contact, profile, experience, education, skills };
  grammar: { issues, details };
  format: { score, details };
  ats: { status, issues };
  quickStats: { pages, words, lastUpdated };
  suggestions: SuggestionItem[];
}
```
