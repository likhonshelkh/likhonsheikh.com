# AGENTS.md

### A bilingual (Bangla + English) blog template powered by modern Next.js stack


Also Must Important We can do add a post editor using Editor Configuration

Source: https://platejs.org/docs/editor

## Registry URLs

- All components index: https://platejs.org/r/registry.json
- All docs index: https://platejs.org/r/registry-docs.json
- Component content: https://platejs.org/r/{name}

Note: Any <ComponentSource name="..." /> or <ComponentPreview name="..." /> in the documentation can be accessed at https://platejs.org/r/{name}

I'm going to ask questions from the following Plate documentation:

---


This guide covers the configuration options for the Plate editor, including basic setup, plugin management, and advanced configuration techniques.

## Basic Editor Configuration

To create a basic Plate editor, you can use the `createPlateEditor` function, or `usePlateEditor` in a React component:

```ts
import { createPlateEditor } from 'platejs/react';

const editor = createPlateEditor({
  plugins: [HeadingPlugin],
});
```

### Initial Value

Set the initial content of the editor:

```ts
const editor = createPlateEditor({
  value: [
    {
      type: 'p',
      children: [{ text: 'Hello, Plate!' }],
    },
  ],
});
```

You can also initialize the editor with an HTML string and the associated plugins:

```ts
const editor = createPlateEditor({
  plugins: [BoldPlugin, ItalicPlugin],
  value: '<p>This is <b>bold</b> and <i>italic</i> text!</p>',
});
```

