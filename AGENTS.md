<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

- Next.js 16 uses **`proxy.ts`** at the project root (not `middleware.ts`) for request interception.
- Page **`searchParams`** and **`params`** are Promises — always `await` them.
- The **`cookies()`** API from `next/headers` is async — always `await cookies()`.
<!-- END:nextjs-agent-rules -->

# Ergolyt — Agent Guide

## Project

Next.js 16 app with **Supabase Auth**, deployed on **Railway**. Package manager: **pnpm**.

## Documentation

Read the **`agent/`** folder before making changes:

| Doc | When to read |
|-----|--------------|
| [agent/README.md](./agent/README.md) | First visit — project overview |
| [agent/architecture.md](./agent/architecture.md) | System design, deployment, security |
| [agent/folder-structure.md](./agent/folder-structure.md) | Where to add files |
| [agent/auth.md](./agent/auth.md) | Auth, proxy, Supabase setup |
| [agent/conventions.md](./agent/conventions.md) | TypeScript, naming, patterns |
| [agent/theming.md](./agent/theming.md) | CSS variables, dark mode, tokens |

## Quick reference

```
app/(marketing)/     → public pages (/)
app/(auth)/          → login, signup
app/(protected)/     → authenticated pages (/dashboard)
lib/supabase/        → Supabase clients + session proxy logic
lib/auth/routes.ts   → public vs protected route rules (edit here)
actions/             → Server Actions
components/          → React UI
proxy.ts             → Next.js 16 auth session refresh
```

## Auth rules (do not break)

- Use `@supabase/ssr` with **`getAll` / `setAll`** cookie handlers only.
- Never use `@supabase/auth-helpers-nextjs` or individual cookie `get`/`set`/`remove`.
- Use `supabase.auth.getUser()` on the server for session validation.
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`.

## Commands

```bash
pnpm dev      # local development
pnpm build    # production build
pnpm lint     # eslint
```
