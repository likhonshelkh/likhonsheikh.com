import path from "node:path";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

import matter from "gray-matter";

import { defaultLocale } from "../src/lib/i18n";

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

if (!GOOGLE_TRANSLATE_API_KEY) {
  console.error("Missing GOOGLE_TRANSLATE_API_KEY environment variable.");
  process.exit(1);
}

function parseArgs(argv: string[]) {
  let locale: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--locale" || arg === "-l") {
      locale = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith("--locale=")) {
      locale = arg.split("=")[1];
      continue;
    }
  }

  return { locale };
}

const { locale: targetLocale } = parseArgs(process.argv.slice(2));

if (!targetLocale) {
  console.error("Usage: pnpm translate -- --locale=<target-locale>");
  process.exit(1);
}

if (targetLocale === defaultLocale) {
  console.error("Target locale must differ from the default locale.");
  process.exit(1);
}

const contentRoot = path.join(process.cwd(), "src", "content");
const sourceDir = path.join(contentRoot, defaultLocale);
const targetDir = path.join(contentRoot, targetLocale);

interface TranslationRequest {
  key: string;
  value: string;
  apply(translated: string): void;
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

async function translateText(values: TranslationRequest[]) {
  if (values.length === 0) {
    return;
  }

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: values.map((item) => item.value),
        source: defaultLocale,
        target: targetLocale,
        format: "text",
      }),
    },
  );

  const payload = await response.json();

  if (!response.ok || payload.error) {
    const message = payload?.error?.message ?? response.statusText;
    throw new Error(`Translation API error: ${message}`);
  }

  const translations = payload.data.translations as Array<{ translatedText: string }>;

  translations.forEach((translation: { translatedText: string }, index: number) => {
    const decoded = decodeHtmlEntities(translation.translatedText);
    values[index]?.apply(decoded);
  });
}

async function translateFile(fileName: string) {
  const filePath = path.join(sourceDir, fileName);
  const source = await readFile(filePath, "utf8");
  const { data, content } = matter(source);

  const tags = Array.isArray(data.tags)
    ? [...data.tags]
    : typeof data.tags === "string"
      ? [data.tags]
      : [];

  const translatedFrontmatter: Record<string, unknown> = {
    ...data,
    lang: targetLocale,
    translationSource: "google-translate",
    translatedFrom: typeof data.lang === "string" ? data.lang : defaultLocale,
  };

  const translations: TranslationRequest[] = [];

  if (typeof data.title === "string" && data.title.trim().length > 0) {
    translations.push({
      key: "title",
      value: data.title,
      apply(translated) {
        translatedFrontmatter.title = translated;
      },
    });
  }

  if (typeof data.summary === "string" && data.summary.trim().length > 0) {
    translations.push({
      key: "summary",
      value: data.summary,
      apply(translated) {
        translatedFrontmatter.summary = translated;
      },
    });
  }

  const translatedTags: string[] = [];
  let translatedTagCount = 0;

  tags.forEach((tag, index) => {
    if (typeof tag !== "string" || tag.trim().length === 0) {
      return;
    }

    translations.push({
      key: `tag-${index}`,
      value: tag,
      apply(translated) {
        translatedTags[index] = translated;
        translatedTagCount += 1;
      },
    });
  });

  let translatedBody = content;

  translations.push({
    key: "body",
    value: content,
    apply(translated) {
      translatedBody = translated;
    },
  });

  await translateText(translations);

  if (translatedTagCount === tags.length && tags.length > 0) {
    translatedFrontmatter.tags = translatedTags.map((tag, index) =>
      typeof tag === "string" && tag.length > 0 ? tag : tags[index],
    );
  } else {
    translatedFrontmatter.tags = tags;
  }

  const targetPath = path.join(targetDir, fileName);
  await mkdir(targetDir, { recursive: true });
  await writeFile(targetPath, matter.stringify(translatedBody, translatedFrontmatter), "utf8");

  console.log(`Translated ${fileName} → ${targetLocale}`);
}

async function main() {
  const files = (await readdir(sourceDir)).filter((file) => file.endsWith(".mdx"));

  for (const file of files) {
    await translateFile(file);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
