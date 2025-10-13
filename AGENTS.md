# likhonsheikh.com

A bilingual (Bangla/English) blog template built with Next.js 15, optimized for developer content and technical writing. Designed for performance, accessibility, and seamless multilingual support.

**Author:** Likhon Sheikh  
**Contact:** t.me/likhonsheikh  
**GitHub:** github.com/likhonshelkh  
**Repository:** github.com/likhonshelkh/likhonsheikh.com

## Project Overview

This is a modern blog template specifically designed for Bangla and bilingual content creators who write about technology, development, and programming. The project emphasizes accessibility, performance, and developer experience while maintaining beautiful typography for both Bangla and English content.

### Architecture

```
likhonsheikh.com/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog routes & pages
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── tags/              # Tag archive pages
│   ├── globals.css        # Global styles & design tokens
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── blog/
│   └── content/           # MDX blog posts (*.mdx)
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── BanglaText.tsx    # Bangla typography wrapper
│   ├── CodeWithBangla.tsx # Code blocks with Bangla explanations
│   └── BlogCard.tsx      # Post preview cards
├── lib/
│   ├── authors.ts        # Author profiles & metadata
│   ├── posts.ts          # Post parsing utilities
│   └── utils.ts          # Shared utilities
├── public/               # Static assets
│   ├── fonts/           # Custom Bangla fonts (if self-hosted)
│   └── images/          # Images & media
└── package.json
```

## Build & Commands

### Installation
```bash
# Install dependencies
pnpm install

# Verify installation
pnpm list
```

### Development
```bash
# Start dev server (http://localhost:3000)
pnpm dev

# Type checking
pnpm type-check

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

### Production
```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Preview production build locally
pnpm preview
```

### Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test src/components/BlogCard.test.tsx
```

### Content Management
```bash
# Create new blog post
touch blog/content/my-post-title.mdx

# Validate all MDX files
pnpm validate:mdx

# Generate sitemap
pnpm build  # Sitemap generated automatically
```

## Code Style & Conventions

### TypeScript Rules
- Use TypeScript 5 with strict mode enabled
- Prefer `interface` over `type` for object shapes
- Use descriptive names: `getUserProfile()` not `getData()`
- NEVER use `any` type—use `unknown` and narrow
- NEVER use `@ts-ignore` or `@ts-expect-error`
- Use `const` by default, `let` only when reassignment needed
- CamelCase for types/interfaces: `UserProfile`, `BlogPost`
- camelCase for functions/variables: `formatDate`, `postTitle`

### React Patterns
- Server Components by default (no `'use client'` unless needed)
- Use `'use client'` only for interactivity: state, effects, event handlers
- Functional components only—no class components
- Extract reusable logic into custom hooks
- Keep components focused & under 200 lines
- Props destructuring in function signature

```tsx
// Good
export default function BlogCard({ title, date, excerpt }: BlogCardProps) {
  return <article>...</article>;
}

// Avoid
export default function BlogCard(props: BlogCardProps) {
  return <article>{props.title}</article>;
}
```

### File Naming
- Components: PascalCase—`BlogCard.tsx`, `UserProfile.tsx`
- Utilities: camelCase—`formatDate.ts`, `parseMarkdown.ts`
- Blog posts: kebab-case—`react-hooks-bangla.mdx`
- Tests: Match source—`BlogCard.test.tsx`

### Import Organization
```typescript
// 1. React & Next.js
import { Metadata } from 'next';
import Link from 'next/link';

// 2. External libraries (alphabetical)
import { format } from 'date-fns';
import { clsx } from 'clsx';

// 3. Internal components
import { BlogCard } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';

// 4. Utilities
import { cn } from '@/lib/utils';
import { getAllPosts } from '@/lib/posts';

// 5. Types
import type { Post, Author } from '@/types';

// 6. Styles (if needed)
import styles from './page.module.css';
```

### Styling with Tailwind
- Use Tailwind utility classes—avoid custom CSS when possible
- Mobile-first: base styles, then `sm:`, `md:`, `lg:`, `xl:`
- Use design tokens from `globals.css`
- Group utilities logically: layout → spacing → typography → colors

```tsx
// Good: Logical grouping
<div className="flex items-center gap-4 rounded-lg p-6 text-lg font-medium text-gray-900 dark:text-gray-100">

// Avoid: Random order
<div className="text-gray-900 flex rounded-lg items-center font-medium p-6 gap-4 text-lg">
```

