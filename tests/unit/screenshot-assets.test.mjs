import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import sharp from 'sharp'

const root = new URL('../../src/assets/', import.meta.url)
const images = JSON.parse(await readFile(new URL('../../src/data/screenshot-images.json', import.meta.url), 'utf8'))

for (const [src, image] of Object.entries(images)) {
  test(`${src}: metadata matches the original and WebP previews`, async () => {
    const original = await sharp(await readFile(new URL(src, root))).metadata()
    assert.equal(image.width, original.width)
    assert.equal(image.height, original.height)
    assert(image.previews.length > 0)
    const widths = []
    for (const preview of image.previews) {
      const actual = await sharp(await readFile(new URL(preview.src, root))).metadata()
      assert.equal(actual.format, 'webp')
      assert.equal(preview.width, actual.width)
      assert.equal(preview.height, actual.height)
      assert(preview.width <= original.width && preview.width <= 1200)
      assert(Math.abs(preview.height - preview.width * original.height / original.width) <= 1)
      widths.push(preview.width)
    }
    assert.deepEqual(widths, [...new Set(widths)].sort((a, b) => a - b))
  })
}

test('either preview set transfers less than the originals', async () => {
  let originals = 0
  let small = 0
  let large = 0
  for (const [src, image] of Object.entries(images)) {
    originals += (await stat(new URL(src, root))).size
    small += (await stat(new URL(image.previews[0].src, root))).size
    large += (await stat(new URL(image.previews.at(-1).src, root))).size
  }
  assert(small < originals)
  assert(large < originals)
})
