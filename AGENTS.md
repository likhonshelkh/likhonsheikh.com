# AGENTS.md

### A bilingual (Bangla + English) blog template powered by modern Next.js stack

---

## 🧩 Overview

**likhonsheikh.com** is a multilingual static + dynamic blog system built on the latest React and Next.js architecture. It emphasizes:

* ✅ Accessibility (WCAG 2.2 + APCA compliant)
* ✅ SEO-first architecture
* ✅ Bangla typography optimization
* ✅ MDX-driven content authoring
* ✅ Automated typed routes + performance-tuned Turbopack builds
* ✅ Plate.js rich text editor integration
* ✅ ReUI component system (Radix UI + Tailwind CSS v4)

---

## ⚙️ Core Stack (2025)

| Category | Version / Tech | Notes |
|----------|---------------|-------|
| Framework | **Next.js 15.5** (stable) → **16 Beta ready** | Typed routes, partial pre-rendering & Turbopack |
| Language Runtime | **Node 20 LTS** | Stable test runner + V8 v11.4 |
| UI Layer | **React 19.2** | New `<Activity>` component & `useEffectEvent` hook |
| Styling | **Tailwind CSS v4.0** | CSS variables engine, @theme API |
| Components | **shadcn/ui + ReUI** | Extended component library with Radix UI + Base UI |
| Content | **MDX 3.1.1** | Async expressions + ES2024 support |
| Editor | **Plate.js** | Rich text editing with plugin system |
| Docs | **Fumadocs v15 / v15.2** | Multi-framework support |
| Package Mgr | **PNPM 9** | Monorepo workspaces ready |

---

## 🧠 Philosophy

* **Minimalism + Clarity** – Clean typography for Bangla and Latin scripts
* **Speed + Static first** – ISR + Turbopack for sub-100 ms TTFB
* **A11y by Design** – WCAG 2.2 and APCA contrast rules (contrast ≥ 60 Lc)
* **Local first i18n** – Automatic locale detection for Bangla/English
* **Mobile-first** – Responsive, lightweight UI with optimized bundle sizes

---

## 🚀 Quick Start

```bash
# 1️⃣ Install dependencies
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

### Additional Commands

```bash
# Type checking
pnpm typecheck

# Tests via Node test runner
pnpm test

# Format code
pnpm format
```

---

## 📝 Content Writing (MDX 3.1+)

### MDX Features

* ES2024 syntax with Top-Level Await
* Inline React components safe within `<Article>` wrapper
* Front-matter schema validation with Zod

### Front-matter Example

```yaml
---
title: "Building a Bangla Web Font System"
date: 2025-10-14
lang: bn
tags: [bangla, typography, font]
author: Likhon Sheikh
---
```

### Content Structure

```
content/
├── posts/
│   ├── bn/          # Bangla posts
│   └── en/          # English posts
├── pages/
└── docs/
```

---

## ✍️ Plate.js Editor Integration

### Installation

```bash
npm i platejs/react
```

### Basic Editor Setup

```ts
import { createPlateEditor } from 'platejs/react';
import { HeadingPlugin, ListPlugin, BoldPlugin } from 'platejs';

const editor = createPlateEditor({
  plugins: [HeadingPlugin, ListPlugin, BoldPlugin],
  value: [
    {
      type: 'p',
      children: [{ text: 'Start writing...' }],
    },
  ],
});
```

### Async Initial Value

```tsx
function AsyncEditor() {
  const editor = usePlateEditor({
    value: async () => {
      const response = await fetch('/api/document');
      const data = await response.json();
      return data.content;
    },
    autoSelect: 'end',
    onReady: ({ editor, value }) => {
      console.log('Editor ready:', value);
    },
  });

  if (!editor.children.length) return <div>Loading…</div>;

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor />
      </EditorContainer>
    </Plate>
  );
}
```

### Key Features

* Rich text formatting (Bold, Italic, Underline)
* Headings and Lists
* Image and Media embedding
* Tables and Code blocks
* Custom node types
* Plugin-based architecture
* Real-time collaboration support

---

## 🎨 ReUI Component System

### Installation

#### Add Registry to `components.json`

```json
{
  "registries": {
    "@reui": "https://reui.io/r/{name}.json"
  }
}
```

#### Install Base Dependencies

```bash
# Radix UI
npm i radix-ui