### Accessibility Requirements
- Every interactive element must be keyboard accessible
- Use semantic HTML: `<button>` for actions, `<a>` for navigation
- Provide `aria-label` for icon-only buttons
- Maintain visible focus indicators (`:focus-visible`)
- Form inputs must have associated `<label>` elements
- Color contrast must meet WCAG AA (minimum) or AAA (preferred)
- Test with keyboard only: Tab, Enter, Space, Arrow keys
- Verify in accessibility tree (Chrome DevTools)

### Performance Rules
- Minimize client-side JavaScript—prefer Server Components
- Use Next.js `<Image>` component with explicit dimensions
- Lazy load below-the-fold images
- Preload critical fonts in `<head>`
- Avoid `transition: all`—explicitly list properties
- Use GPU-accelerated properties: `transform`, `opacity`
- Virtualize lists with >100 items (use `virtua` or `react-window`)
- Keep main thread free—move expensive work to Web Workers

## MDX Content Guidelines

### Frontmatter Schema

Every blog post MUST include this frontmatter:

```yaml
---
title: "আপনার ব্লগ পোস্টের শিরোনাম"
description: "SEO-optimized description (150-160 characters)"
date: "2024-12-01"
author: "likhonsheikh"
published: true
tags: ["React", "Next.js", "টিউটোরিয়াল"]
lang: "bn"
---
```

#### Required Fields
- `title`: Post title (Bangla or English)
- `description`: Brief summary for SEO & social sharing
- `date`: Publication date in `YYYY-MM-DD` format
- `author`: Author key from `lib/authors.ts`
- `published`: Boolean—only `true` posts are visible

#### Optional Fields
- `tags`: Array of tags (supports Bangla)
- `featured`: Boolean to highlight on homepage
- `readTime`: Reading time estimate (use Bangla numerals for Bangla posts)
- `lang`: Language code (`"bn"` or `"en"`)
- `category`: Post category
- `coverImage`: Path to cover image (must be in `public/images/`)
- `excerpt`: Custom excerpt (auto-generated from content if omitted)

### Writing Bangla Content

```mdx
---
title: "React Hooks এর সম্পূর্ণ গাইড"
description: "React Hooks ব্যবহার করে modern web application তৈরি করুন"
date: "2024-12-01"
author: "likhonsheikh"
published: true
tags: ["React", "JavaScript", "টিউটোরিয়াল", "বাংলা"]
lang: "bn"
readTime: "১৫ মিনিটের পড়া"
---

# React Hooks কী?

React Hooks হল এমন কিছু function যা functional components এ state এবং lifecycle features ব্যবহার করতে দেয়।

## useState Hook

<CodeWithBangla
  code={`const [count, setCount] = useState(0);`}
  explanation="এই hook ব্যবহার করে আমরা component এর state manage করতে পারি"
/>

### ব্যবহারের উদাহরণ

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>গণনা: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        বাড়ান
      </button>
    </div>
  );
}
```

এই component টি একটি simple counter যা button click এ count বাড়ায়।
```

### Code Blocks

Use enhanced code blocks with metadata:

````mdx
```tsx filename="components/Counter.tsx" showLineNumbers
'use client';

import { useState } from 'react';

/**
 * একটি সাধারণ counter component
 */
export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="rounded-lg border p-6">
      <h3 className="text-xl font-bold">গণনা: {count}</h3>
      <button 
        onClick={() => setCount(count + 1)}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        বাড়ান
      </button>
    </div>
  );
}
```
````

### Bangla Typography

```css
/* Apply to Bangla text containers */
.bangla-text {
  font-family: 'SolaimanLipi', 'Kalpurush', 'Siyam Rupali', sans-serif;
  line-height: 1.8;
  text-align: justify;
  hyphens: none;
}

