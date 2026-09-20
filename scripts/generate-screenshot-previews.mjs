import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const assets = path.join(root, 'src/assets')
const metadata = {}
let originalBytes = 0
let smallBytes = 0
let largeBytes = 0

async function originals(directory = '') {
  const files = []
  for (const entry of await readdir(path.join(assets, directory), { withFileTypes: true })) {
    const relative = path.posix.join(directory, entry.name)
    if (relative === 'thumbnails') continue
    if (entry.isDirectory()) files.push(...await originals(relative))
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) files.push(relative)
  }
  return files.sort()
}

for (const src of await originals()) {
  const input = path.join(assets, src)
  const { width, height, orientation } = await sharp(input).metadata()
  if (!width || !height || (orientation && orientation !== 1)) {
    throw new Error(`Normalize image orientation and dimensions before generating previews: ${src}`)
  }
  const previews = []
  const sizes = [...new Set([Math.min(640, width), Math.min(1200, width)])]
  for (const size of sizes) {
    const previewSrc = `thumbnails/${src}-${size}.webp`
    const output = path.join(assets, previewSrc)
    await mkdir(path.dirname(output), { recursive: true })
    const info = await sharp(input)
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6, smartSubsample: true })
      .toFile(output)
    previews.push({ src: previewSrc, width: info.width, height: info.height })
    if (size === sizes[0]) smallBytes += info.size
    if (size === sizes.at(-1)) largeBytes += info.size
  }
  metadata[src] = { width, height, previews }
  originalBytes += (await stat(input)).size
}

await writeFile(path.join(root, 'src/data/screenshot-images.json'), `${JSON.stringify(metadata, null, 2)}\n`)
console.log(`Generated previews for ${Object.keys(metadata).length} images.`)
console.log(JSON.stringify({ originalBytes, smallPreviewBytes: smallBytes, largePreviewBytes: largeBytes }))
