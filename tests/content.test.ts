import assert from "node:assert/strict";
import test from "node:test";

import { getAllPosts } from "@/lib/content";

test("posts are sorted by date and include metadata", async () => {
  const posts = await getAllPosts("en");
  assert.ok(posts.length >= 2, "expected at least two English posts");

  for (const post of posts) {
    assert.ok(post.slug.length > 0, "post slug should exist");
    assert.ok(post.title.length > 0, "post title should exist");
    assert.ok(post.summary.length > 0, "post summary should exist");
    assert.ok(post.readingTime.includes("min"), "reading time should be computed");
  }

  const dates = posts.map((post) => post.date);
  const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
  assert.deepEqual(dates, sorted, "posts should be sorted by descending date");
});

test("Bangla posts retain locale metadata", async () => {
  const posts = await getAllPosts("bn");
  assert.ok(posts.length >= 1);
  const target = posts.find((post) => post.slug === "design-system");
  assert.ok(target);
  assert.equal(target?.locale, "bn");
  assert.ok(target?.summary.includes("বাংলা"));
});

test("slug lookup tracks locales with available translations", async () => {
  const result = await getAllPosts("en", { withSlugLookup: true });

  assert.ok(Array.isArray(result.posts), "expected posts array");
  assert.ok(result.slugLookup instanceof Map, "slug lookup should be a Map");

  const englishSlugs = result.slugLookup.get("en");
  const banglaSlugs = result.slugLookup.get("bn");

  assert.ok(englishSlugs?.has("typography-grid"), "English slug should exist in lookup");
  assert.ok(!banglaSlugs?.has("typography-grid"), "Bangla lookup should omit missing translation");
});