/* Bangla in headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  letter-spacing: normal;
}
```

### Mixed Language Content

```mdx
# React দিয়ে Modern Web Development

আজকাল web development এর জন্য React একটি industry standard library হয়ে গেছে।

## কেন React ব্যবহার করবেন?

React এর কিছু প্রধান সুবিধা:

- **Component-based architecture** - reusable এবং maintainable code
- **Virtual DOM** - দ্রুত rendering performance
- **Large ecosystem** - হাজারো library এবং tool available
- **Strong community** - প্রচুর tutorial, article এবং support
```

## Bangla Language Support

### Font Configuration

**CDN (Recommended for Production):**
```html
<!-- Minified for performance -->
<link href="https://banglawebfonts.pages.dev/css/solaiman-lipi.min.css" rel="stylesheet">
```

**Local Font Loading (Next.js):**
```typescript
import localFont from 'next/font/local';

const solaimanLipi = localFont({
  src: './fonts/SolaimanLipi.woff2',
  variable: '--font-solaiman-lipi',
  display: 'swap',
});
```

### Typography Guidelines
- **Line height:** 1.8 for Bangla text (better readability)
- **Letter spacing:** Normal (avoid tight letter-spacing)
- **Text alignment:** Justify for paragraphs, left for headings
- **Numerals:** Use Bangla numerals (০১২৩৪৫৬৭৮৯) in Bangla content
- **Hyphenation:** Disable for Bangla (`hyphens: none`)

### Language Detection
```typescript
// Detect language from frontmatter
const isBangla = post.lang === 'bn';

// Apply appropriate typography
<article className={cn(
  "prose max-w-none",
  isBangla && "bangla-text"
)}>
  {content}
</article>
```

### SEO for Bangla Content
```tsx
// In page.tsx or layout.tsx
export const metadata: Metadata = {
  title: 'লিখন শেখ - Likhon Sheikh',
  description: 'Web development & programming tutorials in Bangla',
  openGraph: {
    locale: 'bn_BD', // Bangla (Bangladesh)
    type: 'website',
  },
};

// In individual blog posts
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      locale: post.lang === 'bn' ? 'bn_BD' : 'en_US',
    },
  };
}
```

## Web Interface Guidelines (Vercel Standards)

### Accessibility First
- Keyboard works everywhere—all flows are keyboard-operable
- Clear focus indicators on all interactive elements
- Use `:focus-visible` instead of `:focus` to avoid distracting pointer users
- Manage focus properly—use focus traps in modals, return focus after closing
- Minimum tap target: 24px × 24px (44px × 44px on mobile)
- Input font size ≥ 16px on mobile (prevents iOS zoom)
- Never disable browser zoom
- Match visual & hit targets—expand small visual targets to meet minimum

### Forms & Inputs
- Every input has an associated `<label>` element
- Clicking label focuses the input
- Never block paste in inputs
- Allow typing any characters—validate, don't block
- Keep submit button enabled until submission starts
- Show validation errors next to their fields
- On submit, focus the first error
- Set appropriate `autocomplete` attributes
- Use correct `type` & `inputmode` for better keyboards
- Placeholder values show format: `+1 (123) 456-7890`
- Warn before navigation if unsaved changes exist
- Trim whitespace from inputs (some IMEs add trailing spaces)

```tsx
// Good form example
<form onSubmit={handleSubmit}>
  <label htmlFor="email" className="block text-sm font-medium">
    Email Address
  </label>
  <input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
    className="mt-1 block w-full rounded-md border p-2 text-base"
    placeholder="user@example.com"
    required
  />
  <button 
    type="submit" 
    disabled={isSubmitting}
    className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
  >
    {isSubmitting ? 'Submitting…' : 'Submit'}
  </button>
</form>
```

### Navigation & URLs
- Use `<Link>` component for navigation (enables prefetching)
- Links are links—use `<a>` or `<Link>`, never `<button>` for navigation
- Deep-link everything—filters, tabs, pagination, expanded panels
- URL as state—persist state in URL for sharing & refresh
- Back/Forward restores scroll position
- Page `<title>` reflects current context

```tsx
// Good: Proper navigation
<Link href={`/blog/${post.slug}`} className="hover:underline">
  {post.title}
</Link>

// Bad: Button as navigation
<button onClick={() => router.push(`/blog/${post.slug}`)}>
  {post.title}
</button>
```

### Loading States
- Show loading indicator & keep original label
- Minimum loading duration: 300-500ms (avoid flicker)
- Use React `<Suspense>` for automatic loading state management
- Optimistic updates when success is likely
- On failure, show error & provide rollback or undo

```tsx
<button type="submit" disabled={isSubmitting}>
  {isSubmitting && <Spinner className="mr-2" />}
  {isSubmitting ? 'Saving…' : 'Save Changes'}
</button>
```

### Animations
- Only animate when it clarifies cause & effect
- Prioritize GPU-accelerated properties: `transform`, `opacity`
- Never use `transition: all`—explicitly list properties
- Honor `prefers-reduced-motion`
- Animations are interruptible by user input
- Correct transform origin—anchor motion to where it starts

```css
/* Good */
.card {
  transition: opacity 200ms ease, transform 200ms ease;
}

