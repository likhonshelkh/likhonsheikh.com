We need to do make ready likhonsheikh.com
Author : Likhon Sheikh
Social : t.me/likhonsheikh
Githuh : https://github.com/likhonshelkh

A minimal blog template built using Next.js.

<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Likhom Sheikh</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
    <link href="https://banglawebfonts.pages.dev/css/solaiman-lipi.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Playfair Display', 'Solaiman Lipi', serif;
        }
    </style>
</head>

Performance Tip
You can use the .min.css version for better performance and faster loading times.
Standard CSS:
https://banglawebfonts.pages.dev/css/solaiman-lipi.css
Minified CSS:
https://banglawebfonts.pages.dev/css/solaiman-lipi.min.css

---
title: Blog Template
date: 2025-09-16
description: A minimal blog template built using Next.js.
author: dillionverma
published: true
---

<div className="flex max-w-[800px] flex-col gap-4">
  <video
    autoPlay
    loop
    muted
    playsInline
    src="/blog-demo.mp4"
    className="w-full rounded-xl border"
  />
  <div className="flex w-full flex-col gap-2 sm:flex-row">
    <TemplateOpen url="https://github.com/magicuidesign/blog-template" free />
    <TemplatePreview href="https://blog-magicui.vercel.app/">
      Live Preview{" "}
    </TemplatePreview>
  </div>
</div>

A minimal blogs & template to  your product updates, releases, and improvements in a beautiful timeline format. Built with Next.js, TailwindCSS, and Fumadocs for easy content management.

### Dependencies

- Next.js 15
- React 19
- TypeScript 5
- TailwindCSS 4
- Fumadocs UI
- next-themes
- radix-ui
- shadcn/ui

### Tech Stack

<TechStack
  technologies={["nextjs", "react", "typescript", "tailwindcss", "shadcn"]}
/>

✨ Features

🎨 Modern Design - Clean, responsive interface
📝 MDX Support - Write blog posts in MDX with full component support
🌙 Dark Mode - Built-in dark/light theme toggle
🏷️ Tags & Categories - Organize content with tags
⭐ Featured Posts - Highlight your best articles
📱 Mobile Responsive - Perfect on all devices
🚀 Fast Performance - Optimized with Next.js 15


# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

✍️ Adding Blog Posts

Create a new MDX file in blog/content/ with format your-post-title.mdx

Yes! You can absolutely use Bangla in your MDX blog posts. Here's how to optimize it for both Bangla and developer content:

🎯 Enhanced MDX Blog Post Format

```mdx
---
title: "আপনার ব্লগ পোস্টের শিরোনাম"
description: "আপনার পোস্টের সংক্ষিপ্ত বিবরণ"
date: "2024-12-01"
tags: ["React", "Next.js", "টিউটোরিয়াল", "বাংলা"]
featured: true
readTime: "১০ মিনিটের পড়া"
author: "আপনার নাম"
lang: "bn"  # Add language support
---

# আপনার ব্লগ পোস্ট কন্টেন্ট এখানে...

## বাংলা এবং ইংরেজি মিশ্র কন্টেন্ট

আপনি সহজেই বাংলা এবং ইংরেজি কনটেন্ট মিশ্রিত করতে পারেন। Markdown এবং MDX কম্পোনেন্টস উভয়ই সাপোর্ট করে।

## Extended Code Blocks for Better DX

### Basic Code Block with Syntax Highlighting
```tsx
// বাংলা কমেন্টও কাজ করবে!
import React from 'react';

interface User {
  name: string;
  age: number;
}

export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="user-card">
      <h1>ব্যবহারকারীর প্রোফাইল</h1>
      <p>নাম: {user.name}</p>
      <p>বয়স: {user.age}</p>
    </div>
  );
}
```

Advanced Code Block with Custom Component

```tsx filename="components/UserProfile.tsx" showLineNumbers
'use client';

import { useState, useEffect } from 'react';

/**
 * ব্যবহারকারীর প্রোফাইল দেখানোর কম্পোনেন্ট
 * @param user - ব্যবহারকারীর তথ্য
 */
