# likhonsheikh.com

A bilingual (Bangla + English) blog template built on the modern Next.js 15.5 stack. It ships with React 19, Tailwind CSS 4, MDX-powered content, and accessible shadcn/ui components tuned for Bangla typography.

## Features

- **Static + dynamic rendering** – Locale-aware routing with middleware driven redirects and typed route segments.
- **MDX 3 content pipeline** – Front matter validated through Zod with reading time, tag extraction, and remark GFM support.
- **shadcn/ui design system** – Reusable button, badge, and card primitives built to APCA ≥ 60 contrast requirements.
- **URL-persisted filters** – Tag filters store state via [`nuqs`](https://github.com/47ng/nuqs) so back/forward navigation stays in sync.
- **Bangla-first typography** – Noto Sans Bengali + Latin font stack, generous hit targets, and `:focus-visible` rings across the UI.

## Getting started

```bash
pnpm install
pnpm dev
```

The development server defaults to `http://localhost:3000` and immediately redirects visitors to the detected locale (`/en` or `/bn`).

## Available scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Run the Next.js development server. |
| `pnpm build` | Create an optimized production build. |
| `pnpm start` | Start the production server. |
| `pnpm lint` | Lint the project with ESLint. |
| `pnpm typecheck` | Run the TypeScript compiler in no-emit mode. |
| `pnpm test` | Execute the Node.js test runner with TypeScript support. |
| `pnpm next:typegen` | Generate typed routes for the App Router. |

## Content authoring

Add MDX posts under `src/content/<locale>`. Each file must include the following front matter:

```yaml
---
title: "Building a Bangla web font system"
summary: "Short description for the listings"
date: 2025-01-15
tags: [typography, bangla]
---
```

Posts can embed React components and fenced code blocks. Reading time, localized publish dates, and unique tags are generated automatically.

## Deployment

A `vercel.json` configuration is included for Vercel Edge deployment in the `bom1` region with hardened response headers. Locale redirects run through edge middleware to keep keyboard interactions consistent.
