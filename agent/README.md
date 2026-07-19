# Agent Documentation

This folder helps AI agents and new contributors understand the **Ergolyt** codebase quickly.

## Start here

| File | Purpose |
|------|---------|
| [architecture.md](./architecture.md) | Stack, deployment, and high-level system design |
| [folder-structure.md](./folder-structure.md) | Where code lives and naming conventions |
| [auth.md](./auth.md) | Supabase Auth flows, env vars, and route protection |
| [conventions.md](./conventions.md) | Coding standards and patterns used in this repo |
| [theming.md](./theming.md) | CSS variables, dark mode, customizing tokens |

## Project summary

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** Supabase Auth (`@supabase/ssr`)
- **Hosting:** Railway (app) + Supabase (auth + database)
- **Package manager:** pnpm

## Before making changes

1. Read `AGENTS.md` at the repo root for Next.js 16-specific rules.
2. Read `auth.md` before touching authentication or `proxy.ts`.
3. Use route groups under `app/` — do not flatten protected and public routes together.
4. Never commit `.env` files; use `.env.example` as the template.

## Key entry points

- **Landing page:** `app/(marketing)/page.tsx`
- **Auth UI:** `app/(auth)/login`, `app/(auth)/signup`
- **Protected area:** `app/(protected)/dashboard`
- **Session refresh:** `proxy.ts` → `lib/supabase/proxy.ts`
- **Server actions:** `actions/auth.ts`