# Base UI
npm i @base-ui-components/react

# Motion for animations
npm i motion

# Tailwind CSS animations
npm i tw-animate-css
```

### Install Components

```bash
# Install blocks
pnpm dlx shadcn@latest add @reui/statistic-card-1

# Install components
pnpm dlx shadcn@latest add @reui/alert
pnpm dlx shadcn@latest add @reui/button
pnpm dlx shadcn@latest add @reui/card
```

### Global Styles Setup

Add to your `globals.css`:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

/** Dark Mode Variant **/
@custom-variant dark (&:is(.dark *));

/** Colors **/
:root {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --background: var(--color-white);
  --foreground: var(--color-zinc-950);
  --primary: var(--color-blue-500);
  --primary-foreground: var(--color-white);
  --border: oklch(94% 0.004 286.32);
  --radius: 0.5rem;
}

.dark {
  --background: var(--color-zinc-950);
  --foreground: var(--color-zinc-50);
  --primary: var(--color-blue-600);
  --border: var(--color-zinc-800);
}

/** Theme Setup **/
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-border: var(--border);
  --radius-lg: var(--radius);
}

/** Global Styles **/
@layer base {
  * {
    @apply border-border;
  }
  
  *:focus-visible {
    @apply outline-ring rounded-xs shadow-none outline-2 outline-offset-3 transition-none!;
  }
}

/** Smooth scroll **/
html {
  scroll-behavior: smooth;
}
```

### Font Setup (Next.js)

```tsx
import { Inter } from 'next/font/google';
import { cn } from '@/utils/cn';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={cn('text-base antialiased', inter.className)}>
        {children}
      </body>
    </html>
  );
}
```

---

## 🎨 Code Style & Guidelines

### TypeScript

* Use strict mode
* Prefer type imports: `import type { Props } from '...'`
* Use Zod schemas for validation

### React 19 Patterns

* Prefer `useEffectEvent` for event logic
* Avoid side effects in render phase
* Use `<Activity>` for async UI flows

### Tailwind 4

* Configure theme with `@theme {}` blocks
* Use core utility classes only
* Use `oklch()` for color palette

### Component Structure

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function Example() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 🌐 Internationalization (Bangla Focus)

| Aspect | Implementation |
|--------|---------------|
| Font | Noto Sans Bengali UI + SolaimanLipi fallback |
| Line height | 1.75 for Bangla script |
| Direction | Left-to-right (LTR) |
| Font Loader | Dynamic import via `next/font/local` |
| SEO | Localized `<link hreflang="bn">` tags |

### Bangla Font Setup

```tsx
import localFont from 'next/font/local';

const banglaSans = localFont({
  src: './fonts/NotoSansBengali-Regular.ttf',
  variable: '--font-bangla',
});

export default function Layout({ children }) {
  return (
    <html lang="bn" className={banglaSans.variable}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🧰 Testing & CI

* Unit + integration tests with Node 20 LTS test runner
* Accessibility tests via `@axe-core/react`
* PR workflow:
  1. `pnpm lint && pnpm typecheck && pnpm test`
  2. Verify partial pre-render: `next build --turbo`
  3. Deploy to Vercel Preview

### Test Example

```js
import { test } from 'node:test';
import assert from 'node:assert';

test('component renders correctly', () => {
  // Test implementation
  assert.ok(true);
});
```

---

## 🏗️ Deployment

Hosted on **Vercel Edge Network**:

* Incremental Static Regeneration (ISR)
* Edge Middleware for i18n redirects
* Image Optimization via Next.js built-in loader
* Automatic performance monitoring

### Vercel Configuration

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["sin1", "hnd1"]
}
```

