# Folder Structure

```
ergolyt/
├── agent/                      # Documentation for AI agents and contributors
├── actions/                    # Server Actions (mutations, form handlers)
│   └── auth.ts
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth pages — shared centered layout
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (marketing)/            # Public marketing pages
│   │   ├── layout.tsx
│   │   └── page.tsx            # Home page (/)
│   ├── (protected)/            # Authenticated pages
│   │   ├── layout.tsx
│   │   └── dashboard/page.tsx
│   ├── auth/
│   │   └── callback/route.ts   # OAuth + email confirmation callback
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   └── globals.css
├── components/
│   ├── auth/                   # Auth-specific UI
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   └── oauth-buttons.tsx
│   └── layout/                 # Shared layout components
│       └── site-header.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client
│   │   └── proxy.ts            # Session refresh + route protection
│   └── utils.ts
├── public/                     # Static assets
├── types/                      # Shared TypeScript types
│   └── index.ts
├── proxy.ts                    # Next.js 16 proxy entry (calls lib/supabase/proxy)
├── .env.example                # Environment variable template
├── AGENTS.md                   # Root agent rules (Next.js 16 + links here)
└── package.json
```

## Conventions

### `app/`

- Use **route groups** `(name)` for layout organization — parentheses do not appear in URLs.
- Keep **route handlers** under `app/**/route.ts`.
- One `page.tsx` per route segment.

### `components/`

- **`components/auth/`** — forms and OAuth buttons.
- **`components/layout/`** — headers, footers, shells.
- Add **`components/ui/`** when introducing a design system (e.g. shadcn).

### `actions/`

- Files start with `"use server"`.
- One domain per file (`auth.ts`, `profile.ts`, etc.).
- Prefer Server Actions over API routes for form mutations.

### `lib/`

- Third-party client setup and pure utilities only.
- No React components in `lib/`.

### `types/`

- Shared interfaces and type aliases.
- Generate `types/database.ts` from Supabase CLI when adding DB tables.

## Adding new features

| Feature type | Where to add |
|--------------|--------------|
| New protected page | `app/(protected)/your-page/page.tsx` (auto-protected) |
| New public page | `app/(marketing)/your-page/page.tsx` + add path to `lib/auth/routes.ts` |
| New API endpoint | `app/api/your-route/route.ts` |
| New form mutation | `actions/your-domain.ts` |
| New shared UI | `components/your-domain/` |

Protected routes are configured in `lib/auth/routes.ts`. API routes under `app/api/` are protected by default unless added to `PUBLIC_ROUTES` or `PUBLIC_PREFIXES`.
