# Security headers rollout

`public/_headers` is copied to `dist/_headers` by Vite and read by Cloudflare
Pages. The checked-in resource policy uses **enforcement** mode through
`Content-Security-Policy`, blocking resources that violate the policy after
deployment. It replaces the report-only header with the same directives.
`X-Frame-Options: DENY` immediately prevents framing, including same-origin
framing; the portfolio has no supported embedding use case.

## Report-only validation

Before approving enforcement, the maintainer reported that manual browser checks
passed with no CSP warnings. Cloudflare analytics successfully sent a POST to
`https://cloudflareinsights.com/cdn-cgi/rum`, returning HTTP 204. This is
maintainer-reported evidence from the report-only stage, not verification of an
enforced deployment. The browser/version, route list, and deployed revision were
not supplied with that report. Repeat the rollout checks below after enforcement
is deployed.

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
During report-only validation or rollback, a warning about the lack of a reporting
endpoint may appear; it is not evidence that a resource was blocked. Do not point
reports at a nonexistent endpoint or Cloudflare's unrelated network-error
reporting service. This setup does not
collect unattended production visitor reports.

## HSTS: explicit headers and inherited .dev protection

The `.dev` top-level domain is HSTS-preloaded, including its subdomains.
The preload service reports `www.akmasha.dev` as `preloaded` through `dev`.
Browsers honoring that entry upgrade HTTP to HTTPS before contacting either
hostname, including on a first visit. A missing explicit response header does
not remove that inherited protection. Clients without that preload behavior
are outside this guarantee; a `curl` header check only shows what the server sends.

| Hostname | Initial HTTPS header | Delivery |
| --- | --- | --- |
| `akmasha.dev` | `Strict-Transport-Security: max-age=86400` | Host-specific Pages rule for static responses. Verify redirects separately. |
| `www.akmasha.dev` | `Strict-Transport-Security: max-age=86400` where Pages serves a response | The Pages rule does not cover the existing HTTPS 308 redirect. An explicit header on that redirect is optional; its absence is an accepted, documented limitation because of inherited `.dev` preload protection. |

The two explicit response policies remain scoped to their respective hosts,
without `includeSubDomains` or `preload`. If received over HTTPS, these headers
are remembered independently. Their one-day lifetime only limits the dynamically
learned policies; it does not limit or override inherited `.dev` preloading.
Omitting those directives does not opt either hostname or other `.dev`
subdomains out of the TLD's protection. Keep valid HTTPS working on both hosts.

Cloudflare processes redirects before Pages headers. Preserve the working 308
redirect to `https://akmasha.dev`, including its path/query behavior. No additional
Cloudflare rule, Worker, redirect replacement, or other infrastructure is required
solely to attach an HSTS header to that redirect. Validate HTTPS, redirect behavior,
and inherited preload coverage separately from explicit header presence.

## Local validation

```sh
npm run lint
npm run build
npm run test:unit
npx playwright test tests/e2e/security-headers.spec.ts --project=desktop --project=mobile
npm run test:e2e
```

The security tests read the built `_headers` and inject its common headers into
local document responses. They exercise the shipped enforcement policy and a
report-only rollback simulation independently, with only one CSP header in each
mode. They check resource loading, fonts, React styles, rejection/reporting of an inline
script, and denial of framing. The analytics test uses a synthetic script and sink at the allowed URLs;
it does not send fabricated analytics or prove that the live beacon works.
The tests also check that HSTS rules are limited to the two named hosts and that
the build preserves the source configuration. They do not emulate Cloudflare's
matching, redirects, or TLS. These local tests are skipped when
`PLAYWRIGHT_BASE_URL` is set so they cannot mask live response headers.

## Authorized enforcement rollout

1. Deploy the enforcement configuration only after live report-only validation
   and approval. Verify valid HTTPS and inherited `.dev` preload coverage for
   both hosts, preserving the existing www redirect.
   Deployment and Cloudflare changes require separate authorization.
