---
name: Design Context
relation: index.md → core/
description: Actual design context, styling approach, animation patterns, and dependency usage
type: Enforce
---

# Design Context

## Design DNA

Aplikasi ini adalah **AI chatbot interface** bernama **Nexxa AI** dengan dark-first, glassmorphism-leaning aesthetic. Warna aksen ungu (`#c084fc` / `#a855f7`) mendominasi seluruh UI — tombol, hover state, glow, dan elemen aktif.

> Latar belakang gelap pekat (`#18181b`), surface semi-transparan dengan backdrop blur, border subtle, dan bayangan lembut. Tujuan: terasa modern, immersif, fokus ke konten percakapan.

### Type system (signature direction: "arsip sekolah yang berdenyut")

- **Display — Space Grotesk Variable** (`--font-display`): greeting, judul halaman, wordmark. Dipakai dengan restraint (hanya ukuran besar).
- **Body — Instrument Sans Variable** (`--font-body`): teks panjang bahasa Indonesia (default).
- **Utility "arsip" — Spline Sans Mono Variable** (`--font-mono`): semua data/rekor — nomor surat, tanggal, timestamp, persen, nama model AI, char counter, badge status, kbd hint. Prinsip: "rekor administrasi dicetak dengan mesin ketik".
- Font dimuat via `@fontsource-variable/*` (bundle lokal, tanpa CDN).

### Signature element: stempel persetujuan (Dashboard PKL)

Status persetujuan di `ProgressStepper` direpresentasikan sebagai **stempel elips** ala cap stempel Indonesia yang "tercap" (scale overshoot + rotasi via framer-motion):
- `approved` → stempel tinta ungu `DISETUJUI` (`--tint-stamp` background, glow halus).
- `pending` → stempel outline putus-putus `MENUNGGU`.
- Komponen: `src/modules/dashboard-pkl/components/Stamp.tsx`. Hormati `prefers-reduced-motion` via `useReducedMotion`.

---

## Dependencies (terpasang & digunakan)

| Package | Versi | Kegunaan |
|---|---|---|
| `react` | ^19.2.7 | UI framework |
| `react-dom` | ^19.2.7 | DOM rendering |
| `react-router-dom` | ^7.18.2 | Client-side routing (declarative route config di `src/core/routes.tsx`) |
| `framer-motion` | ^12.43.0 | Semua animasi: page transition, stagger, spring, hover/tap, AnimatePresence |
| `lucide-react` | ^1.27.0 | Semua ikon di seluruh aplikasi (icons sebagai komponen) |
| `postcss-nested` | ^8.0.0 | Nesting CSS (`.parent { &-child {} }`) di file `.css` |
| `@fontsource-variable/space-grotesk` | ^5.x | Display font (bundled, variable) |
| `@fontsource-variable/instrument-sans` | ^5.x | Body font (bundled, variable) |
| `@fontsource-variable/spline-sans-mono` | ^5.x | Utility/mono font (bundled, variable) |

### Tidak digunakan (tapi terinstal di devDependencies)
- `typescript` ~6.0 — type checking
- `vite` ^8.1.1 — bundler
- `eslint` — linting
- `@types/node` — type Node.js

---

## Pola Animasi (framer-motion)

Semua animasi dikelola oleh **framer-motion** — tidak ada CSS transition/animations untuk interaksi kompleks.

### Variant patterns yang konsisten

1. **Stagger children** — container punya `variants` dengan `staggerChildren`, child pakai `fadeUp` / `slideIn`
   - `hidden → visible` via `initial="hidden" animate="visible"`
   - Durasi stagger: `0.08`–`0.15` per child

2. **Page / step transitions** — tiap page pake pattern yang sama:
   ```
   hidden: { opacity: 0, y: 16 }
   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
   exit: { opacity: 0, y: -16, transition: { duration: 0.2 } }
   ```

3. **Hover/Tap** — `whileHover` + `whileTap` langsung di elemen (tanpa variants):
   - Button hover: `{ scale: 1.05 }` – `{ scale: 1.15 }`
   - Icon hover: `{ rotate: -10, scale: 1.15 }`
   - Tap: `{ scale: 0.9 }` – `{ scale: 0.95 }`
   - Spring config kalo perlu: `{ type: "spring", stiffness: 300, damping: 20 }`

4. **AnimatePresence** — untuk mount/unmount transition (modal, steps, clear button)

5. **Spring loading** — icon scale + rotate pakai spring:
   ```
   hidden: { opacity: 0, scale: 0.5, rotate: -45 }
   visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
   ```

### Yang TIDAK pakai framer-motion
- **CSS keyframe animations** — hanya untuk typing indicator (bounce balls), scanner beam, pulse ring, dan placeholder cycle
- **CSS transitions** — hanya untuk border-color, background-color, color (kasus sederhana)

