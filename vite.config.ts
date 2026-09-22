import { build, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { projects } from './src/data/projects'
import {
  allPageMeta,
  canonicalUrl,
  NOT_FOUND_META,
  SITE_URL,
  type PageMeta,
} from './src/utils/seo'

// Share the year between the two bundles so hydration also works across New Year.
const define = { 'import.meta.env.VITE_BUILD_YEAR': JSON.stringify(new Date().getFullYear()) }

/** Minimal escaping for values interpolated into HTML attributes. */
function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function applyMeta(html: string, meta: PageMeta): string {
  const url = canonicalUrl(meta.path)
  const rules: [RegExp, string][] = [
    [/<title>[\s\S]*?<\/title>/, `<title>${attr(meta.title)}</title>`],
    [
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${attr(meta.description)}" />`,
    ],
    [
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${attr(url)}" />`,
    ],
    [
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="${meta.type}" />`,
    ],
    [
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${attr(url)}" />`,
    ],
    [
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${attr(meta.title)}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${attr(meta.description)}" />`,
    ],
    [
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    ],
  ]

  let out = html
  for (const [pattern, replacement] of rules) {
    if (!pattern.test(out)) {
      // A silent miss would ship the homepage's metadata on every route, which
      // is the exact bug this plugin exists to fix. Fail the build instead.
      throw new Error(
        `[prerender-pages] no match for ${pattern} in index.html. ` +
          `The head tags must stay single-line and match the shapes in this plugin.`,
      )
    }
    out = out.replace(pattern, replacement)
  }
  return out
}

/**
 * Writes each route's React content and metadata into a static HTML file.
 *
 * Link-preview crawlers do not run JavaScript, so client-side meta updates are
 * invisible to them. Without this, every shared URL previews as the homepage.
 * The route table comes from src/utils/seo.ts, the same module the runtime hook
 * reads, so the prerendered HTML and the client can't disagree.
 */
function prerenderPages(): Plugin {
  return {
    name: 'prerender-pages',
    apply: 'build',
    async closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      const indexPath = path.join(outDir, 'index.html')
      const template = await readFile(indexPath, 'utf8')

      // Compile the same components with Vite so asset URLs and glob imports
      // match the browser build. This bundle is build-only, never deployed.
      const renderDir = path.resolve(__dirname, 'node_modules/.cache/portfolio-prerender')
      await build({
        configFile: false,
        plugins: [react()],
        define,
        build: {
          ssr: 'src/entry-server.tsx',
          outDir: renderDir,
          copyPublicDir: false,
          emptyOutDir: true,
        },
      })
      const { render }: { render: (pathname: string) => string } = await import(
        `${pathToFileURL(path.join(renderDir, 'entry-server.js')).href}?build=${Date.now()}`
      )
      const root = '<div id="root"></div>'
      if (!template.includes(root)) throw new Error('[prerender-pages] Missing root in index.html')
      function pageHtml(meta: PageMeta): string {
        const content = render(meta.path)
        if (!content.includes('<main')) throw new Error(`[prerender-pages] Empty page: ${meta.path}`)
        return applyMeta(template, meta).replace(root, () =>
          `<div id="root" data-rendered-path="${attr(meta.path)}">${content}</div>`,
        )
      }

      const pages = allPageMeta(projects)
      for (const meta of pages) {
        const html = pageHtml(meta)
        if (meta.path === '/') {
          await writeFile(indexPath, html, 'utf8')
          continue
        }
        // Directory indexes match the trailing-slash URLs in the metadata and
        // links. Cloudflare Pages redirects the slashless versions here.
        const dir = path.join(outDir, meta.path)
        await mkdir(dir, { recursive: true })
        await writeFile(path.join(dir, 'index.html'), html, 'utf8')
      }

      // Cloudflare Pages serves 404.html for unmatched paths when no _redirects
      // rule claims them; giving it the right title beats the default.
      await writeFile(
        path.join(outDir, '404.html'),
        pageHtml(NOT_FOUND_META),
        'utf8',
      )

      // Use the same content registry and canonical URLs as the page metadata;
      // the separately generated 404 page and static assets are not listed.
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...pages.map(meta => `  <url><loc>${attr(canonicalUrl(meta.path))}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n')
      await writeFile(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8')
      await writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
        'utf8',
      )

      this.info(`prerendered ${pages.length} routes + 404.html, sitemap.xml and robots.txt`)
    },
  }
}

export default defineConfig({
  define,
  plugins: [react(), tailwindcss(), prerenderPages()],
})
