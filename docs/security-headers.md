# Security headers rollout

`public/_headers` is copied to `dist/_headers` by Vite and read by Cloudflare
Pages. The resource policy starts in **report-only** mode. It does not block
unwanted resources until a separate, validated enforcement rollout.
`X-Frame-Options: DENY` immediately prevents framing, including same-origin
framing; the portfolio has no supported embedding use case.

## Resource inventory

| Resource | Allowed source / decision |
| --- | --- |
| Vite scripts and CSS | Same origin. No inline scripts, event handlers, or eval. |
| Font stylesheet | `https://fonts.googleapis.com` from `index.html`. |
| Fraunces and JetBrains Mono fonts | `https://fonts.gstatic.com`. |
| Screenshots, icons, social image | Same origin; screenshot assets use `?no-inline`. No external image hosts or data URLs are needed. |
| React styles | React assigns individual DOM style properties for optical sizing, decoration, aspect ratios, and scroll locking. These remain usable with `style-src-attr 'none'`; raw style attributes and inline style elements are not allowed. |
| Cloudflare analytics script | `https://static.cloudflareinsights.com/beacon.min.js`, injected by Pages into production HTML. |
| Analytics delivery | Same-origin `/cdn-cgi/rum` and `https://cloudflareinsights.com` cover Cloudflare's documented delivery modes. Confirm the actual endpoint in the deployed browser. |
| External links | GitHub, LinkedIn, project demos, and NameDrop are navigation destinations, not embedded resources; they do not belong in resource allowlists. |
| Frames, plugins, forms, base URL changes | No supported use; denied. Resume access is a normal PDF link. |

There is no CSP reporting service configured. Violations are observed in browser
DevTools and captured by local Playwright tests using `securitypolicyviolation`.
A warning about the lack of a reporting endpoint is expected; it is not evidence
that a resource was blocked. Do not point reports at a nonexistent endpoint or
Cloudflare's unrelated network-error reporting service. This setup does not
collect unattended production visitor reports.

## HSTS: two independent host policies

| Hostname | Initial HTTPS header | Delivery |
| --- | --- | --- |
| `akmasha.dev` | `Strict-Transport-Security: max-age=86400` | Host-specific Pages rule for static responses. Verify redirects separately. |
| `www.akmasha.dev` | `Strict-Transport-Security: max-age=86400` | Must also be set on the existing HTTPS 308 redirect at the Cloudflare redirect layer. The Pages rule only covers responses that reach Pages. |

Neither policy contains `includeSubDomains` or `preload`. Each hostname must send
its own header over valid HTTPS; the browser remembers them independently.
The one-day lifetime limits the initial commitment. Keep HTTPS working on both
hosts and do not increase the duration until the rollout is verified.

**Deploying this repository alone does not complete the www policy.** Cloudflare
processes redirects before Pages headers. The current redirect configuration is
outside this repository and must be inspected during the authorized rollout.
Preserve the 308 redirect to `https://akmasha.dev` and its path/query behavior.
Configure `max-age=86400` on the HTTPS redirect response itself, scoped to
`www.akmasha.dev`. If a response-header Transform Rule is applicable to the
existing redirect, use this exact match and **Set static** (not Add):

```text
(http.host eq "www.akmasha.dev" and ssl)
Strict-Transport-Security: max-age=86400
```

Use Cloudflare Trace and the response checks below to verify execution. An
earlier terminating redirect can bypass later rules; creating a Transform Rule
is not proof that it applies. If the redirect mechanism cannot attach the
header, resolve that deployment configuration before declaring www complete.
Do not silently enable zone-wide HSTS, change unrelated hostnames, or replace
the redirect with new infrastructure. Any broader change needs its own review.

## Local validation

```sh
npm run lint
npm run build
npm run test:unit
npx playwright test tests/e2e/security-headers.spec.ts --project=desktop --project=mobile
npm run test:e2e
```