2. Inspect HTTPS **GET response headers without following redirects**, using
   `curl.exe -sS -D - -o NUL <URL>` on Windows. Check:

   | URL | Expected result |
   | --- | --- |
   | `https://akmasha.dev/` | 200; enforced CSP, DENY, nosniff, referrer policy, one HSTS header. |
   | `https://akmasha.dev/projects/traineros/` | 200; same headers and route-specific title/canonical metadata. |
   | `https://akmasha.dev/not-a-real-page` | 404; same security headers and not-found metadata. |
   | `https://akmasha.dev/Ekene_Masha_Resume.pdf` | 200; `application/pdf`, HSTS, PDF opens normally. |
   | `https://www.akmasha.dev/` | Valid HTTPS; 308 to `https://akmasha.dev/`. An explicit HSTS header is optional. |
   | `https://www.akmasha.dev/projects/traineros/?check=1` | Valid HTTPS; 308 preserving the path and query. An explicit HSTS header is optional. |

   Pages responses must carry `Content-Security-Policy` with the checked-in
   directive value and no `Content-Security-Policy-Report-Only` header. Where an
   explicit HSTS header is served, its value must be exactly
   `max-age=86400`, with no duplicates, `includeSubDomains`, or `preload`.
   Record an absent header on the www redirect as the accepted limitation above,
   not as missing protection in browsers honoring the `.dev` preload entry.
   Confirm inherited coverage using the linked preload status and Chromium list.
   Also check HTTP entry points for both hosts and confirm they lead to HTTPS
   without a loop. A final apex 200 reached using `curl -L` does not establish
   the www response's headers or the browser's preload protection.
3. In a clean browser with extensions disabled, visit all pages directly and
   through navigation on desktop and mobile. Open DevTools with Preserve log:
   confirm fonts, screenshot thumbnails/full-size lightboxes, mobile menu,
   keyboard focus/Escape, resume, and external links work. Check a missing page.
   Confirm the real Cloudflare script loads and its POST to
   `https://cloudflareinsights.com/cdn-cgi/rum` still returns 204 when navigating
   away. Record any CSP violation's directive and resource URL.
4. Require zero unexplained resource violations across those flows. Record the
   deployed revision, browser, routes checked, and results. If enforcement breaks
   a supported flow, use the rollback below, fix narrow policy omissions, and
   repeat report-only validation before enforcing again. Do not add broad
   wildcards or `unsafe-inline`/`unsafe-eval` to silence warnings.
5. Verify an iframe cannot render the site and record the post-enforcement
   results. Local enforcement tests alone do not establish production behavior.

Completing issue #12 requires verification of production rollout and normal page
behavior. A successful local build or test run is not production evidence.

## Rollback

If enforcing CSP breaks a supported flow, replace `Content-Security-Policy` with
`Content-Security-Policy-Report-Only`, retaining the directive value and removing
the enforcing header. Update the stage assertion in the security tests to expect
report-only; the test helper supports both modes. Redeploy with authorization and
recheck the affected response and browser. Keep the independent framing
restriction unless embedding is deliberately approved.

To clear a dynamically learned host policy, serve
`Strict-Transport-Security: max-age=0` over HTTPS from that hostname and verify
the response. Removing the header alone leaves that policy cached until expiry.
This does not disable inherited `.dev` preloading, and waiting one day does not
make HTTP usable in browsers honoring it. Valid HTTPS must remain available on
both hosts. Do not modify the www redirect solely to clear an optional dynamic
policy; any previously learned policy can expire while preload protection remains.

## References

- [Cloudflare Pages headers and redirect precedence](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare analytics CSP requirements](https://developers.cloudflare.com/web-analytics/faq/#what-do-i-need-to-add-to-my-content-security-policy-csp)
- [Google Registry: .dev HSTS preloading](https://www.registry.google/domains/dev/)
- [Inherited preload status of www.akmasha.dev](https://hstspreload.org/api/v2/status?domain=www.akmasha.dev)
- [Chromium HSTS preload list: dev includes subdomains](https://chromium.googlesource.com/chromium/src/+/main/net/http/transport_security_state_static.json)
- [CSP style attributes and DOM style properties](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr)
- [HSTS host scope and expiration](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
