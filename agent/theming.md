# Theming

Ergolyt uses **shadcn/ui CSS variables** for theming. Components use semantic tokens like `bg-background`, `text-foreground`, and `bg-primary` — not hard-coded colors.

## Where theme lives

| File | Purpose |
|------|---------|
| `app/globals.css` | `:root` and `.dark` token values, `@theme inline` Tailwind mapping |
| `components.json` | `cssVariables: true`, `baseColor: neutral`, preset **b0** |
| `components/theme-provider.tsx` | `next-themes` provider |
| `components/layout/mode-toggle.tsx` | Light / dark / system switcher |

## How dark mode works

1. `ThemeProvider` in `app/layout.tsx` sets `attribute="class"`.
2. Choosing **Dark** adds `.dark` to `<html>`.
3. Tokens under `.dark` in `globals.css` override `:root` values.
4. All shadcn components update automatically.

## Customizing colors

Edit tokens in `app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --radius: 0.625rem;
}
```

Or re-apply a preset:

```bash
pnpm dlx shadcn@latest apply --preset b0 -y
```

## Adding a new token

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Then use `bg-warning text-warning-foreground` in components.

## Rules

- Prefer semantic tokens (`bg-muted`, `text-muted-foreground`) over `zinc-*` utilities.
- Do not set `tailwind.cssVariables` to `false` without re-installing components.
- Official reference: [shadcn theming docs](https://ui.shadcn.com/docs/theming)
