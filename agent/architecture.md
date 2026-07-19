# Architecture

## Overview

Ergolyt is a Next.js 16 application using Supabase for authentication and PostgreSQL. The frontend is deployed on Railway; Supabase runs as a managed backend service.

```
Browser
   │
   ▼
Railway (Next.js app)
   │
   ├── proxy.ts ──────────────► refreshes Supabase session cookies
   │
   ├── Server Components ─────► lib/supabase/server.ts
   │
   ├── Client Components ─────► lib/supabase/client.ts
   │
   └── Server Actions ────────► actions/auth.ts
           │
           ▼
      Supabase Auth API
           │
           ▼
      Supabase Postgres (users, sessions)
```

## Runtime layers

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Routes | `app/` | Pages, layouts, API route handlers |
| UI | `components/` | Reusable React components |
| Server logic | `actions/` | Server Actions (mutations) |
| Integrations | `lib/` | Supabase clients, shared utilities |
| Types | `types/` | Shared TypeScript types |
| Proxy | `proxy.ts` | Next.js 16 request interception for auth |

## Route groups

Route groups `(marketing)`, `(auth)`, and `(protected)` organize layouts without changing URLs:

| URL | Group | Access |
|-----|-------|--------|
| `/` | `(marketing)` | Public |
| `/login`, `/signup` | `(auth)` | Public |
| `/dashboard` | `(protected)` | Authenticated only |
| `/auth/callback` | `auth/` | OAuth/email callback |

## Deployment

### Railway (Next.js)

Set these environment variables on the Railway service:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (production URL, e.g. `https://your-app.up.railway.app`)

### Supabase Dashboard

1. **Authentication → URL Configuration:** add site URL and redirect URLs.
2. **Authentication → Providers:** enable Google with OAuth credentials.
3. **Project Settings → API:** copy URL and anon key.

## Security notes

- Use `supabase.auth.getUser()` on the server — not `getSession()` alone.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.
- Protected routes are enforced in `lib/supabase/proxy.ts` for `/dashboard`.
- Row Level Security (RLS) should be enabled on Supabase tables when adding app data.
