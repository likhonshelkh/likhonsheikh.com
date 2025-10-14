import assert from "node:assert/strict";
import test from "node:test";

import { generateMetadata } from "@/app/(site)/[lang]/(post)/[slug]/page";

test("metadata alternates only include locales with translations", async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({ lang: "en", slug: "typography-grid" }),
  });

  const languages = metadata.alternates?.languages ?? {};

  assert.equal(languages.en, "/en/typography-grid", "English alternate should be present");
  assert.ok(!("bn" in languages), "Bangla alternate should be omitted for missing translation");
});
