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