---

## 🔒 Accessibility & Performance

### Accessibility Rules

* **Contrast ≥ 60 Lc** (APCA 2025 guideline)
* Semantic HTML5 landmarks
* Image alt texts mandatory
* Keyboard navigation support
* Screen reader compatibility

### Performance Targets

* **CLS** ≤ 0.05
* **LCP** < 1.5s
* **INP** < 200ms
* **TTFB** < 100ms

### Testing

```bash
# Lighthouse accessibility audit
lighthouse --accessibility https://likhonsheikh.com

# Performance audit
pnpm dlx unlighthouse --site https://likhonsheikh.com
```

---

## 🧩 Key Components

### UI Components (Radix UI)

* Alert, Alert Dialog
* Avatar, Avatar Group
* Badge, Button
* Card, Carousel
* Checkbox, Combobox
* Dialog, Drawer
* Form, Input
* Navigation Menu
* Popover, Select
* Table, Tabs
* Tooltip, Toast

### Base UI Components

* Accordion, Autocomplete
* Checkbox, Collapsible
* Menu, Menubar
* Number Field, Phone Input
* Progress, Radio Group
* Slider, Switch
* Toolbar, Toggle

### Animated Components

* Marquee, GitHub Button
* Typing Text, Word Rotate
* Counting Number, Sliding Number
* Text Reveal, Gradient Background
* Hover Background, Shimmering Text

### Advanced Components

* Data Grid (TanStack Table)
* File Upload
* Kanban Board
* Rating, Stepper
* Scrollspy, Sortable
* Resizable Panels

---

## 🧩 Future Upgrades (Planned)

* **Next.js 16 stable** with full Partial Prerendering
* **React 20** (compiler-enabled transforms)
* **Tailwind 4.1** with CSS Layer Variables
* **Edge AI content summaries** via Vercel AI SDK
* **Real-time collaboration** with Plate.js
* **Enhanced Bangla NLP** features

---

## 🧑‍💻 Contributing

1. Fork → create `feature/*` branch
2. Commit using Conventional Commits format
3. Run `pnpm format && pnpm test`
4. Open PR → await review

### Conventional Commits

```bash
feat: add new blog post component
fix: resolve Bangla font loading issue
docs: update installation guide
style: format code with Prettier
refactor: optimize image loading
test: add unit tests for editor
chore: update dependencies
```

---

## 📚 Credits & References

### Core Technologies

* [React](https://react.dev/) - UI library
* [Next.js](https://nextjs.org) - React framework
* [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
* [MDX](https://mdxjs.com) - Markdown for component era

### Component Libraries

* [Radix UI](https://www.radix-ui.com) - Accessible primitives
* [Base UI](https://base-ui.netlify.app) - Headless components
* [shadcn/ui](https://ui.shadcn.com) - Re-usable components
* [Lucide Icons](https://lucide.dev) - Icon library

### Editor & Tools

* [Plate.js](https://platejs.org) - Rich text editor
* [TanStack Table](https://tanstack.com/table) - Data tables
* [Motion](https://motion.dev/) - Animation library
* [Zod](https://zod.dev) - Schema validation

### Documentation

* [Fumadocs](https://fumadocs.vercel.app) - Docs framework
* [PNPM](https://pnpm.io) - Package manager

---

## 📄 License

**© 2025 Likhon Sheikh – All rights reserved.**

Built for speed, clarity, and beautiful Bangla web typography.

---

## 🔗 Useful Links

* **Documentation**: [Plate.js Docs](https://platejs.org/docs)
* **Registry**: [ReUI Components](https://reui.io/r/registry.json)
* **Component Docs**: [ReUI Docs Index](https://reui.io/r/registry-docs.json)
* **Support**: [GitHub Issues](https://github.com/likhonshelkh/likhonsheikh.com/issues)

---

**Last Updated**: October 14, 2025
