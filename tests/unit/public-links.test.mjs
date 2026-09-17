import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkPublicLink } from '../../scripts/check-public-link.mjs'

const url = 'https://example.com/project'
const sleep = async () => {}

test('retries rate limiting and server errors before succeeding', async () => {
  const statuses = [429, 503, 200]
  const delays = []
  const result = await checkPublicLink(url, {
    fetcher: async () => new Response(null, { status: statuses.shift(), headers: { 'Retry-After': '120' } }),
    sleep: async milliseconds => { delays.push(milliseconds) },
  })
  assert.equal(result.outcome, 'reachable')
  assert.equal(result.attempts, 3)
  assert.deepEqual(delays, [10_000, 10_000])
})

test('404 and 410 fail immediately instead of being excused as transient', async () => {
  for (const status of [404, 410]) {
    const result = await checkPublicLink(url, { fetcher: async () => new Response(null, { status }), sleep })
    assert.equal(result.outcome, 'broken')
    assert.equal(result.attempts, 1)
  }
})

test('bot restrictions are explicitly inconclusive', async () => {
  const result = await checkPublicLink(url, { fetcher: async () => new Response(null, { status: 403 }), sleep })
  assert.equal(result.outcome, 'inconclusive')
  assert.match(result.detail, /verify manually/)
})

test('network failures are retried and never claimed reachable', async () => {
  let attempts = 0
  const result = await checkPublicLink(url, {
    fetcher: async () => { attempts++; throw new TypeError('fetch failed') }, sleep,
  })
  assert.equal(attempts, 3)
  assert.equal(result.outcome, 'inconclusive')
  assert.match(result.detail, /retries exhausted/)
})

test('persistent service errors remain inconclusive after retries', async () => {
  const result = await checkPublicLink(url, { fetcher: async () => new Response(null, { status: 503 }), sleep })
  assert.equal(result.attempts, 3)
  assert.equal(result.status, 503)
  assert.equal(result.outcome, 'inconclusive')
})
