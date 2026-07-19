# Authentication

Ergolyt uses **Supabase Auth** with the **`@supabase/ssr`** package for cookie-based sessions in Next.js 16.

## Environment variables

Copy `.env.example` to `.env.local` for local development:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Set the same variables in **Railway** for production. Update `NEXT_PUBLIC_SITE_URL` to your Railway domain.

## Supabase Dashboard setup

### Google OAuth (step by step)

Google redirects to **Supabase first**, not your app directly.

**1. Google Cloud Console** → APIs & Services → Credentials → OAuth 2.0 Client

| Field | Value |
|-------|-------|
| Authorized JavaScript origins | `http://localhost:3000` (and your Railway URL in prod) |
| Authorized redirect URIs | `https://<project-ref>.supabase.co/auth/v1/callback` |

**2. Supabase Dashboard** → Authentication → Providers → Google

Paste the Google **Client ID** and **Client Secret**. Enable the provider.

**3. Supabase Dashboard** → Authentication → URL Configuration

| Setting | Value |
|---------|-------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | `http://localhost:3000/auth/callback` |

For production, also add your Railway URL:
`https://your-app.up.railway.app/auth/callback`

**4. `.env.local`** must use real values (not placeholders):

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Restart `pnpm dev` after changing env vars.

### URL configuration

**Authentication → URL Configuration**

| Setting | Local | Production |
|---------|-------|------------|
| Site URL | `http://localhost:3000` | `https://your-app.up.railway.app` |
| Redirect URLs | `http://localhost:3000/auth/callback` | `https://your-app.up.railway.app/auth/callback` |

### Providers

**Authentication → Providers**

1. Enable **Email** (enabled by default).
2. Enable **Google** (and other providers if needed).
3. For each OAuth provider, create credentials in the provider's developer console.
4. Set callback URL to: `https://<project-ref>.supabase.co/auth/v1/callback`

## Auth flows

### Email + password

- Sign up: `actions/auth.ts` → `signUpWithPassword` → `/signup`
- Sign in: `actions/auth.ts` → `signInWithPassword` → `/login`
- Forgot password: `actions/auth.ts` → `requestPasswordReset` → `/forgot-password`
- Reset password: email link → `/auth/callback` → `/reset-password` → `updatePassword`
- Sign out: `actions/auth.ts` → `signOut` → header button

### Social (Google)

- Client: `components/auth/oauth-buttons.tsx` → `signInWithOAuth`
- Callback: `app/auth/callback/route.ts` → `exchangeCodeForSession`
- Redirect after login: `/dashboard`

## Session management

Next.js 16 uses **`proxy.ts`** (not `middleware.ts`) to refresh sessions on every request.

```
Request → proxy.ts → lib/supabase/proxy.ts → updateSession()
                                              ├── refresh cookies
                                              └── enforce lib/auth/routes.ts
```

### Critical rules

1. Use **`getAll` / `setAll`** for cookies — never `get` / `set` / `remove`.
2. Import from **`@supabase/ssr`** — never `@supabase/auth-helpers-nextjs`.
3. Call **`supabase.auth.getUser()`** in proxy and server code for validation.
4. Do not put logic between `createServerClient` and `getUser()` in the proxy.

## Route protection

Route rules live in **`lib/auth/routes.ts`** — one place to edit.

**Public (no login required):**

- Exact paths: `/`, `/login`, `/signup`, `/forgot-password`, `/reset-password`
- Prefixes: `/auth/*` (OAuth callback)

**Protected (login required):**

- **Everything else** — including any new page under `app/(protected)/`

### Adding a new protected page

1. Create `app/(protected)/settings/page.tsx` → `/settings` is protected automatically
2. No changes to `proxy.ts` needed

### Adding a new public page

1. Create the page under `app/(marketing)/`
2. Add its path to `PUBLIC_ROUTES` in `lib/auth/routes.ts`

Example — make `/pricing` public:

```typescript
export const PUBLIC_ROUTES = ["/", "/login", "/signup", "/pricing"] as const;
```

## Client vs server Supabase

| Context | Import |
|---------|--------|
| Server Components, Server Actions, route handlers | `@/lib/supabase/server` |
| Client Components | `@/lib/supabase/client` |

Never use the browser client in Server Components.

## Common errors

| Symptom | Fix |
|---------|-----|
| Random logouts | Check proxy cookie handling uses `setAll` |
| OAuth redirect mismatch | Align Supabase + provider callback URLs |
| `Invalid login credentials` | Confirm user exists and email is confirmed |
| Env vars undefined in prod | Set vars in Railway, redeploy |
