# Ergolyt

Next.js 16 app with Supabase Auth, deployed on Railway.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** Supabase Auth (`@supabase/ssr`)
- **Email:** Resend (via Supabase SMTP)
- **Hosting:** Railway + Supabase
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
cp .env.example .env.local
# Fill in Supabase + site URL vars in .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docs for agents

See [`AGENTS.md`](./AGENTS.md) and the [`agent/`](./agent/) folder for architecture, auth, and conventions.

## Scripts

```bash
pnpm dev      # local development
pnpm build    # production build
pnpm lint     # eslint
```