The security tests read the built `_headers` and inject its common headers into
local document responses. They first exercise report-only behavior, then exercise
the candidate policy in enforcement mode **only in the test browser**. They
check resource loading, fonts, React styles, rejection/reporting of an inline
script, and denial of framing. The analytics test uses a synthetic script and sink at the allowed URLs;
it does not send fabricated analytics or prove that the live beacon works.
The tests also check that HSTS rules are limited to the two named hosts and that
the build preserves the source configuration. They do not emulate Cloudflare's
matching, redirects, or TLS. These local tests are skipped when
`PLAYWRIGHT_BASE_URL` is set so they cannot mask live response headers.

## Authorized rollout and enforcement gate

1. Deploy report-only configuration and configure the www redirect's HSTS
   delivery. Deployment and Cloudflare changes require separate authorization.
2. Inspect HTTPS **GET response headers without following redirects**, using
   `curl.exe -sS -D - -o NUL <URL>` on Windows. Check:

   | URL | Expected result |
   | --- | --- |
   | `https://akmasha.dev/` | 200; report-only CSP, DENY, nosniff, referrer policy, one HSTS header. |
   | `https://akmasha.dev/projects/traineros/` | 200; same headers and route-specific title/canonical metadata. |
   | `https://akmasha.dev/not-a-real-page` | 404; same security headers and not-found metadata. |
   | `https://akmasha.dev/Ekene_Masha_Resume.pdf` | 200; `application/pdf`, HSTS, PDF opens normally. |
   | `https://www.akmasha.dev/` | 308 to `https://akmasha.dev/`; its own HSTS header. |
   | `https://www.akmasha.dev/projects/traineros/?check=1` | 308 preserving the path and query; its own HSTS header. |

   Every HTTPS HSTS value must be exactly `max-age=86400`, with no duplicate
   values, `includeSubDomains`, or `preload`. Also check HTTP entry points for
   both hosts and confirm they lead to HTTPS without a loop. A final apex 200
   reached using `curl -L` does not prove the www response carries HSTS.
3. In a clean browser with extensions disabled, visit all pages directly and
   through navigation on desktop and mobile. Open DevTools with Preserve log:
   confirm fonts, screenshot thumbnails/full-size lightboxes, mobile menu,
   keyboard focus/Escape, resume, and external links work. Check a missing page.
   Confirm the real Cloudflare script loads and an analytics request succeeds
   when navigating away. Record any CSP violation's directive and resource URL.
4. Require zero unexplained resource violations across those flows. Record the
   deployed revision, browser, routes checked, and results. Fix narrow policy
   omissions and repeat report-only validation; do not add broad wildcards or
   `unsafe-inline`/`unsafe-eval` to silence warnings.
5. Only after live report-only validation, change the header name from
   `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in a reviewed
   follow-up. Update the stage assertion in the security tests. Deploy with
   authorization, repeat all response/browser checks, and verify an iframe
   cannot render the site. Local enforcement tests alone do not satisfy this gate.

Issue #12 remains open until production rollout and normal page behavior have
been verified. A successful local build or test run is not production evidence.

## Rollback

If enforcing CSP breaks a supported flow, return the header name to report-only,
redeploy, and recheck the affected response and browser. Keep the independent
framing restriction unless embedding is deliberately approved.

To revoke HSTS, serve `Strict-Transport-Security: max-age=0` over HTTPS on **each**
hostname, including the www redirect, and verify both responses. Removing the
header alone does not clear a browser's cached policy. Keep valid HTTPS through
at least the previous max-age period for clients that do not revisit immediately.

## References

- [Cloudflare Pages headers and redirect precedence](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare analytics CSP requirements](https://developers.cloudflare.com/web-analytics/faq/#what-do-i-need-to-add-to-my-content-security-policy-csp)
- [Cloudflare Transform Rule execution order](https://developers.cloudflare.com/rules/transform/)
- [CSP style attributes and DOM style properties](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr)
- [HSTS host scope and expiration](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
