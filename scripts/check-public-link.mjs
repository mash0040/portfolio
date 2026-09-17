import { setTimeout as delay } from 'node:timers/promises'

/** GET avoids false negatives from hosts that reject HEAD. No credentials. */
export async function checkPublicLink(url, { fetcher = fetch, sleep = delay } = {}) {
  let detail = ''
  let status
  for (let attempt = 1; attempt <= 3; attempt++) {
    let retryAfter = 0
    try {
      const response = await fetcher(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(12_000),
        headers: { 'User-Agent': 'Portfolio-Link-Check/1.0' },
      })
      status = response.status
      await response.body?.cancel()
      if (response.ok) return { url, outcome: 'reachable', status, attempts: attempt }
      detail = `HTTP ${status}`
      const transient = status === 408 || status === 429 || status >= 500 && status < 600
      // Login walls / bot blocks cannot establish that a public link works.
      if ([401, 403, 999].includes(status)) {
        return { url, outcome: 'inconclusive', status, attempts: attempt, detail: `${detail}: authentication or bot restriction; verify manually` }
      }
      if (!transient) return { url, outcome: 'broken', status, attempts: attempt, detail }
      const header = response.headers.get('retry-after')
      retryAfter = header ? Number(header) * 1000 : 0
      if (!Number.isFinite(retryAfter)) retryAfter = Date.parse(header) - Date.now()
    } catch (error) {
      status = undefined
      detail = `${error.name}: ${error.message}`
    }
    if (attempt < 3) await sleep(Math.min(10_000, Math.max(attempt * 1000, retryAfter || 0)))
  }
  return { url, outcome: 'inconclusive', status, attempts: 3, detail: `${detail}: retries exhausted; verify manually` }
}