For a comprehensive list of plugins that support HTML string deserialization, refer to the [Plugin Deserialization Rules](/docs/html#plugin-deserialization-rules) section.

### Async Initial Value

If you need to fetch the initial value asynchronously (e.g., from an API), you can pass an async function directly to the `value` option:

```tsx
function AsyncEditor() {
  const editor = usePlateEditor({
    value: async () => {
      // Simulate fetching data from an API
      const response = await fetch('/api/document');
      const data = await response.json();
      return data.content;
    },
    autoSelect: 'end',
    onReady: ({ editor, value }) => {
      console.info('Editor ready with loaded value:', value);
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

### Adding Plugins

You can add plugins to your editor by including them in the `plugins` array:

```ts
const editor = createPlateEditor({
  plugins: [HeadingPlugin, ListPlugin],
});
```

### Max Length

Set the maximum length of the editor:

```ts
const editor = createPlateEditor({
  maxLength: 100,
});
```

## Advanced Configuration
Install Components
Initialize a React Project

ReUI is fully compatible with Shadcn and extends it with advanced component options. To get started, set up your React project following the Shadcn Installation Guide.
If you already have a project compatible with Shadcn, you can skip this guide.
Install Radix UI

Follow Radix UI Installation Guide to install Radix UI package.
npm i radix-ui
Install Base UI

Follow Base UI Installation Guide to install Base UI package.
npm i @base-ui-components/react
Install Motion

To use animated effects, follow Motion Installation Guide to install Motion.
npm i motion
Integrate ReUI Styles

Add below code into your entry css file globals.css:
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
  --card: var(--color-white);
  --card-foreground: var(--color-zinc-950);
  --popover: var(--color-white);
  --popover-foreground: var(--color-zinc-950);
  --primary: var(--color-blue-500);
  --primary-foreground: var(--color-white);
  --secondary: var(--color-zinc-100);
  --secondary-foreground: var(--color-zinc-900);
  --muted: var(--color-zinc-100);
  --muted-foreground: var(--color-zinc-500);
  --accent: var(--color-zinc-100);
  --accent-foreground: var(--color-zinc-900);
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);
  --chart-1: var(--color-blue-500);
  --chart-2: var(--color-green-500);
  --chart-3: var(--color-yellow-500);
  --chart-4: var(--color-red-500);
  --chart-5: var(--color-purple-500);
  --border: oklch(94% 0.004 286.32); /* between --color-zinc-100 and --color-zinc-200 */
  --input: var(--color-zinc-200);
  --ring: var(--color-zinc-400);
  --radius: 0.5rem;
}
 
.dark {
  --background: var(--color-zinc-950);
  --foreground: var(--color-zinc-50);
  --card: var(--color-zinc-950);
  --card-foreground: var(--color-zinc-50);
  --popover: var(--color-zinc-950);
  --popover-foreground: var(--color-zinc-50);
  --primary: var(--color-blue-600);
  --primary-foreground: var(--color-white);
  --secondary: var(--color-zinc-800);
  --secondary-foreground: var(--color-zinc-50);
  --muted: var(--color-zinc-900);
  --muted-foreground: var(--color-zinc-500);
  --accent: var(--color-zinc-900);
  --accent-foreground: var(--color-zinc-50);
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);
  --chart-1: var(--color-blue-500);
  --chart-2: var(--color-green-500);
  --chart-3: var(--color-yellow-500);
  --chart-4: var(--color-red-500);
  --chart-5: var(--color-purple-500);
  --border: var(--color-zinc-800);
  --input: var(--color-zinc-800);
  --ring: var(--color-zinc-600);
}
 
/** Theme Setup **/
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
 
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
 
  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }
 
  @keyframes marquee-vertical {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - var(--gap)));
    }
  }
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
 
/** Custom Scrollbar **/
@layer base {
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--input);
    border-radius: 5px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--input) transparent;
  }
}
 
/** Custom Container **/
@utility container {
  margin-inline: auto;
  padding-inline: 1.5rem;
  @media (width >= --theme(--breakpoint-sm)) {
    max-width: none;
  }
  @media (width >= 1440px) {
    padding-inline: 2rem;
    max-width: 1440px;
  }
}
 
/** Smooth scroll **/
html {
  scroll-behavior: smooth;
}
Setup Inter Font(Next.js)

Add the following code to your root layout file (app/layout.tsx or src/app/layout.tsx):
import { Inter } from 'next/font/google';
import { cn } from '@/utils/cn';
 
const inter = Inter({ subsets: ['latin'] });
 
export default function RootLayout({ children }) {
  return (
    <html>
      <body className={cn('text-base antialiased', inter.className)}>{children}</body>
    </html>
  );
}
Setup System Fonts

Add the following code to your style entry file globals.css:
@theme {
  --font-sans:
    'Geist', 'Geist Fallback', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}
For a modern and visually appealing design, we recommend using Inter as the default font in your ReUI project.
Add Lucide Icon Library

npm i lucide
Add Remix Icon Library(optional)

npm i @remixicon/react
Setup Base UI Portals

Base UI uses portals for components that render popups, such as Dialog and Popover. To make portalled components always appear on top of the entire page, add the isolate Tailwind class to your application layout root:
<div className="isolate"></div>
Add Components

Explore the ReUI Components and add the ones you need into your project.


### Editor ID

Set a custom id for the editor:

```ts
const editor = createPlateEditor({
  id: 'my-custom-editor-id',
});
```

If defined, you should always pass the `id` as the first argument in any editor retrieval methods.

### Node ID

Plate includes a built-in system for automatically assigning unique IDs to nodes, which is crucial for certain plugins and for data persistence strategies that rely on stable identifiers.

This feature is enabled by default. You can customize its behavior or disable it entirely through the `nodeId` option.

#### Configuration

To configure Node ID behavior, pass an object to the `nodeId` property when creating your editor:

```ts
const editor = usePlateEditor({
  // ... other plugins and options
  nodeId: {
    // Function to generate IDs (default: nanoid(10))
    idCreator: () => uuidv4(),

    // Exclude inline elements from getting IDs (default: true)
    filterInline: true, 

    // Exclude text nodes from getting IDs (default: true)
    filterText: true,

    // Reuse IDs on undo/redo and copy/paste if not in document (default: false)
    // Set to true if IDs should be stable across such operations.
    reuseId: false,

    // Normalize all nodes in initial value (default: false - only checks first/last)
    // Set to true to ensure all initial nodes get IDs if missing.
    normalizeInitialValue: false, 
    
    // Prevent overriding IDs when inserting nodes with an existing id (default: false)
    disableInsertOverrides: false,

    // Only allow specific node types to receive IDs (default: all)
    allow: ['p', 'h1'], 

    // Exclude specific node types from receiving IDs (default: [])
    exclude: ['code_block'],

    // Custom filter function to determine if a node should get an ID
    filter: ([node, path]) => {
      // Example: Only ID on top-level blocks
      return path.length === 1;
    },
  },
});
```

<Callout type="note">
  The `NodeIdPlugin` (which handles this) is part of the core plugins and is automatically included. You only need to specify the `nodeId` option if you want to customize its default behavior.
</Callout>

#### Disabling Node IDs

If you don't need automatic node IDs, you can disable the feature:

```ts
const editor = usePlateEditor({
  // ... other plugins and options
  nodeId: false, // This will disable the NodeIdPlugin
});
```

By disabling this, certain plugins that rely on node IDs will not function properly. The following plugins require block IDs to work:

- **[Block Selection](/docs/block-selection)** - Needs IDs to track which blocks are selected
- **[Block Menu](/docs/block-menu)** - Requires IDs to show context menus for specific blocks  
- **[Drag & Drop](/docs/dnd)** - Uses IDs to identify blocks during drag operations
- **[Table](/docs/table)** - Relies on IDs for cell selection
- **[Table of Contents](/docs/toc)** - Needs heading IDs for navigation and scrolling
- **[Toggle](/docs/toggle)** - Uses IDs to track which toggles are open/closed

### Normalization

Control whether the editor should normalize its content on initialization:

```ts
const editor = createPlateEditor({
  shouldNormalizeEditor: true,
});
```

Note that normalization may take a few dozen milliseconds for large documents, such as the playground value.

### Auto-selection

Configure the editor to automatically select a range:

```ts
const editor = createPlateEditor({
  autoSelect: 'end', // or 'start', or true
});
```

This is not the same as auto-focus: you can select text without focusing the editor.

### Component Overrides

Override default components for plugins:

```ts
const editor = createPlateEditor({
  plugins: [HeadingPlugin],
  components: {
    [ParagraphPlugin.key]: CustomParagraphComponent,
    [HeadingPlugin.key]: CustomHeadingComponent,
  },
});
```

### Plugin Overrides

Override specific plugin configurations:

```ts
const editor = createPlateEditor({
  plugins: [HeadingPlugin],
  override: {
    plugins: {
      [ParagraphPlugin.key]: {
        options: {
          customOption: true,
        },
      },
    },
  },
});
```

### Disable Plugins

Disable specific plugins:

```ts
const editor = createPlateEditor({
  plugins: [HeadingPlugin, ListPlugin],
  override: {
    enabled: {
      [HistoryPlugin.key]: false,
    },
  },
});
```

### Overriding Plugins

You can override core plugins or previously defined plugins by adding a plugin with the same key. The last plugin with a given key wins:

```ts
const CustomParagraphPlugin = createPlatePlugin({
  key: 'p',
  // Custom implementation
});

const editor = createPlateEditor({
  plugins: [CustomParagraphPlugin],
});
```

### Root Plugin

From the root plugin, you can configure any plugin:

```ts
const editor = createPlateEditor({
  plugins: [HeadingPlugin],
  rootPlugin: (plugin) =>
    plugin.configurePlugin(LengthPlugin, {
    options: {
        maxLength: 100,
      },
    }),
});
```

## Typed Editor

`createPlateEditor` will automatically infer the types for your editor from the value and the plugins you pass in. For explicit type creation, use the generics:

### Plugins Type

```ts
const editor = createPlateEditor<Value, typeof TablePlugin | typeof LinkPlugin>({
  plugins: [TablePlugin, LinkPlugin],
});

// Usage
editor.tf.insert.tableRow()
```

### Value Type

For more complex editors, you can define your types in a separate file (e.g., `plate-types.ts`):

```ts
import type { TElement, TText } from 'platejs';
import type { TPlateEditor } from 'platejs/react';

// Define custom element types
interface ParagraphElement extends TElement {
  align?: 'left' | 'center' | 'right' | 'justify';
  children: RichText[];
  type: typeof ParagraphPlugin.key;
}

interface ImageElement extends TElement {
  children: [{ text: '' }]
  type: typeof ImagePlugin.key;
  url: string;
}

// Define custom text types
interface FormattedText extends TText {
  bold?: boolean;
  italic?: boolean;
}

export type MyRootBlock = ParagraphElement | ImageElement;

// Define the editor's value type
export type MyValue = MyRootBlock[];

// Define the custom editor type
export type MyEditor = TPlateEditor<MyValue, typeof TablePlugin | typeof LinkPlugin>;

export const useMyEditorRef = () => useEditorRef<MyEditor>();

// Usage
const value: MyValue = [{
  type: 'p',
  children: [{ text: 'Hello, Plate!' }],
}]

const editorInferred = createPlateEditor({
  plugins: [TablePlugin, LinkPlugin],
  value,
});

// or 
const editorExplicit = createPlateEditor<MyValue, typeof TablePlugin | typeof LinkPlugin>({
  plugins: [TablePlugin, LinkPlugin],
  value,
});
```

 We can do srt here with gemini and like user can do enhance blogs and formated writen and user can easy copy and crrate new mdc on blogs.
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



The ReUI Registry gives you instant access to production-ready components.
Add it once, then pull in flexible, composable blocks by name—no locked templates,
just scalable pieces you can tailor to your project.

## Add registry

Add the ReUI registry namespace to your `components.json`:

```json
{
  "registries": {
    "@reui": "https://reui.io/r/{name}.json"
  }
}
```

For more info, Learn more about registry config from Shadcn UI docs [here](https://ui.shadcn.com/docs/registry).

## Usage

Install blocks via the shadcn CLI using the `@reui/{name}` syntax.

```bash
pnpm dlx shadcn@latest add @reui/statistic-card-1
```

Install components via the shadcn CLI using the `@reui/{name}` syntax.

```bash
pnpm dlx shadcn@latest add @reui/alert
```

Each block and component has CLI commands to copy and paste into your project.

## Contextual Colors

Preview ReUI's contextual colors fully compatible with Shadcn UI, globally applied across all components to maintain a uniform design system.

<ExamplePreview path="theming/contextual-colors" />

## Base Colors

Preview ReUI's base colors, fully compatible with Shadcn UI, globally applied across base components to maintain a uniform design system.

<ExamplePreview path="theming/base-colors" />

## Base Styles

Preview ReUI's base styles, fully compatible with Shadcn UI, globally applied across base components to maintain a uniform design system.

<ExamplePreview path="theming/base-styles" />

## Customization

Customize component styles using CSS variables for both `light` and `dark` modes in your Tailwind entry CSS file `styles/globals.scss`:

```css showLineNumbers
:root {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --background: var(--color-white);
  --foreground: var(--color-zinc-950);
  --card: var(--color-white);
  --card-foreground: var(--color-zinc-950);
  --popover: var(--color-white);
  --popover-foreground: var(--color-zinc-950);
  --primary: var(--color-blue-500);
  --primary-foreground: var(--color-white);
  --secondary: var(--color-zinc-100);
  --secondary-foreground: var(--color-zinc-900);
  --muted: var(--color-zinc-100);
  --muted-foreground: var(--color-zinc-500);
  --accent: var(--color-zinc-100);
  --accent-foreground: var(--color-zinc-900);
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);
  --chart-1: var(--color-blue-500);
  --chart-2: var(--color-green-500);
  --chart-3: var(--color-yellow-500);
  --chart-4: var(--color-red-500);
  --chart-5: var(--color-purple-500);
  --border: oklch(94% 0.004 286.32); /* between --color-zinc-100 and --color-zinc-200 */
  --input: var(--color-zinc-200);
  --ring: var(--color-zinc-400);
  --radius: 0.5rem;
}

