// Runs after `next build` (output: export).
// - Adds .nojekyll so GitHub Pages serves the _next/ directory.
// - Writes a root index.html that redirects "/" to the default locale (/fa/),
//   with hreflang alternates so search engines can discover every language.
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://javadasadi.com").replace(/\/$/, "");
const locales = ["fa", "en", "ar", "ru"];

writeFileSync(join(outDir, ".nojekyll"), "");

const alternates = locales
  .map((l) => `    <link rel="alternate" hreflang="${l}" href="${base}/${l}/" />`)
  .join("\n");

const html = `<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>جواد اسدی | املاک ساری</title>
    <link rel="canonical" href="${base}/fa/" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${base}/fa/" />
    <meta http-equiv="refresh" content="0; url=./fa/" />
    <script>location.replace("./fa/" + location.search + location.hash);</script>
  </head>
  <body>
    <p>در حال انتقال به <a href="./fa/">جواد اسدی | املاک ساری</a>…</p>
  </body>
</html>
`;

writeFileSync(join(outDir, "index.html"), html);
console.log("postexport: wrote out/index.html + out/.nojekyll");
