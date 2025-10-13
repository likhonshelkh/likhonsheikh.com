# AGENTS.md

### A bilingual (Bangla + English) blog template powered by modern Next.js stack

---

## 🧩 Overview

**likhonsheikh.com** is a multilingual static + dynamic blog system built on the latest React and Next.js architecture.
It emphasizes:

* ✅ Accessibility (WCAG 2.2 + APCA compliant)
* ✅ SEO-first architecture
* ✅ Bangla typography optimization
* ✅ MDX-driven content authoring
* ✅ Automated typed routes + performance-tuned Turbopack builds

---

## ⚙️ Core Stack (2025)

| Category          | Version / Tech                                | Notes                                                              |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| Framework         | **Next.js 15.5** (stable) → **16 Beta ready** | Adds typed routes, partial pre-rendering & Turbopack by default    |
| Language Runtime  | **Node 20 LTS**                               | Stable test runner + permissions model + V8 v11.4                  |
| UI Layer          | **React 19.2**                                | New `<Activity>` component & `useEffectEvent` hook                 |
| Styling           | **Tailwind CSS v4.0**                         | CSS variables engine, @theme API, no PostCSS deps                  |
| Components        | **shadcn/ui (Oct 2025)**                      | Adds Spinner, Kbd, Button Group, Field, Item, Empty                |
| Content Authoring | **MDX 3.1.1**                                 | Async expressions + ES2024 support                                 |
| Docs Engine       | **Fumadocs v15 / v15.2**                      | FrameworkProvider multi-framework support + Tailwind 4 integration |
| Package Mgr       | PNPM 9                                        | Monorepo workspaces ready                                          |

---

## 🧠 Philosophy

* **Minimalism + Clarity** – Clean typography for Bangla and Latin scripts.
* **Speed + Static first** – ISR + Turbopack for sub-100 ms TTFB.
* **A11y by Design** – Compliant with WCAG 2.2 and APCA contrast rules (contrast ≥ 60 Lc).
* **Local first i18n** – Automatic locale detection for Bangla/English content.

---

## 🚀 Development Commands

```bash
# 1️⃣ Install deps
pnpm install

# 2️⃣ Dev mode with Turbopack
pnpm dev --turbo

# 3️⃣ Type generation for routes & layouts
pnpm next typegen

# 4️⃣ Build + Optimize
pnpm build

# 5️⃣ Local preview
pnpm start
```

🧩 Type checking: `pnpm typecheck`
🧪 Tests via Node test runner: `pnpm test`

---

## 🧾 Content Writing (MDX 3.1+)

**MDX features**

* ES2024 syntax allowed (Top-Level Await)
* Inline React components safe within `<Article>` wrapper
* Front-matter schema:

  ```yaml
  ---
  title: "Building a Bangla Web Font System"
  date: 2025-10-14
  lang: bn
  tags: [bangla, typography, font]
  ---
  ```
* Imports auto-scoped by content dir

---

## 🎨 Code Style & UI Guidelines

### TypeScript

* Use strict mode; prefer type imports (`import type { Props } from '...'`)
* Use `zod` schemas for front-matter validation

### React 19 Patterns

* Prefer `useEffectEvent` for event logic
* Avoid side effects in render phase
* Use `<Activity>` for async UI flows

### Tailwind 4

* Configure theme with `@theme {}` blocks inside `globals.css`
* Utility classes compose via `@apply`
* No manual color mixing → use `oklch()` palette

### shadcn/ui

* Adopt atomic imports:

  ```tsx
  import { Button, Spinner, Field } from "@/components/ui";
  ```
* Avoid global variant overrides; extend via `cva()` only.

---

## 🌐 Internationalization (Bangla Focus)

| Aspect      | Implementation                               |
| ----------- | -------------------------------------------- |
| Font        | Noto Sans Bengali UI + fallback SolaimanLipi |
| Line height | 1.75 for Bangla script                       |
| Direction   | Left-to-right (LTR)                          |
| Font Loader | Dynamic import via `next/font/local`         |
| SEO         | Localized `<link hreflang="bn">` tags        |

---

## 🧰 Testing & CI

* Unit + integration tests run on Node 20 LTS with the native test runner.
* Accessibility tests via `@axe-core/react`.
* PR workflow:

  1. Run `pnpm lint && pnpm typecheck && pnpm test`
  2. Verify partial pre-render (`next build --turbo`)
  3. Deploy to Vercel Preview

---

## 🏗️ Deployment

Hosted on **Vercel Edge Network**, using:

* Incremental Static Regeneration (ISR)
* Edge Middleware for i18n redirects
* Image Optimization via Next.js built-in loader

---

## 🔒 Accessibility & Performance Rules

* **Contrast ≥ 60 Lc** (APCA 2025 guideline)
* Use semantic HTML5 landmarks
* Min CLS ≤ 0.05, LCP < 1.5 s, INP < 200 ms
* Image alt texts mandatory
* Test with `lighthouse --accessibility`

---

## 🧩 Future Upgrades (Planned)

* **Next.js 16 stable** with full Partial Prerendering
* **React 20** (compiler-enabled transforms)
* **Tailwind 4.1** with CSS Layer Variables
* **Edge AI content summaries via Vercel AI SDK**

---

## 🧑‍💻 Contributing

1. Fork → `feature/*` branch
2. Commit using Conventional Commits format
3. Run `pnpm format && pnpm test`
4. Open PR → await review

---

## 📚 References / Citations

* Next.js 15.5 Release Notes
* React 19.2 Official Blog
* Tailwind CSS v4.0 Announcement
* MDX 3 Features
* Fumadocs v15 / 15.2 Release
* shadcn/ui October 2025 Update
* Node 20 LTS Kinsta Post

---

**© 2025 Likhon Sheikh – All rights reserved.**
Built for speed, clarity, and beautiful Bangla web typography.
