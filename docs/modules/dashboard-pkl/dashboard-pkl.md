---
name: Dashboard PKL Module Documentation
relation: RULES.md → modules/dashboard-pkl/
description: Documentation for the Dashboard PKL module (real API: list, create, cancel)
type: editable
---

# Dashboard PKL Module

## Overview

The `dashboard-pkl` module is the page (`/dashboard-pkl`) for managing PKL approval requests. It is wired to the real backend (`POST`/`GET /api/v1/approval/pkl`): users list their requests, create a new one, and cancel pending ones. The approval workflow (wali_kelas → bk → kesiswaan → kaprog) is rendered as a stepper with the signature stamp component.

## Structure

```
src/modules/dashboard-pkl/
├── dashboard-pkl.tsx              — Page component (list, create form, cancel form)
├── dashboard-pkl.json             — Static strings (status labels, forms, empty state)
├── css/dashboard-pkl.css          — Page styles incl. stamp statuses
├── components/
│   ├── NotificationFeed.tsx       — Derived notifications from decided steps
│   ├── ProgressStepper.tsx        — Sequential approval steps (approved/rejected/pending/needs_further_action)
│   └── Stamp.tsx                  — Signature stamp (DISETUJUI/DITOLAK/MENUNGGU/PERLU PERBAIKAN/DIBATALKAN)
└── services/
    └── pklService.ts              — listRequests() / createRequest() / cancelRequest() → /api/v1/approval/pkl (auth)
```

## Data flow

1. On mount, `pklService.listRequests()` fetches the user's requests (`GET /api/v1/approval/pkl`, JWT from `loginService.getToken()`).
2. Select a request chip → stepper maps BE `steps[]` (`position` → label, `status` → stamp) and `NotificationFeed` derives notifications from decided steps.
3. **Create**: form sends `{company, location, start_date, end_date, description}` to `POST /api/v1/approval/pkl`.
4. **Cancel**: only allowed when status is `pending` or `needs_further_action`; sends `{reason}` via `DELETE /api/v1/approval/pkl/{id}`.

## Error handling

- `401` → redirect to `/login`
- Other failures → inline error message on the page/form
