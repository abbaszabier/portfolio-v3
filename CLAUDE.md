@AGENTS.md

# Project Summary

Personal portfolio site for **Abbas Zabier Mohammad** (software engineer). Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS v4, shadcn (base-ui primitives). Multi-language public site (id/en/zh/ja/hi); admin CMS is Indonesian-only.

## Routing & i18n

- Public routes live under `app/[locale]/...` (`/`, `/dashboard`, `/about`, `/contact`). `app/admin/**` sits **outside** `[locale]` — no locale prefix, never localized.
- `proxy.ts` at the project root (Next 16 renamed `middleware.ts` → `proxy.ts`) redirects any unprefixed path to a locale based on `Accept-Language` (fallback `id`), skipping `/admin`.
- Supported locales: `lib/i18n/locales.ts` (`LOCALES`, `DEFAULT_LOCALE = "id"`, `LOCALE_LABELS`, `LOCALE_COUNTRY`, `getLocaleFromPathname`). Adding a locale means updating that file **and** every entry in `lib/i18n/dictionaries.ts` **and** every `translations` object in the data files.
- Static UI copy (nav, hero, headings, buttons, form labels, footer, contact error/success strings) lives in `lib/i18n/dictionaries.ts` (`getDictionary(locale)`), used both server-side (pages) and client-side (`Navbar`, `Footer`, `LanguageSwitcher` derive locale from the URL via `getLocaleFromPathname`, no context/provider).
- `app/[locale]/layout.tsx` validates the locale (`notFound()` if invalid), provides `generateStaticParams`, and sets per-locale `<title>`/`description` via `generateMetadata`.
- Server actions that need locale-aware copy (e.g. contact form errors) take `locale` as a **bound first argument** (`sendContactMessage.bind(null, locale)`), matching the existing `updateProject.bind(null, id)` pattern — bind in the Server Component, pass the bound action down as a prop.

## Public pages

- `/` — Home. Full-viewport hero (`min-h-svh`, big `font-heading` name, no photo) + "latest projects" section (max 4 cards from `data/projects.json`, localized).
- `/dashboard` — All projects in a single section (stat tiles + `ProjectCard` grid, no divider between them).
- Clicking a `ProjectCard` opens a detail modal (shadcn `Dialog`, `components/ui/dialog.tsx`) instead of navigating away: title, `platform` (extra-small uppercase label), image (or `dict.project.imageFallback` text if `image` is empty), description, "what I did" bullet list (`whatIDid`), tech-stack pills, then the external `link` as a "visit project" link. `ProjectCard` takes `dict` as a prop now (both `/` and `/dashboard` pass it through).
- `/about` — Exactly **2 sections**:
  1. About me (full-viewport, `min-h-svh`, vertically centered): photo (`public/profile.jpg`, placeholder fallback) + bio + Download CV button (`public/cv.pdf`, same fallback pattern).
  2. Skills + Experience merged into one `<section>` (no border between them). Skills: no cards/percentages — Frontend runs as an infinite marquee (`components/skill-marquee.tsx`, skill **names** are proper nouns and never translated); other categories (Backend, Tools) shown as plain text lists, with the **category label** translated via `dict.about.categories`. Experience: timeline (`components/experience-item.tsx`) from `data/experiences.json`, localized.
- `/contact` — Contact form + Google Maps embed (Jakarta, Indonesia — no API key needed, `google.com/maps?...&output=embed`). Form submits via server action `app/[locale]/contact/actions.ts` using **Resend** (`RESEND_API_KEY` env var) to `abbas.zabier06@gmail.com`, sender `onboarding@resend.dev`, `replyTo` set to the visitor's email. Error/success copy comes from the dictionary via the bound-locale pattern above.

### Navbar (`components/navbar.tsx`)

Returns `null` on any `/admin` path. Otherwise renders responsively:

- **Desktop (`md:` and up)**: floating centered pill, fixed near the top (`top-5`), links Home/Project/About/Contact + `LanguageSwitcher` + `ThemeToggle`.
- **Mobile**: app-style bottom tab bar (fixed `bottom-0`, icons + labels) for the 4 nav links; `LanguageSwitcher` + `ThemeToggle` float together top-right instead. `main` gets `pb-16 md:pb-0` (in `app/layout.tsx`) so content isn't hidden behind the tab bar.
- Locale is derived from the pathname (`getLocaleFromPathname`), not props — this is what lets Navbar/Footer live in the _root_ layout (outside `[locale]`) while still being locale-aware, and lets Navbar hide itself on `/admin` with one check.
- `LanguageSwitcher` (`components/language-switcher.tsx`) is a shadcn `Select` (`components/ui/select.tsx`, base-ui primitives): closed trigger shows **flag only**; open list shows **flag + uppercase locale code**. Changing it rewrites the first path segment and `router.push`es — no full reload.

## Admin CMS (`/admin`)

Password-protected (`lib/auth.ts`, cookie session, `ADMIN_PASSWORD` + `SESSION_SECRET` env vars) CRUD for projects/skills/experience, always in Indonesian, never shows the public `Navbar`/`LanguageSwitcher`. Writes go through `lib/github.ts`: commits JSON changes directly to the GitHub repo via the Contents API (`GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`), and in `NODE_ENV=development` also writes the file to disk so changes show up immediately via hot reload.