export default function UserProfile({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // সিমুলেট করা API কল
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <div>লোড হচ্ছে...</div>;
  }

  return (
    <div dir="ltr" className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">ব্যবহারকারীর বিস্তারিত</h2>
      <UserDetails user={user} />
    </div>
  );
}
```

Interactive Code Example

```jsx live preview
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 border rounded-lg">
      <h3>গণনা: {count}</h3>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        বাড়ান
      </button>
      <button 
        onClick={() => setCount(count - 1)}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
      >
        কমান
      </button>
    </div>
  );
}
```

বাংলা টাইপোগ্রাফির জন্য বিশেষ টিপস

Proper Styling for Bangla Text

```css
/* আপনার CSS ফাইলে যোগ করুন */
.bangla-text {
  font-family: 'SolaimanLipi', 'Kalpurush', 'Siyam Rupali', sans-serif;
  line-height: 1.8;
  text-align: justify;
}

.code-comment {
  font-style: italic;
  color: #6a737d;
}
```

Custom MDX Components for Bangla

```tsx
// components/BanglaText.jsx
export function BanglaText({ children }) {
  return (
    <div className="bangla-text" dir="ltr">
      {children}
    </div>
  );
}

export function CodeWithBangla({ code, explanation }) {
  return (
    <div className="my-6">
      <pre>{code}</pre>
      <p className="bangla-text mt-2 text-sm text-gray-600">
        {explanation}
      </p>
    </div>
  );
}
```

ব্যবহারের উদাহরণ

```jsx
import { BanglaText, CodeWithBangla } from '../components/BanglaText';

<BanglaText>
  ## কেন React ব্যবহার করবেন?
  
  React একটি জনপ্রিয় JavaScript লাইব্রেরি যা ইউজার ইন্টারফেস তৈরি করতে ব্যবহৃত হয়।
  
  ### প্রধান সুবিধাসমূহ:
  
  - **কম্পোনেন্ট ভিত্তিক** - পুনঃব্যবহারযোগ্য কম্পোনেন্ট
  - **ভার্চুয়াল DOM** - দ্রুত পারফরম্যান্স
  - **বড় কমিউনিটি** - প্রচুর রিসোর্স available
</BanglaText>

<CodeWithBangla
  code={`function greet(name) {
  return "Hello, " + name + "!";
}`}
  explanation="এটি একটি সাধারণ ফাংশন যা নাম নিয়ে অভিবাদন রিটার্ন করে"
/>
```

📝 Optimized Frontmatter for Multi-language

```yaml
---
title: "React দিয়ে মডার্ন ওয়েব ডেভেলপমেন্ট"
description: "আধুনিক ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টের জন্য React এর সম্পূর্ণ গাইড"
date: "2024-12-01"
tags: 
  - "React"
  - "ওয়েব ডেভেলপমেন্ট"
  - "JavaScript"
  - "বাংলা টিউটোরিয়াল"
  - "Frontend"
featured: true
readTime: "১৫ মিনিটের পড়া"
author: "আপনার নাম"
authorImage: "/images/authors/your-name.jpg"
lang: "bn"
category: "ওয়েব ডেভেলপমেন্ট"
coverImage: "/images/posts/react-bangla.jpg"
---
```

Key Points for Success:

1. Font Support: Use Bangla-friendly fonts in your CSS
2. RTL/LTR Management: Handle text direction properly
3. Syntax Highlighting: Ensure your highlighter supports Bangla comments
4. Custom Components: Create reusable components for Bangla content
5. SEO Optimization: Use proper lang attributes and meta tags

এই ফরম্যাটে আপনি বাংলা এবং English content এর মধ্যে seamless experience দিতে পারবেন, আর developers এর জন্য rich code display করতে পারবেন! 🚀

Customization

Adding New Tags/Categories

Simply add them to your blog post frontmatter. The system automatically generates tag pages.

Featured Posts

Set featured: true in your blog post frontmatter to highlight it on the homepage (you can create a dedicated feature section in the home page).

Styling

The project uses Tailwind CSS with a custom design system. Modify styles in:

app/globals.css - Global styles
Individual component files - Component-specific styles

Then reference your author in blog posts using the key (e.g., author: "yourname").
Individual component files - Component-specific styles
For Authors

Add your author details to the lib/authors.ts file
📖 Technologies Used

Next.js 15 - React framework with App Router
Fumadocs MDX - MDX processing and components
Tailwind CSS - Utility-first CSS framework
TypeScript - Type-safe JavaScript
Geist Font - Modern typography

