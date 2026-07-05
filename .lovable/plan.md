## 1. Wordmark → uploaded image (everywhere)

- Upload `qiantron-wordmark-removebg-preview.png` as a Lovable Asset →
  `src/assets/qiantron-wordmark.png.asset.json`.
- Rewrite `src/components/QianTronWordmark.tsx` to render an `<img>` of that
  asset (preserving `className` / `title` / accessible label). Keep the same
  export so all call sites (`SiteChrome`, hero, footer) update automatically.
- Delete the old SVG letter code and the `accent` prop (no longer meaningful).

## 2. Richer Product JSON-LD on machine pages

Extend the `productLd` object in `src/routes/category.$slug.$machine.tsx`:

- `brand`: `{ @type: "Brand", name: "QianTron" }` (already present) + `manufacturer`.
- `model`, `productID`, `gtin` fallbacks from `m.code`.
- `image`: array with the hero image + category image (multi-image signal).
- `additionalProperty`: full extended specs (currently only `m.specs`; include
  series, origin, warranty, shipping, configuration).
- `category`, `material`, `itemCondition: NewCondition`,
  `audience: BusinessAudience`, `areaServed: Africa`.
- `offers`: add `priceSpecification`, `hasMerchantReturnPolicy` stub,
  `shippingDetails` (RoRo / container), `businessFunction: Sell/Lease`.
- `aggregateRating` omitted (no real data — do not fabricate).

## 3. Lovable Cloud backend

Enable Lovable Cloud, then apply one migration:

```text
categories(id, slug UNIQUE, name, ref, tagline, intro, image, sort, timestamps)
machines(id, category_id FK, code UNIQUE, name, tag, image, specs JSONB, sort, timestamps)
enquiries(id, machine_code, machine_name, category_slug, name, email, phone,
          company, message, status ENUM['new','contacted','quoted','closed'],
          created_at, updated_at)
page_views(id, path, referrer, user_agent, country, created_at)
app_role ENUM ['admin']
user_roles(id, user_id FK auth.users, role app_role, UNIQUE(user_id, role))
has_role(_user_id, _role) SECURITY DEFINER
```

Grants + RLS:
- `categories`, `machines`: `GRANT SELECT TO anon, authenticated`; admin writes.
- `enquiries`: `anon` INSERT only; `authenticated` SELECT/UPDATE gated by `has_role(uid,'admin')`.
- `page_views`: `anon` INSERT (minimal columns); admin SELECT.
- `user_roles`: `authenticated` SELECT own; admin manage.

Seed categories + machines from `src/lib/site.ts`.

## 4. Data layer refactor

- `src/lib/site.ts` becomes types-only + fallback constants.
- New server fns in `src/lib/catalog.functions.ts`:
  `listCategories`, `getCategory(slug)`, `getMachine(slug, code)` — public
  reads via server publishable client.
- New `src/lib/enquiries.functions.ts`:
  `submitEnquiry` (public, Zod-validated, rate-limit friendly),
  `listEnquiries` / `updateEnquiryStatus` (admin, `requireSupabaseAuth` + `has_role`).
- New `src/lib/analytics.functions.ts`:
  `trackPageView` (public insert), `analyticsSummary` (admin).
- New `src/lib/cms.functions.ts`:
  admin CRUD for categories/machines.
- Public routes (`/`, `/category/$slug`, `/category/$slug/$machine`,
  `/services`) swap hardcoded reads for the new server fns via TanStack Query
  loaders (`ensureQueryData`).
- `__root.tsx` fires `trackPageView` on route changes (client-only).

## 5. Auth + admin dashboard

- Auth page `src/routes/auth.tsx` (email/password + Google via `lovable.auth`).
- Managed `_authenticated` layout (integration-created).
- Contact form on `/contact` calls `submitEnquiry` and shows a success state
  (no `mailto`).
- Admin subtree under `src/routes/_authenticated/admin/`:
  - `index.tsx` – overview: enquiry counts by status, 30-day pageview chart
    (Recharts, already in stack).
  - `enquiries.tsx` – table with status dropdown + detail drawer.
  - `machinery.tsx` – list categories + machines, edit/create/delete.
  - `machinery.$id.tsx` – edit form with specs JSON editor.
- Sidebar layout `_authenticated/admin/route.tsx` using shadcn `Sidebar`.
- Nav shows "Admin" link only when `has_role('admin')` resolves true.

## 6. Wiring, SEO & verification

- Update sitemap generator to read categories/machines from DB.
- Keep existing per-page JSON-LD; extend Organization block with `sameAs`
  placeholders removed (no real profiles) and `contactPoint`.
- After build, hit `/category/excavators/<code>` and dump JSON-LD to confirm
  new fields are present; note Google Rich Results Test URL for the user.

## Technical notes

- Server fns live in `src/lib/*.functions.ts` (client-safe path); admin
  imports of `client.server` stay inside handler bodies.
- All admin server fns: `.middleware([requireSupabaseAuth])` + `has_role` check.
- Contact/enquiry form uses Zod (`name<=100`, `email`, `message<=2000`).
- No fabricated reviews/ratings in JSON-LD.
- Wordmark image is decorative-with-label; keep `aria-label="QIANTRON"`.