.card:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Bad */
.card {
  transition: all 200ms ease; /* Can cause jank */
}
```

### Performance
- Preload critical fonts
- Subset fonts to only needed glyphs
- Set explicit image dimensions to prevent CLS
- Lazy load below-the-fold images
- Preconnect to external domains
- Network latency budget: POST/PATCH/DELETE < 500ms
- Minimize re-renders—use React DevTools Profiler
- Test with CPU & network throttling

### Visual Design
- Layered shadows (ambient + direct light)
- Crisp borders using semi-transparent colors
- Nested radii: child ≤ parent
- Accessible contrast (prefer APCA over WCAG 2)
- Interactions increase contrast (hover/active/focus)
- Set `theme-color` meta tag to match background
- Set `color-scheme: dark` on `<html>` for proper scrollbar contrast

```css
/* Layered shadow example */
.card {
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Nested radius */
.container {
  border-radius: 12px;
}

.container > .child {
  border-radius: 8px; /* 12 - 4 = 8 */
}
```

## Content Guidelines (Vercel Writing Style)

### Voice & Tone
- **Active voice:** "Install the CLI" not "The CLI will be installed"
- **Action-oriented:** "Install the CLI" not "You will need the CLI"
- **Second person:** Use "you" instead of "we" or "I"
- **Clear & concise:** Use minimum words needed
- **Positive framing:** Focus on solutions, not problems

### Formatting
- Headings & buttons: Title Case (Chicago style)
- Body text: Sentence case
- Use `&` instead of "and" where appropriate
- Numerals for all counts: "8 deployments" not "eight deployments"
- Separate numbers & units with non-breaking space: `10 MB` not `10MB`
- Use ellipsis character `…` not three periods `...`
- Use proper quotes: `"Hello"` not `"Hello"`

### Error Messages
- Default to positive language
- Tell user how to fix it, not just what went wrong
- Provide clear next action

```tsx
// Good
<Alert>
  <AlertTitle>Unable to Save Post</AlertTitle>
  <AlertDescription>
    Your session expired. Sign in again to continue editing.
  </AlertDescription>
  <Button onClick={handleSignIn}>Sign In</Button>
</Alert>

// Bad
<Alert>
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Authentication failed.
  </AlertDescription>
</Alert>
```

### Placeholder Conventions
- Strings: `YOUR_API_TOKEN_HERE`
- Numbers: `0123456789`
- Emails: `user@example.com`
- Dates: `2024-12-01`

## Testing Strategy

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import { BlogCard } from './BlogCard';

describe('BlogCard', () => {
  it('renders post title', () => {
    render(<BlogCard title="Test Post" date="2024-12-01" />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });
  
  it('handles Bangla text correctly', () => {
    render(<BlogCard title="টেস্ট পোস্ট" lang="bn" />);
    const title = screen.getByText('টেস্ট পোস্ট');
    expect(title).toHaveClass('bangla-text');
  });
});
```

### Accessibility Testing
- Run automated checks with axe-core or Lighthouse
- Manual keyboard testing: Tab through entire flow
- Screen reader testing: VoiceOver (Mac) or NVDA (Windows)
- Verify focus management in modals & dialogs
- Check color contrast with devtools or APCA calculator

### Manual Testing Checklist
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are clearly visible
- [ ] Forms validate properly & show clear errors
- [ ] Loading states display correctly
- [ ] Error states are helpful & actionable
- [ ] Bangla typography renders correctly
- [ ] Dark mode works properly
- [ ] Mobile responsive (test on real device)
- [ ] Images load & have no CLS
- [ ] Links work & are semantically correct

## Git Workflow

### Before Every Commit
```bash
# 1. Lint code
pnpm lint

# 2. Run type check
pnpm type-check

# 3. Run tests
pnpm test

# 4. Build to verify
pnpm build
```

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(blog): add Bangla font support
fix(accessibility): improve focus indicators
docs(readme): update installation instructions
perf(images): lazy load below-fold images
```

### Branch Strategy
- `main`: Production-ready code (protected)
- `develop`: Integration branch
- `feature/feature-name`: New features
- `fix/bug-description`: Bug fixes
- `docs/doc-update`: Documentation only

### Pull Request Checklist
- [ ] Clear title & description
- [ ] Links to related issue(s)
- [ ] Screenshots for UI changes
- [ ] Bangla content tested
- [ ] Accessibility verified
- [ ] Build passes CI
- [ ] No merge conflicts
- [ ] Requested review from team

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Link project
vercel link

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables
Set in Vercel dashboard or `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://likhonsheikh.com
NEXT_PUBLIC_SITE_NAME=Likhon Sheikh
NEXT_PUBLIC_SITE_DESCRIPTION=Web development tutorials in Bangla

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Build Optimization
- Next.js automatically optimizes static pages
- Images optimized via Next.js Image Optimization API
- Fonts subsetting handled by next/font
- Enable `output: 'standalone'` for Docker deployments

## Configuration Management

### Adding Authors
Edit `lib/authors.ts`:

```typescript
export const authors = {
  likhonsheikh: {
    name: 'Likhon Sheikh',
    image: '/images/authors/likhon-sheikh.jpg',
    bio: 'Full-stack developer & content creator focused on modern web development',
    social: {
      telegram: 't.me/likhonsheikh',
      github: 'github.com/likhonshelkh',
    },
  },
} as const;

export type AuthorKey = keyof typeof authors;
```

### Adding Tags
Tags are auto-generated from frontmatter. Simply use them in posts:

```yaml
tags: ["React", "Next.js", "TypeScript", "বাংলা টিউটোরিয়াল"]
```

### Theme Customization
Edit `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* Add more design tokens */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
  }
}

/* Bangla typography */
.bangla-text {
  font-family: 'SolaimanLipi', 'Kalpurush', sans-serif;
  line-height: 1.8;
}
```

## Common Tasks

### Create New Blog Post
```bash
# 1. Create file
touch blog/content/react-hooks-bangla.mdx

# 2. Add frontmatter & content (see MDX guidelines above)

# 3. Preview locally
pnpm dev

# 4. Verify accessibility & Bangla rendering

# 5. Commit
git add blog/content/react-hooks-bangla.mdx
git commit -m "feat(blog): add React Hooks tutorial in Bangla"
```

### Add shadcn/ui Component
```bash
# Install component
pnpx shadcn@latest add button

# Component added to components/ui/button.tsx
# Import & use
import { Button } from '@/components/ui/button';
```

### Update Dependencies
```bash
# Check outdated packages
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update next

# Update & verify
pnpm build
```

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules & reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Build again
pnpm build
```

### Bangla Font Not Loading
1. Verify CDN link in `layout.tsx` or `_document.tsx`
2. Check network tab—font file should load
3. Ensure `.bangla-text` class is applied
4. Try local font as fallback

### Type Errors
```bash
# Regenerate types
pnpm type-check

# If using path aliases, verify tsconfig.json:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Resources

- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **MDX:** [mdxjs.com](https://mdxjs.com/)
- **Fumadocs:** [fumadocs.vercel.app](https://fumadocs.vercel.app/)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Bangla Fonts:** [banglawebfonts.pages.dev](https://banglawebfonts.pages.dev/)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com/)
- **Vercel Guidelines:** [github.com/vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)
- **WCAG Guidelines:** [w3.org/WAI/WCAG21/quickref](https://www.w3.org/WAI/WCAG21/quickref/)
- **APCA Contrast:** [apcacontrast.com](https://apcacontrast.com/)

## Support

- **Author:** Likhon Sheikh
- **Telegram:** t.me/likhonsheikh
- **GitHub:** github.com/likhonshelkh
- **Issues:** github.com/likhonshelkh/likhonsheikh.com/issues

---
## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`
 
## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible
# Sample AGENTS.md file

## Dev environment tips
- Use `pnpm dlx turbo run where <project_name>` to jump to a package instead of scanning with `ls`.
- Run `pnpm install --filter <project_name>` to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
- Use `pnpm create vite@latest <project_name> -- --template react-ts` to spin up a new React + Vite package with TypeScript checks ready.
- Check the name field inside each package's package.json to confirm the right name—skip the top-level one.

## Testing instructions
- Find the CI plan in the .github/workflows folder.
- Run `pnpm turbo run test --filter <project_name>` to run every check defined for that package.
- From the package root you can just call `pnpm test`. The commit should pass all tests before you merge.
- To focus on one step, add the Vitest pattern: `pnpm vitest run -t "<test name>"`.
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `pnpm lint --filter <project_name>` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions
- Title format: [<project_name>] <Title>
- Always run `pnpm lint` and `pnpm test` before committing.

*This AGENTS.md follows the [agent.md specification](https://agent.md) & [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) for building accessible, performant, and user-friendly web interfaces.*
