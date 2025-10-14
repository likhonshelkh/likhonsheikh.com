const path = require("node:path");

const { build } = require("esbuild");
const { test, expect } = require("@playwright/test");

const repoRoot = path.resolve(__dirname, "..");

const aliasPlugin = {
  name: "alias-stubs",
  setup(buildContext) {
    buildContext.onResolve({ filter: /^@\/(.*)$/ }, (args) => ({
      path: path.resolve(repoRoot, "src", args.path.slice(2)),
    }));

    buildContext.onResolve({ filter: /^next\/link$/ }, () => ({
      path: path.resolve(repoRoot, "tests", "stubs", "next-link.tsx"),
    }));

    buildContext.onResolve({ filter: /^next\/navigation$/ }, () => ({
      path: path.resolve(repoRoot, "tests", "stubs", "next-navigation.ts"),
    }));
  },
};

async function bundleSiteHeader() {
  const result = await build({
    stdin: {
      contents: `import { createRoot } from "react-dom/client";
import React from "react";
import { SiteHeader } from "./src/components/layout/site-header";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(React.createElement(SiteHeader, { locale: "en" }));
}
`,
      resolveDir: repoRoot,
      loader: "tsx",
    },
    bundle: true,
    write: false,
    platform: "browser",
    format: "iife",
    target: ["es2020"],
    plugins: [aliasPlugin],
  });

  if (!result.outputFiles || result.outputFiles.length === 0) {
    throw new Error("Failed to generate SiteHeader bundle");
  }

  return result.outputFiles[0].text;
}

test.describe("SiteHeader", () => {
  test("renders translate toggle and announces changes", async ({ page }) => {
    await page.route(/translate\.google\.com\/translate_a\/element\.js/, (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `window.google = {
  translate: {
    TranslateElement: function (_options, elementId) {
      const container = document.getElementById(elementId);
      if (container && !container.querySelector('select')) {
        const select = document.createElement('select');
        select.className = 'goog-te-combo';
        const blank = document.createElement('option');
        blank.value = '';
        blank.textContent = 'English';
        select.append(blank);
        ['es', 'hi'].forEach(code => {
          const option = document.createElement('option');
          option.value = code;
          option.textContent = code;
          select.append(option);
        });
        container.append(select);
      }
    }
  }
};
if (window.googleTranslateElementInit) {
  window.googleTranslateElementInit();
}
`,
      })
    );

    await page.setContent('<div id="root"></div>');

    const bundle = await bundleSiteHeader();
    await page.addScriptTag({ content: bundle });

    const group = page.getByRole("group", { name: "Machine translation" });
    await expect(group).toBeVisible();

    const spanishButton = group.getByRole("button", { name: "Español" });
    await spanishButton.click();

    const liveRegion = page.getByRole("status", { name: "Translation status" });
    await expect(liveRegion).toHaveText(/Translated to Español/i);

    const englishButton = group.getByRole("button", { name: "English" });
    await englishButton.click();
    await expect(liveRegion).toHaveText(/Original English copy/i);
  });
});