- Project/Experience forms (`components/admin/project-form.tsx`, `experience-form.tsx`) have a **per-locale tab switcher** (all 5 locales' fields stay mounted in the DOM, just `hidden`, so everything submits in one `FormData` as `name_id`, `name_en`, `description_zh`, `whatIDid_zh`, etc. — `whatIDid` is a `Textarea`, one bullet per line). Only the **Indonesian** fields are `required`; the corresponding server action (`app/admin/(dashboard)/projects/actions.ts`, `.../experience/actions.ts`) fills any blank non-Indonesian field with the Indonesian value before saving.
- Skill category is a fixed `<select>` (Frontend/Backend/Tools) rather than free text — the public `/about` page looks up the translated label from `dict.about.categories[category]`, so the stored value must stay one of those three exact strings.
- Each admin action calls `revalidatePath` on its own `/admin/*` list page **and every locale's** corresponding public path (e.g. loop over `LOCALES` revalidating `/${locale}/about`) — not just one hardcoded path.

## Data layer

- `data/projects.json`, `data/experiences.json` — each item has a `translations: Record<Locale, {...}>` object (name+description+**`whatIDid` string array** for projects; role/period/type+description for experience) plus untranslated fields (`techStack`, `link`, `company`, and for projects `image`, `platform`). `data/skills.json` is **not** translated (category is a fixed enum, name is a proper noun tech name).
- Project `image` is a plain path string (e.g. `/projects/foo.png`), not an uploaded file — admin uploads the file to `public/projects/` manually (filesystem/GitHub, outside this app) and types the resulting path into the admin form's "Gambar Project" field. Empty string is valid and renders the modal's image fallback.
- `lib/data.ts`: `getProjects()`/`getExperiences()` return the **raw** multi-locale shape (used by admin forms). `getLocalizedProjects(locale)`/`getLocalizedExperiences(locale)` flatten to the current locale for public pages, falling back to `id` if a translation is missing. `getSkills()` is locale-agnostic.
- Types in `lib/types.ts` (`Project`/`Experience` = raw with `translations`; `LocalizedProject`/`LocalizedExperience` = flattened, what `ProjectCard`/`ExperienceItem` actually receive). **Do not change this JSON shape** without also updating the admin forms/actions that write to it.

## Design system conventions

- Fonts: `Manrope` (body, `--font-sans`) and `Fredoka` (headings, `--font-heading`, applied via `font-heading` class) — wired in `app/layout.tsx` / `app/globals.css`. Chosen as free stand-ins for the client's originally-requested paid fonts (Acorn/GT Walsheim).
- Color: monochrome (shadcn neutral theme) + one accent color `--brand` (green, defined in `globals.css`, exposed as `text-brand`/`bg-brand`/etc). Avoid introducing more accent colors or per-component gradients — that was tried and explicitly rolled back.
- `components/hero-decor.tsx` — shared decorative layer (grid-line background + Sparkle/Plus/CircleDashed/Asterisk icons) used on the **first section only** of every top-level page (home, dashboard, about, contact). Don't add it to secondary sections.
- Secondary sections use a plain **dot-grid** background instead (see the `bg-[radial-gradient(var(--foreground)_1px,transparent_1px)]` pattern repeated inline in `page.tsx` files) — subtle, `opacity-15`. Not extracted to a component yet; if touching it in more places, consider extracting.
- First-section heroes on `/` and `/about` are full-viewport (`min-h-svh`, vertically centered) — a deliberate "one screen" landing before the user scrolls. Don't reintroduce section borders/dividers on `/dashboard` or between the merged Skill/Experience blocks on `/about` — both were explicitly flattened to remove `border-t` dividers.
- `components/reveal.tsx` — `Reveal` client component, IntersectionObserver fade/slide-up on scroll, supports `delay` for stagger. Wrap section headers and list items with it for consistency.
- `components/project-card.tsx` — the big project-card design (used on both `/` and `/dashboard`), takes a `LocalizedProject`. Reuse this rather than re-implementing card markup.
- No card/percentage UI for skills (explicit user preference) — keep the marquee + plain-text-list pattern if skills UI changes.
- Adding a new shadcn component: `npx shadcn@latest add <name>` (registry/style already configured in `components.json`, `style: "base-nova"`) — this is how `components/ui/select.tsx` was added; prefer it over hand-rolling a primitive.

## Env vars (see `.env.example`)

`ADMIN_PASSWORD`, `SESSION_SECRET`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, `RESEND_API_KEY`.

## Known follow-ups (not yet done)

- `public/profile.jpg` exists; `public/cv.pdf` does not yet — the about page falls back to a placeholder notice until it's added.
- `RESEND_API_KEY` not set yet — contact form returns a clear (localized) error until it is.
- Social links in `app/[locale]/page.tsx` (`SOCIALS`) still point to placeholder `github.com/`, `linkedin.com/`, `mailto:hello@example.com` — update with real profile URLs.
- Company names and tech stack entries in the seed `data/experiences.json`/`data/projects.json` are illustrative placeholders (e.g. "Startup Teknologi Lokal", "Berbagai Klien") — replace via the admin CMS with real history.
