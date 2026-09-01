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

### Keep demo assets out of the gem

`spec.files` in the gemspec subtracts a `demo_only` list. Any new image that
exists to illustrate the docs — not to power the theme — belongs in it.
`favicon.svg` and `logo.svg` do ship: they are the default brand mark.

## Releasing a new version

1. `bundle update` if needed, then `bundle lock --add-platform x86_64-linux`.
2. Bump `spec.version` in `jekyll-theme-docsteer.gemspec`.
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
