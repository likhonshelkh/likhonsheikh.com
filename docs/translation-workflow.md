# Content translation workflow

New English posts should always be translated through the automated workflow so that localized content stays in sync.

1. Make sure you have a Google Cloud project with the Translate API enabled and set `GOOGLE_TRANSLATE_API_KEY` in your shell.
2. Author or update the English source in `src/content/en/*.mdx` and commit it.
3. Run `pnpm translate -- --locale=bn` (replace `bn` with the locale you are targeting). The script reads the English MDX, calls Google Translate for the front matter fields and body, and writes the localized copy under `src/content/<locale>/` with `lang`, `translationSource`, and `translatedFrom` metadata.
4. Review the generated MDX, commit any touch-ups, and ship the change.

The script can be rerun whenever English copy changes; it overwrites the localized file with fresh machine translations so you can iterate quickly before doing any human editing.
