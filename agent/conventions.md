# Conventions

## TypeScript

- Strict mode is enabled — avoid `any`.
- Prefer `type` for props and shared shapes in `types/`.
- Use `Readonly<{ children: React.ReactNode }>` for layout props.

## React / Next.js

- **Server Components by default** — add `"use client"` only when needed (hooks, browser APIs, event handlers).
- **Server Actions** for form submissions and mutations.
- **`searchParams` and `params`** are async in Next.js 16 — always `await` them in pages.

```typescript
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
}
```

## Styling

- Tailwind CSS v4 with `@import "tailwindcss"` in `globals.css`.
- Use zinc palette for neutrals; keep dark mode compatible classes.
- Layout spacing: `max-w-5xl mx-auto px-6` for page content.

## Imports

- Use `@/` path alias for all internal imports.
- Order: external packages → `@/` imports → relative imports.

## File naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `login-form.tsx` |
| Pages | `page.tsx` in route folder | `app/(auth)/login/page.tsx` |
| Layouts | `layout.tsx` | `app/(marketing)/layout.tsx` |
| Server Actions | domain name | `actions/auth.ts` |
| Utilities | kebab-case | `lib/utils.ts` |

## Git

- Never commit `.env`, `.env.local`, or secrets.
- Commit `.env.example` with placeholder values only.
- Keep `agent/` docs updated when architecture changes.

## Agent workflow

When implementing features:

1. Check `agent/folder-structure.md` for where files belong.
2. Check `agent/auth.md` before auth changes.
3. Read Next.js 16 docs in `node_modules/next/dist/docs/` if unsure about APIs.
4. Run `pnpm lint` and `pnpm build` before finishing.
