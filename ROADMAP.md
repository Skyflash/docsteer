# Roadmap and maintenance notes

Work that is known, deliberately deferred, or easy to forget. Written down at
the 1.0.0 release so none of it has to be rediscovered.

## Planned

### Migrate Sass from `@import` to `@use` / `@forward`

**Why it matters:** Dart Sass will remove `@import` in 3.0. The build works
today and only prints deprecation warnings, but this has an external deadline
that is not under our control.

**Why it was not done for 1.0.0:** it touches all 21 files under `_sass/` and
changes how variables and mixins propagate. In a theme, the visual output *is*
the product: a subtle regression in one of the six skins across light and dark
is invisible until a user reports it.

**How to do it safely:**

1. Work on a branch, never on `main`.
2. Capture a reference screenshot of the same page in every skin, both modes,
   *before* touching anything — DevTools, device toolbar, exact viewport, then
   "Capture screenshot" from the command palette (Ctrl/Cmd+Shift+P).
3. `sass-migrator module --migrate-deps assets/css/main.scss` does most of it.
4. Re-capture and compare skin by skin.
5. Check the contrast floor again: every skin's `brand` must clear 4.5:1
   against its own `bg`. Mint once shipped at 4.28 and had to be darkened.

No public class or CSS custom property should change, so this is a patch
release, not a minor one.

## Nice to have

- **`CONTRIBUTING.md` and issue / PR templates.** GitHub shows generic prompts
  without them; worth adding if contributions start arriving.
- **A ruleset on `main`** requiring the *Deploy site* workflow to pass before a
  merge. Little value while working solo, real value once Dependabot PRs are
  merged in bulk.
- **Screenshots on the skins page.** `_docs/skins.md` describes six palettes
  without showing one. Six real captures would sell the feature far better than
  prose — and would give the lightbox something worth opening.

## Maintenance notes

### After any `bundle update`, re-add the Linux platform

```bash
bundle lock --add-platform x86_64-linux
```

`Gemfile.lock` is committed on purpose (this repo is a deployed site, not only
a gem). It is generated on Windows, so it records only `x64-mingw-ucrt`; CI runs
on Linux with `bundler-cache: true`, which installs in deployment mode and
**refuses** a lockfile that does not list the running platform. Forgetting this
breaks the deploy with:

> Your bundle only supports platforms ["x64-mingw-ucrt"] but your local platform
> is x86_64-linux.

### The custom domain is not this repository's to declare

The site is served from `cristiancastellari.it/docsteer/`, but that domain is
**not** configured on this repository. `GET /repos/Skyflash/docsteer/pages`
reports `cname: null`; the domain is set on the user page
(`Skyflash/skyflash.github.io`) and every project page under the account
inherits it.

So do **not** add a `CNAME` file here, however much the missing file looks like
an oversight. A `CNAME` in a project repository claims the domain for that
project site, which would take it away from the user page.

What does belong here is `url:` in `_config.yml`, which must name the host
readers land on. `skyflash.github.io` 301-redirects to the custom domain, so
pointing `url:` at it made every canonical, `og:url` and sitemap `<loc>` on the
site reference an address that bounces somewhere else.

### Enforce HTTPS is off

`GET /repos/Skyflash/docsteer/pages` reports `https_enforced: false`, and
`http://cristiancastellari.it/docsteer/` serves 200 rather than redirecting.
HTTPS works, it just is not required. The toggle is in the repository's
Settings → Pages, and needs the domain's DNS to be fully verified first.

### FAQ anchors are derived from question text

Rewording a question in a `layout: faq` page changes its URL fragment and breaks
every deep link already shared. Fix typos freely; think twice before rewording.
The slug is computed in **both** `_includes/faq-list.html` and `search.json` —
they must stay in sync.

### SVGs need explicit `width` and `height`

An SVG carrying only a `viewBox` has no intrinsic size. The lightbox caps size
rather than forcing it, so such an image opens *smaller* than it appeared in the
page. There is a fallback rule in `_sass/docsteer/_lightbox.scss`, but authoring
the dimensions is the real fix.

### Regenerating the social card

`assets/images/og-default.png` must be exactly **1200×630** at DPR 1 — the
1.91:1 ratio every platform crops to, and small enough that WhatsApp does not
skip it (it drops previews over roughly 300 kB).

It was captured from a throwaway 1200×630 HTML page, since no rasteriser is
available on this machine. That page was removed once the card existed; recover
it from history if the branding changes:

```bash
git log --all --oneline -- og-image.html     # find a commit that still has it
git show <sha>:og-image.html > og-image.html
```

To capture at an exact size, use DevTools rather than a window screenshot:
F12 → Ctrl+Shift+M → set Dimensions to `1200` × `630`, DPR `1`, zoom 100% →
Ctrl+Shift+P → "Capture screenshot". That grabs the viewport precisely.

### Keep demo assets out of the gem

`spec.files` in the gemspec subtracts a `demo_only` list. Any new image that
exists to illustrate the docs — not to power the theme — belongs in it.
`favicon.svg` and `logo.svg` do ship: they are the default brand mark.

## Releasing a new version

1. `bundle update` if needed, then `bundle lock --add-platform x86_64-linux`.
2. Bump the version in **both** places, or the release ships without busting
   any cache:
   - `spec.version` in `jekyll-theme-docsteer.gemspec`
   - `ds_version` in `_layouts/default.html`, the `?v=` token on the theme's
     CSS and JS. Leave it behind and upgraded sites keep serving the old
     assets from cache against the new markup.
3. Add the section to `CHANGELOG.md`, and the `[x.y.z]:` link at the bottom.
4. `bundle exec jekyll build` — clean, warnings aside.
5. Check no link bypasses the baseurl:
   ```bash
   grep -rEo '(href|src)="/(?!docsteer/)[^"]*"' _site --include=*.html
   ```
6. Commit, push, confirm the *Deploy site* run is green.
7. `git tag -a vX.Y.Z -m "…"` and `git push origin vX.Y.Z`.
8. Draft the GitHub release from that tag, pasting the changelog section. Do
   **not** use "Generate release notes" — it overwrites it with a commit list.
9. `gem build jekyll-theme-docsteer.gemspec`, then **inspect the contents
   before pushing** — a published version can never be replaced, only yanked:
   ```bash
   ruby -e 'require "rubygems/package"; puts Gem::Package.new("jekyll-theme-docsteer-X.Y.Z.gem").spec.files'
   ```
10. `gem push jekyll-theme-docsteer-X.Y.Z.gem`.
11. The `docsteer` alias gem only needs a release if its `~> 1.0` requirement
    stops covering the new version — that is, at 2.0.0.