.dark {
  --background: var(--color-zinc-950);
  --foreground: var(--color-zinc-50);
  --card: var(--color-zinc-950);
  --card-foreground: var(--color-zinc-50);
  --popover: var(--color-zinc-950);
  --popover-foreground: var(--color-zinc-50);
  --primary: var(--color-blue-600);
  --primary-foreground: var(--color-white);
  --secondary: var(--color-zinc-800);
  --secondary-foreground: var(--color-zinc-50);
  --muted: var(--color-zinc-900);
  --muted-foreground: var(--color-zinc-500);
  --accent: var(--color-zinc-900);
  --accent-foreground: var(--color-zinc-50);
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);
  --chart-1: var(--color-blue-500);
  --chart-2: var(--color-green-500);
  --chart-3: var(--color-yellow-500);
  --chart-4: var(--color-red-500);
  --chart-5: var(--color-purple-500);
  --border: var(--color-zinc-800);
  --input: var(--color-zinc-800);
  --ring: var(--color-zinc-600);
}
```

## Setup

<Steps>

### Add Dark Mode Variant

Ensure the following Tailwind Variant is added to your entry style file `styles/globals.css`:

```css
/** Dark Mode Variant **/
@custom-variant dark (&:where(.dark, .dark *));
```

### Enable Dark Mode

To enable dark mode, toggle the `dark` class on the `<html>` element.

```tsx
export default () => (
  <html lang="en" className="dark">
    <body>{/* Your app */}</body>
  </html>
);
```

<Alert variant="primary" appearance="light" close={false}>
  <AlertIcon>
    <BookOpenCheck />
  </AlertIcon>
  <AlertTitle>
    For Next.js projects we recommend using [next-themes](https://github.com/pacocoursey/next-themes) package for easy
    dark mode toggle support in your app.
  </AlertTitle>
</Alert>

</Steps>

## Credits

- [React](https://react.dev/) - JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org) - Framework for modern React-based web apps.
- [Radix UI](https://www.radix-ui.com) - Accessible React primitives for core elements.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework for component styling.
- [shadcn/ui](https://ui.shadcn.com) - Customizable Copy/Paste UI components built with Radix and Tailwind.
- [TanStack Table](https://tanstack.com/table) - Advanced table management library.
- [TanStack Query](https://tanstack.com/query) - Server state management for data fetching and caching.
- [Lucide Icons](https://lucide.dev) - Simple and elegant icon library.
- [Remix Icons](https://remixicon.com) - Open-source icon system.
- [Class Variance Authority](https://github.com/joe-bell/cva) - Class management for consistent styling.
- [Dnd Kit](https://dndkit.com) - Drag-and-drop library for React.
- [Cmdk](https://cmdk.paco.me) - Accessible and customizable command menu.
- [React Day Picker](https://react-day-picker.js.org) - Date picker for React.
- [Sonner](https://sonner.emilkowal.ski) - Modern toast notifications for React.
- [Zod](https://zod.dev) - Type-safe schema validation library.
- [React Hook Form](https://react-hook-form.com) - Flexible React form management.

- # ReUI

This is the documentation for the `@reui/components` package. It contains a collection of components and utilities for building user interfaces in React. The library is designed to be composable and styling agnostic.

## Getting Started
- [Introduction](https://reui.io/docs/index.md): Get started with ReUI - a comprehensive React component library designed for modern web applications.
- [Installation](https://reui.io/docs/installation.md): Step-by-step guide to install ReUI in your React project with npm, yarn, or pnpm.
- [Registry](https://reui.io/docs/registry.md): Learn how to use the ReUI Registry with shadcn/ui.
- [MCP](https://reui.io/docs/mcp.md): Learn how to use the shadcn MCP(Model Context Protocol) with ReUI
- [Theming](https://reui.io/docs/theming.md): Customize ReUI components with CSS variables, Tailwind CSS, or your preferred styling solution.
- [Dark mode](https://reui.io/docs/dark-mode.md): Implement automatic dark mode switching with ReUI components using next-themes or custom solutions.
- [RTL](https://reui.io/docs/rtl.md): Enable right-to-left language support for ReUI components in Arabic, Hebrew, and other RTL languages.
- [References](https://reui.io/docs/references.md): 3rd-party component libraries and tool used to build ReUI.
- [Changelog](https://reui.io/docs/changelog.md): Detailed changelog tracking new features, bug fixes, and breaking changes across ReUI versions.
- [llms.txt](https://reui.io/llms.txt.md): Structured data file for AI assistants and language models to understand ReUI components.

## UI Components
- [Alert](https://reui.io/docs/alert.md): Display contextual feedback messages with multiple variants including success, warning, error, and info states.
- [Calendar](https://reui.io/docs/calendar.md): Interactive date picker with month navigation, date selection, and customizable date ranges for scheduling interfaces.
- [Card](https://reui.io/docs/card.md): Flexible container component for displaying content with headers, footers, and customizable layouts.
- [Chart](https://reui.io/docs/chart.md): Data visualization component built on Recharts with support for line, bar, pie, and area charts.
- [Data Grid](https://reui.io/docs/data-grid.md): Advanced managed table component build with TanStack Table with sorting, filtering, pagination, and row selection for complex data management.
- [Drawer](https://reui.io/docs/drawer.md): Slide-out panel component that appears from the side with overlay and customizable positioning.
- [File Upload](https://reui.io/docs/file-upload.md): Drag-and-drop file upload component with progress indicators, file validation, and multiple file support.
- [Kanban](https://reui.io/docs/kanban.md): Project management board with draggable cards, customizable columns, and real-time updates.
- [Kbd](https://reui.io/docs/kbd.md): Keyboard key indicator component for displaying keyboard shortcuts and key combinations.
- [Pagination](https://reui.io/docs/pagination.md): Navigate through large datasets with page numbers, previous/next buttons, and customizable page sizes.
- [Resizable](https://reui.io/docs/resizable.md): Create resizable panels and layouts with drag handles and customizable resize constraints.
- [Rating](https://reui.io/docs/rating.md): Interactive star rating component for collecting user feedback with half-star support and custom icons.
- [Stepper](https://reui.io/docs/stepper.md): Multi-step process component with progress indicators, step validation, and customizable navigation.
- [Scrollspy](https://reui.io/docs/scrollspy.md): Navigation component that highlights menu items based on scroll position for long-form content.
- [Skeleton](https://reui.io/docs/skeleton.md): Loading placeholder component that mimics content structure while data is being fetched.
- [Sortable](https://reui.io/docs/sortable.md): Drag-and-drop list component for reordering items with visual feedback and accessibility support.
- [Sonner](https://reui.io/docs/sonner.md): Toast notification system with multiple positions, types, and customizable animations.
- [Table](https://reui.io/docs/table.md): Structured data display component with sorting, filtering, and responsive design for tabular information.
- [Textarea](https://reui.io/docs/textarea.md): Multi-line text input component with auto-resize, character counting, and validation support.

## Radix UI Components
- [Accordion](https://reui.io/docs/accordion.md): Displays collapsible content sections with smooth animations and keyboard navigation support.
- [Accordion Menu](https://reui.io/docs/accordion-menu.md): Navigation component with expandable sections, perfect for sidebar menus and hierarchical navigation.
- [Alert Dialog](https://reui.io/docs/alert-dialog.md): Modal dialog that interrupts user workflow to deliver important messages requiring immediate attention.
- [Avatar](https://reui.io/docs/avatar.md): User image component with fallback initials, status indicators, and customizable sizing.
- [Badge](https://reui.io/docs/badge.md): Small status indicator for notifications, counts, and labels with multiple color variants and sizes.
- [Breadcrumb](https://reui.io/docs/breadcrumb.md): Navigation trail showing current page location with customizable separators and responsive design.
- [Button](https://reui.io/docs/button.md): Interactive element with multiple variants, sizes, and states for user actions and form submissions.
- [Carousel](https://reui.io/docs/carousel.md): Image gallery and content slider with touch gestures, autoplay, and customizable navigation controls.
- [Checkbox](https://reui.io/docs/checkbox.md): Form input for multiple selections with indeterminate state, custom styling, and accessibility features.
- [Collapsible](https://reui.io/docs/collapsible.md): Content that can be shown or hidden with smooth animations and keyboard accessibility.
- [Command](https://reui.io/docs/command.md): Command palette interface with search, keyboard navigation, and customizable command execution.
- [Combobox](https://reui.io/docs/combobox.md): Searchable select input combining text input with dropdown list for enhanced user selection experience.
- [Context Menu](https://reui.io/docs/context-menu.md): Right-click menu that appears at cursor position with customizable actions and keyboard shortcuts.
- [Date Picker](https://reui.io/docs/date-picker.md): Calendar interface for date selection with range picking, keyboard navigation, and localization support.
- [Dialog](https://reui.io/docs/dialog.md): Modal overlay that captures focus and requires user interaction before dismissing or continuing.
- [Dropdown Menu](https://reui.io/docs/dropdown-menu.md): Action menu that appears below a trigger with keyboard navigation and submenu support.
- [Form](https://reui.io/docs/form.md): Form container with built-in validation, error handling, and integration with popular form libraries.
- [Filters](https://reui.io/docs/filters.md): Filters component with multiple filter types, operators, and visual indicators for data filtering.
- [Hover Card](https://reui.io/docs/hover-card.md): Contextual information panel that appears on hover with customizable delay and positioning.
- [Input](https://reui.io/docs/input.md): Text input field with validation states, error messages, and customizable styling options.
- [Label](https://reui.io/docs/label.md): Form field label with automatic association to inputs and screen reader accessibility.
- [Menubar](https://reui.io/docs/menubar.md): Application menu bar with nested menus, keyboard shortcuts, and cross-platform behavior.
- [Navigation Menu](https://reui.io/docs/navigation-menu.md): Website navigation with dropdown menus, keyboard navigation, and responsive mobile behavior.
- [Popover](https://reui.io/docs/popover.md): Floating content panel anchored to a trigger with customizable positioning and collision detection.
- [Progress](https://reui.io/docs/progress.md): Visual indicator showing task completion status with customizable appearance and animation.
- [Radio Group](https://reui.io/docs/radio-group.md): Single-choice selection group with keyboard navigation and proper form association.
- [Scroll Area](https://reui.io/docs/scroll-area.md): Custom scrollable container with styled scrollbars and smooth scrolling behavior.
- [Select](https://reui.io/docs/select.md): Dropdown selection component with search, keyboard navigation, and customizable options.
- [Separator](https://reui.io/docs/separator.md): Visual divider element with screen reader accessibility and customizable orientation.
- [Sheet](https://reui.io/docs/sheet.md): Slide-out panel component with customizable positioning, animations, and overlay behavior.
- [Slider](https://reui.io/docs/slider.md): Range input control with customizable steps, marks, and keyboard accessibility.
- [Sortable](https://reui.io/docs/sortable.md): Drag-and-drop list reordering with visual feedback and keyboard accessibility support.
- [Switch](https://reui.io/docs/switch.md): Toggle control for on/off states with smooth animations and keyboard accessibility.
- [Table](https://reui.io/docs/table.md): Data table with sorting, filtering, and responsive design for structured information display.
- [Tabs](https://reui.io/docs/tabs.md): Tabbed interface for organizing content with keyboard navigation and customizable styling.
- [Tooltip](https://reui.io/docs/tooltip.md): Contextual hint that appears on hover or focus with customizable positioning and delay.
- [Toggle](https://reui.io/docs/toggle.md): Two-state button control for toggling features with customizable pressed and unpressed states.
- [Toggle Group](https://reui.io/docs/toggle-group.md): Group of toggle buttons with shared state management and single or multiple selection modes.
- [Tree](https://reui.io/docs/tree.md): Hierarchical data display with expandable nodes, keyboard navigation, and customizable icons.

## Base UI Components
- [Accordion](https://reui.io/docs/base-accordion.md): Collapsible content sections with smooth expand/collapse animations and keyboard navigation support.
- [Alert Dialog](https://reui.io/docs/base-alert-dialog.md): Modal dialog that interrupts user workflow to deliver critical messages requiring immediate attention.
- [Autocomplete](https://reui.io/docs/base-autocomplete.md): Smart input field with dynamic suggestions and filtered results based on user typing.
- [Avatar](https://reui.io/docs/base-avatar.md): User profile image component with fallback initials, status indicators, and flexible sizing options.
- [Badge](https://reui.io/docs/base-badge.md): Compact status indicator for notifications, counts, and categorical labels with color variants.
- [Breadcrumb](https://reui.io/docs/base-breadcrumb.md): Navigation trail showing current page location with customizable separators and responsive design.
- [Button](https://reui.io/docs/base-button.md): Interactive element with multiple variants, sizes, and states for user actions and form submissions.
- [Checkbox](https://reui.io/docs/base-checkbox.md): Form input for multiple selections with indeterminate state, custom styling, and accessibility features.
- [Collapsible](https://reui.io/docs/base-collapsible.md): Content that can be shown or hidden with smooth animations and keyboard accessibility.
- [Combobox](https://reui.io/docs/base-combobox.md): Searchable select input combining text input with dropdown list for enhanced user selection experience.
- [Context Menu](https://reui.io/docs/base-context-menu.md): Right-click menu that appears at cursor position with customizable actions and keyboard shortcuts.
- [Dialog](https://reui.io/docs/base-dialog.md): Modal overlay that captures focus and requires user interaction before dismissing or continuing.
- [Input](https://reui.io/docs/base-input.md): Text input field with validation states, error messages, and customizable styling options.
- [Menu](https://reui.io/docs/base-menu.md): Action menu that appears below a trigger with keyboard navigation and submenu support.
- [Menubar](https://reui.io/docs/base-menubar.md): Application menu bar with nested menus, keyboard shortcuts, and cross-platform behavior.
- [Meter](https://reui.io/docs/base-meter.md): Visual indicator showing task completion status with customizable appearance and animation.
- [Navigation Menu](https://reui.io/docs/base-navigation-menu.md): Website navigation with dropdown menus, keyboard navigation, and responsive mobile behavior.
- [Number Field](https://reui.io/docs/base-number-field.md): Numeric input with increment/decrement controls, scrub area, and customizable step values.
- [Popover](https://reui.io/docs/base-popover.md): Floating content panel anchored to a trigger with customizable positioning and collision detection.
- [Preview Card](https://reui.io/docs/base-preview-card.md): Contextual information panel that appears on hover with customizable delay and positioning.
- [Progress](https://reui.io/docs/base-progress.md): Visual indicator showing task completion status with customizable appearance and animation.
- [Phone Input](https://reui.io/docs/base-phone-input.md): International phone number input with country selection, formatting, and validation support.
- [Radio Group](https://reui.io/docs/base-radio-group.md): Single-choice selection group with keyboard navigation and proper form association.
- [Select](https://reui.io/docs/base-select.md): Dropdown selection component with search, keyboard navigation, and customizable options.
- [Separator](https://reui.io/docs/base-separator.md): Visual divider element with screen reader accessibility and customizable orientation.
- [Switch](https://reui.io/docs/base-switch.md): Toggle control for on/off states with smooth animations and keyboard accessibility.
- [Scroll Area](https://reui.io/docs/base-scroll-area.md): Custom scrollable container with styled scrollbars and smooth scrolling behavior.
- [Slider](https://reui.io/docs/base-slider.md): Range input control with customizable steps, marks, and keyboard accessibility.
- [Sheet](https://reui.io/docs/base-sheet.md): Slide-out panel component with customizable positioning, animations, and overlay behavior.
- [Tabs](https://reui.io/docs/base-tabs.md): Tabbed interface for organizing content with keyboard navigation and customizable styling.
- [Toast](https://reui.io/docs/base-toast.md): Toast notification system with multiple positions, types, and customizable animations.
- [Toggle](https://reui.io/docs/base-toggle.md): Two-state button control for toggling features with customizable pressed and unpressed states.
- [Toggle Group](https://reui.io/docs/base-toggle-group.md): Group of toggle buttons with shared state management and single or multiple selection modes.
- [Toolbar](https://reui.io/docs/base-toolbar.md): Container component that groups a set of buttons and controls for organized tool layouts.
- [Tooltip](https://reui.io/docs/base-tooltip.md): Contextual hint that appears on hover or focus with customizable positioning and delay.

## Animated Components
- [Marquee](https://reui.io/docs/marquee.md): Scrolling text and content display with customizable speed, direction, and seamless loop animations.
- [GitHub Button](https://reui.io/docs/github-button.md): Interactive GitHub repository button with hover animations, star counts, and social integration features.
- [Avatar Group](https://reui.io/docs/avatar-group.md): Multiple user avatar display with overlap animations, hover effects, and customizable stacking patterns.
- [Typing Text](https://reui.io/docs/typing-text.md): Typewriter animation effect with customizable typing speed, cursor blinking, and character-by-character reveal.
- [Word Rotate](https://reui.io/docs/word-rotate.md): Rotating text animation that cycles through multiple words with smooth transitions and customizable timing.
- [Video Text](https://reui.io/docs/video-text.md): Video-based text effects using mask overlays and dynamic animations for immersive visual experiences.
- [SVG Text](https://reui.io/docs/svg-text.md): Animated SVG text with path drawing effects, morphing transitions, and vector-based animations.
- [Counting Number](https://reui.io/docs/counting-number.md): Animated number counter with easing functions, duration control, and smooth incremental transitions.
- [Sliding Number](https://reui.io/docs/sliding-number.md): Smooth number transitions with vertical sliding animations and customizable slide direction effects.
- [Shimmering Text](https://reui.io/docs/shimmering-text.md): Shimmer effect animation with customizable gradient colors, animation speed, and shimmer direction.
- [Text Reveal](https://reui.io/docs/text-reveal.md): Text reveal animations triggered by scroll position with intersection observer and customizable reveal effects.
- [Gradient Background](https://reui.io/docs/gradient-background.md): Animated gradient backgrounds with color transitions, movement effects, and customizable gradient patterns.
- [Grid Background](https://reui.io/docs/grid-background.md): Animated grid patterns with customizable spacing, movement effects, and dynamic grid line animations.
- [Hover Background](https://reui.io/docs/hover-background.md): Interactive backgrounds that respond to mouse movement, hover states, and cursor position with dynamic effects.



<ExamplePreview path="github-button/default" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">
  <CliCommands name="github-button" />
</TabsContent>

<TabsContent value="manual">    
<Steps>

<Step>
Install the following dependencies:

```bash
npm i radix-ui
```

</Step>

<Step>
Copy and paste the following code into your project’s `components/ui/github-button.tsx` file.

<ComponentPreview name="github-button" />

</Step>

</Steps>

</TabsContent>

</Tabs>

## Examples

### Outline

<ExamplePreview path="github-button/outline" />

### Separator

<ExamplePreview path="github-button/separator" />

### Sizes

<ExamplePreview path="github-button/sizes" />

## API Reference

This component is built using [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot) and [Motion](https://motion.dev/)
primitives and includes the following custom props:

### GithubButton

| **Prop**                                                                                              | **Type**                 | **Default**       |
| ----------------------------------------------------------------------------------------------------- | ------------------------ | ----------------- |
| `variant` <PopoverInfo>Button visual style variant.</PopoverInfo>                                     | ~'default' \| 'outline'~ | ~'default'~       |
| `size` <PopoverInfo>Button size variant.</PopoverInfo>                                                | ~'md' \| 'sm' \| 'lg'~   | ~'md'~            |
| `className` <PopoverInfo>Optional CSS class name to apply custom styles.</PopoverInfo>                | ~string~                 | <Na/>             |
| `roundStars` <PopoverInfo>Whether to round stars number with units (k, M, B, T).</PopoverInfo>        | ~boolean~                | ~false~           |
| `fixedWidth` <PopoverInfo>Whether to maintain fixed width for consistent layout.</PopoverInfo>        | ~boolean~                | ~true~            |
| `initialStars` <PopoverInfo>Initial number of stars to display.</PopoverInfo>                         | ~number~                 | ~0~               |
| `starsClass` <PopoverInfo>CSS class for the stars counter element.</PopoverInfo>                      | ~string~                 | <Na/>             |
| `targetStars` <PopoverInfo>Target number of stars to animate to.</PopoverInfo>                        | ~number~                 | <Na/>             |
| `separator` <PopoverInfo>Whether to display a separator between the icon and the label.</PopoverInfo> | ~boolean~                | ~false~           |
| `showStarIcon` <PopoverInfo>Whether to display the star icon.</PopoverInfo>                           | ~boolean~                | ~true~            |
| `animationDuration` <PopoverInfo>Animation duration in seconds.</PopoverInfo>                         | ~number~                 | ~2~               |
| `animationDelay` <PopoverInfo>Animation delay in seconds before starting.</PopoverInfo>               | ~number~                 | ~0~               |
| `autoAnimate` <PopoverInfo>Whether to start animation automatically.</PopoverInfo>                    | ~boolean~                | ~true~            |
| `showGithubIcon` <PopoverInfo>Whether to display the GitHub icon.</PopoverInfo>                       | ~boolean~                | ~true~            |
| `filled` <PopoverInfo>Whether stars should start filled.</PopoverInfo>                                | ~boolean~                | ~false~           |
| `repoUrl` <PopoverInfo>Repository URL for actual GitHub integration.</PopoverInfo>                    | ~string~                 | <Na/>             |
| `label` <PopoverInfo>Button text label.</PopoverInfo>                                                 | ~string~                 | ~'Star'~          |
| `useInViewTrigger` <PopoverInfo>Use in-view detection to trigger animation.</PopoverInfo>             | ~boolean~                | ~false~           |
| `inViewOptions` <PopoverInfo>Options for in-view detection trigger.</PopoverInfo>                     | ~UseInViewOptions~       | ~\{ once: true }~ |
| `transition` <PopoverInfo>Spring transition options for motion animations.</PopoverInfo>              | ~SpringOptions~          | <Na/>             |

## Credits

- Built with [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot).
- Inspired by [Animate UI](https://animate-ui.com/docs/buttons/github-stars).
