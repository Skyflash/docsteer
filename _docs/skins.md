---
title: Colour skins
category: Customisation
description: The six built-in palettes, and how to tweak or add your own.
updated: 2026-09-01
tags: [skins, colours, theming, css-variables]
---

DocSteer ships **six skins**, each defined as a light + dark palette.
Choose one in `_config.yml`:

```yaml
docsteer:
  skin: violet
```

| Skin | Character | Accent | Best for |
| --- | --- | --- | --- |
| `aqua` | Azure blue, calm and neutral | cyan | The safe default — product & API docs |
| `violet` | Confident violet | fuchsia | Design systems, SDK docs |
| `mint` | Fresh teal | spring green | Developer & platform docs |
| `ember` | Warm rose | amber | Help centres, support portals |
| `graphite` | Monochrome ink, no hue | steel | Minimal internal wikis |
| `clay` | Warm paper + terracotta | ochre | Editorial, long-form reading |

Try them live: use the **palette button** in the navbar (it is powered by
`skin_switcher: true` and remembers your choice in `localStorage`).

<div class="callout callout--note">
  <span class="callout__icon"><i class="fa-solid fa-circle-info"></i></span>
  <div>
    <p class="callout__title">Contrast is part of the palette</p>
    <p>Every skin's <code>brand</code> colour clears <strong>4.5:1</strong>
    against its own background, so body-copy links stay WCAG AA legible in both
    light and dark. If you retune one, keep that bar.</p>
  </div>
</div>

## How skins work

Every skin is a Sass map in `_sass/docsteer/_skins.scss`. Each entry becomes a
**CSS custom property** on `:root[data-skin="…"]`, so the rest of the codebase
never references a raw colour:

```scss
aqua: (
  ring: (218, 92%),
  light: ( bg:#ffffff, text:#101828, brand:#1668f0, accent:#00b4d8, … ),
  dark:  ( bg:#0b0f16, text:#e8eef7, brand:#5fa3ff, accent:#3ad2ea, … ),
),
```

Dark values are applied automatically when the OS is in dark mode **or** when
`data-mode="dark"` is set by the toggle.

## Tweak an existing skin

Edit the map values and rebuild. For example, a warmer `aqua` brand colour:

```scss
light: ( …, brand:#1f7ae0, brand-strong:#1a6ccc, … ),
```

## Add a seventh skin

1. Add a new map entry (copy an existing one) in `_skins.scss`.
2. Add its name to the loop list in `_includes/navbar.html`.
3. Add a `.skin-dot--yourname` gradient in `_sass/docsteer/_navbar.scss`.

That's it — no other file needs to change.

## Semantic tokens you can use in your own CSS

`--bg`, `--bg-elev`, `--bg-sunken`, `--surface-2`, `--text`, `--text-soft`,
`--text-faint`, `--border`, `--border-strong`, `--brand`, `--brand-strong`,
`--brand-contrast`, `--brand-soft`, `--link`, `--accent`, plus status colours
`--success`, `--warning`, `--danger`, `--info`.
