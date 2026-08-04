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
├── css/cv-review.css           — Page styles (largest CSS file)
├── components/
│   ├── UploadForm.tsx          — Drag & drop + file select + analyze button
│   ├── LoadingScreen.tsx       — Scanner animation with stages & progress bar
│   ├── ReviewDashboard.tsx     — Score gauge, cards, quick stats
│   ├── SuggestionList.tsx      — Filterable suggestions with before/after
│   └── UsageGuide.tsx          — How-to-use guide with steps + tips
└── services/
    ├── reviewService.ts        — reviewCv() → POST /api/v1/nexxa/cv-review (auth + rate-limited), maps normalized BE output to ReviewResult
    └── cvFile.ts               — extractCvFile() → client-side PDF (pdfjs-dist) / DOCX (mammoth) / TXT / MD → {text, wordCount}
```

## Steps

1. **Upload** — Drag & drop zone (PDF/DOCX/TXT/MD), file validation, "Analisis CV" button
2. **Loading** — Animated scanner beam over document card, stage progression (3 stages), progress bar
3. **Result** — Score gauge (SVG arc), 4 cards (score, format, ATS, grammar), quick stats, suggestion list with category filters + before/after expand

## Data flow

1. `cv-review.tsx` calls `extractCvFile()` (lazy-loaded via dynamic import) to get `{text, wordCount}` from the uploaded file.
2. `reviewService.reviewCv(text, wordCount, 0)` sends `{cv_text, word_count, page_count}` to `POST /api/v1/nexxa/cv-review` with the JWT from `loginService.getToken()`.
3. BE returns normalized output (`audit_summary`, `metrics`, `grammar_issues`, `recommendations`, `strengths_detail`) which is mapped to the local `ReviewResult` shape.

## Error handling

- `401` → redirect to `/login` (expired/invalid session)
- `429` → rate-limit message surfaced in the upload step
- Extraction failures (empty/scanned PDF, unsupported type) → error message in the upload step