---

## Styling Approach

- **CSS modules tidak dipakai** — semua styling pakai file `.css` global dengan class name convention
- **`postcss-nested`** untuk nesting (`.parent { &-child {} }`)
- **CSS custom properties** di `index.css` untuk warna, radius, shadow (semua dark-theme color)
- Tiap module punya `css/{moduleName}.css` diimport langsung di page component

### CSS convention
```css
/* ── Section comment ── */
.component {
  /* ... */
  &-child { }  /* nesting via postcss-nested */
}
```

### Color system (index.css)
```
--bg-page: #18181b        (dark solid bg)
--bg-surface: rgba(32,32,36,0.75)  (glass card bg)
--bg-elevated: rgba(32,32,36,0.85)
--bg-glass: rgba(32,32,36,0.9)

--clr-purple: #c084fc      (primary accent)
--clr-purple-dark: #a855f7
--clr-violet-deep: #7c3aed  (depth gradient / aurora)
--tint-stamp: rgba(168,85,247,0.16)  (ink stempel)
--clr-green: #22c55e       (success)
--clr-red: #f87171         (error)
--clr-yellow: #facc15      (warning)
--clr-blue: #38bdf8        (info)

--text-primary: #f4f4f5
--text-secondary: #e4e4e7
--text-muted: #a1a1aa
--text-subdued: #71717a

--border-default: rgba(255,255,255,0.08)
--border-hover: rgba(255,255,255,0.12)
--border-subtle: rgba(255,255,255,0.15)

--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px

--shadow-card: 0 8px 32px rgba(0,0,0,0.2)
--shadow-glow: 0 0 24px rgba(192,132,252,0.15)
--shadow-btn: 0 4px 20px rgba(168,85,247,0.25)
--shadow-btn-hover: 0 6px 28px rgba(168,85,247,0.4)
```

---

## Module Architecture (current)

```
src/modules/{moduleName}/
├── {moduleName}.tsx       — Page component
├── css/{moduleName}.css   — Module styles
├── {moduleName}.json      — Static data
├── components/            — Module-scoped UI components
└── services/              — API calls & business logic (optional)
```

### Existing modules

| Module | Route | Status |
|---|---|---|
| `nexxa/` | `/` (index) | Complete — Chat AI utama dengan greeting, input, messages, shortcut chips, model selector + ambient aurora |
| `search/` | `/search` | Complete — Pencarian riwayat konsultasi dengan highlight & filter |
| `dashboard-pkl/` | `/dashboard-pkl` | Complete — Status surat PKL: NotificationFeed + ProgressStepper (signature: stempel `Stamp.tsx`) |
| `cv-review/` | `/cv-review` | Complete — Upload CV → Loading scanner → Review dashboard + suggestions |
| `timeline-agit/` | `/timeline-agit` | Complete — Timeline interaktif dengan animated phase cards |

### Module data patterns
- Tiap module baca data dari `{moduleName}.json` (bukan hardcoded)
- Module bisa punya `components/` untuk sub-komponen
- Module bisa punya `services/` untuk logic (cv-review punya `reviewService.ts`)

---

## Global Components

```
src/components/
├── sidebar/
│   ├── Sidebar.tsx       — Navigasi utama, recent items, user footer
│   └── RecentItem.tsx    — Tombol riwayat konsultasi
└── settings/
    ├── SettingsModal.tsx  — Modal pengaturan akun & tampilan
    ├── settings.css
    └── settingsData.json  — Data statis modal
```

**Aturan:** Global components hanya dipakai di `src/core/layout.tsx`. Module-specific components tinggal di module masing-masing.

---

## Layout & Routing

- **`src/core/layout.tsx`** — Layout dengan sidebar + `<Outlet />` + SettingsModal
- **`src/core/routes.tsx`** — Route config array dengan `Layout` sebagai parent
- **`App.tsx`** — `createBrowserRouter(routes)` → `<RouterProvider />`

### Layout features
- Sidebar collapsible (desktop) / mobile drawer dengan backdrop
- Font toggle (sans-serif / serif) via `<ChatContext>` outlet
- Settings modal dengan sections: Akun & Tampilan
- Reset chat via outlet context

---

## Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `max-width: 1023px` | Tablet landscape — grid collapse |
| `max-width: 768px` | Tablet/HP — sidebar jadi drawer, padding mengecil |
| `max-width: 480px` | HP kecil — font size turun, spacing minimal |

---

## Data Flow

1. Static data → `{module}.json` → import langsung di komponen
2. API simulation → `services/` dengan mock timeout (cv-review `analyzeCv()`)
3. State management → `useState` + `useCallback` lokal (belum butuh global state)
4. Outlet context → Layout kasih `ChatContext` (resetKey, font, onOpenSettings) ke child routes
