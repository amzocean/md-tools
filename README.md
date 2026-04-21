# MD Tools — ViewMDFile.com & MDFileToPDF.com

A single Next.js application serving two domains from one codebase:

- **[ViewMDFile.com](https://viewmdfile.com)** — Instantly preview Markdown files online
- **[MDFileToPDF.com](https://mdfiletopdf.com)** — Convert Markdown files to PDF

> **Repository:** [github.com/amzocean/md-tools](https://github.com/amzocean/md-tools)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [Domain Detection Flow](#domain-detection-flow)
  - [Config-Driven Branding](#config-driven-branding)
  - [Server vs Client Components](#server-vs-client-components)
  - [PDF Export Pipeline](#pdf-export-pipeline)
- [SEO & AI Discoverability](#seo--ai-discoverability)
  - [Metadata Strategy](#metadata-strategy)
  - [Structured Data (JSON-LD)](#structured-data-json-ld)
  - [Dynamic SEO Routes](#dynamic-seo-routes)
  - [AI Crawlers (llms.txt)](#ai-crawlers-llmstxt)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Project Structure](#project-structure)
- [File Reference](#file-reference)
- [Type System](#type-system)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development](#local-development)
  - [Build & Verify](#build--verify)
- [Deployment on Vercel](#deployment-on-vercel)
  - [1. Import Repository](#1-import-repository)
  - [2. Configure Domains](#2-configure-domains)
  - [3. DNS Configuration](#3-dns-configuration)
  - [4. Verify Deployment](#4-verify-deployment)
- [Adding a New Domain / Site Variant](#adding-a-new-domain--site-variant)
- [Key Implementation Details](#key-implementation-details)
  - [Middleware Edge Runtime Constraints](#middleware-edge-runtime-constraints)
  - [Headers API Behavior (Next.js 14)](#headers-api-behavior-nextjs-14)
  - [Tailwind Typography Plugin Overrides](#tailwind-typography-plugin-overrides)
- [License](#license)

---

## Overview

MD Tools is a **zero-backend**, **privacy-first** web application for working with Markdown files. All processing happens entirely in the user's browser — no data is ever sent to a server.

**Two products, one codebase:** A single Next.js deployment serves both sites. Middleware inspects the `Host` header to determine which domain the request is for, then injects a `x-site-id` header that propagates through the entire component tree. Every component reads from a central config object, making all branding, copy, SEO metadata, feature flags, and theming fully config-driven.

| Feature | ViewMDFile.com | MDFileToPDF.com |
|---------|---------------|-----------------|
| Paste Markdown | ✅ | ✅ |
| Upload .md file | ✅ | ✅ |
| Drag & drop | ✅ | ✅ |
| Live preview | ✅ | ✅ |
| PDF export | ✅ | ✅ |
| Auto-hide hero | ✅ | ✅ |
| Theme color | Blue/Indigo | Emerald/Teal |
| Support pages | 2 articles | 3 articles |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **Next.js 14.2.21** (App Router) | SSR, routing, middleware, metadata API |
| Language | **TypeScript 5.5+** | Type safety across all files |
| Styling | **Tailwind CSS 3.4+** | Utility-first styling, responsive design |
| Typography | **@tailwindcss/typography 0.5** | Prose styling for rendered Markdown |
| Markdown | **react-markdown 9** + **remark-gfm 4** | Client-side Markdown → HTML rendering |
| PDF | **html2pdf.js 0.10** | Client-side HTML → PDF via html2canvas + jsPDF |
| Linting | **ESLint** with `eslint-config-next` | Code quality |

### Why these choices?

- **Next.js App Router** — native middleware for domain detection, `generateMetadata()` for SEO, server components for crawler-indexable content
- **react-markdown** — safe (no `dangerouslySetInnerHTML`), supports GFM via remark plugins
- **html2pdf.js** — pure client-side PDF generation, no server API needed, bundles html2canvas + jsPDF
- **No database** — the entire app is stateless; files are processed in-browser and discarded

---

## Architecture

### Domain Detection Flow

```
Browser Request
    │
    ▼
┌─────────────────────────────────┐
│  Middleware (Edge Runtime)       │
│  src/middleware.ts               │
│                                 │
│  1. Read Host header            │
│  2. Match hostname to siteId:   │
│     *mdfiletopdf* → "converter" │
│     *viewmdfile*  → "viewer"    │
│     localhost      → "viewer"   │
│  3. Check ?site= query param    │
│     (dev override)              │
│  4. Set x-site-id header        │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  Server Components              │
│  (layout.tsx, page.tsx, etc.)   │
│                                 │
│  Read x-site-id via headers()   │
│  Call getSiteConfig(siteId)     │
│  Generate metadata + JSON-LD    │
│  Render server-side HTML        │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  SiteProvider (React Context)   │
│  src/components/SiteProvider.tsx │
│                                 │
│  Root layout passes config to   │
│  SiteProvider; all client       │
│  components access via          │
│  useSiteConfig() hook           │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  Client Components              │
│  Header, MarkdownTool, FAQ, etc │
│                                 │
│  Call useSiteConfig() to get    │
│  branding, theme, features      │
│  Conditionally render features  │
│  (e.g., PDF button)             │
└─────────────────────────────────┘
```

### Config-Driven Branding

All site-specific content lives in **`src/config/sites.ts`** — a single `Record<SiteId, SiteConfig>` object. Each site config includes:

| Config field | What it controls |
|-------------|-----------------|
| `id` | Site identifier (`"viewer"` or `"converter"`) |
| `domain` | Production domain name (used in canonical URLs, sitemaps, JSON-LD) |
| `name` | Brand name shown in header, footer, structured data |
| `tagline` | Short tagline for footer |
| `features.pdfExport` | Whether to show "Download PDF" button and PDF-related content (enabled on both sites) |
| `seo.title` | Default `<title>` tag |
| `seo.description` | Default meta description |
| `seo.keywords` | Meta keywords array |
| `hero.headline` | H1 text on homepage |
| `hero.subheadline` | Subhead paragraph on homepage |
| `hero.cta` | CTA button text |
| `faq[]` | Array of FAQ items (rendered as FAQ section + FAQ JSON-LD) |
| `theme.primary` | Tailwind bg class for primary buttons |
| `theme.primaryHover` | Tailwind hover class for primary buttons |
| `theme.accent` | Tailwind text class for accent color |
| `theme.gradient` | Tailwind gradient classes for hero section |

### Server vs Client Components

The codebase deliberately splits components between server and client:

| Component | Type | Why |
|-----------|------|-----|
| `Hero` | **Server** | H1 and subheadline must be indexable by crawlers |
| `HeroCTA` | **Client** | Scroll-to-tool click handler needs `onClick` |
| `HomeContent` | **Client** | Wraps Hero + MarkdownTool; manages hero auto-hide state |
| `SEOContent` | **Server** | Rich prose content for SEO — crawlers see everything |
| `ArticleLayout` | **Server** | Support page wrapper — static content |
| `Header` | **Client** | Hamburger menu toggle needs `useState` |
| `Footer` | **Client** | Reads config via `useSiteConfig()` hook |
| `MarkdownTool` | **Client** | Editor state, file handling, drag-drop — all interactive |
| `MarkdownPreview` | **Client** | react-markdown rendering is client-side |
| `PdfExportButton` | **Client** | Dynamic import of html2pdf.js + export state |
| `FAQ` | **Client** | Reads config via `useSiteConfig()` hook |

### PDF Export Pipeline

PDF generation is **entirely client-side** with zero server involvement:

```
User clicks "Download PDF"
    │
    ▼
PdfExportButton dynamically imports html2pdf.js
    │
    ▼
html2pdf.js captures #markdown-preview DOM element
    │
    ▼
html2canvas renders the element to a canvas at 2x scale
    │
    ▼
jsPDF converts canvas to A4 PDF with custom margins
    │
    ▼
Browser triggers file download: markdown-document.pdf
```

Configuration used:
```typescript
{
  margin: [12, 10, 15, 10],     // mm margins (top, right, bottom, left)
  filename: "markdown-document.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  pagebreak: { mode: ["css", "legacy"] }
}
```

The element is cloned with 20px bottom padding before capture to prevent last-line clipping at page boundaries.

---

## SEO & AI Discoverability

### Metadata Strategy

Every page generates domain-specific metadata via Next.js `generateMetadata()`:

| Metadata | Homepage | Support Pages |
|----------|----------|---------------|
| `<title>` | Config-driven (e.g., "View MD File Online — Free Markdown Viewer") | Article-specific title |
| Meta description | Config-driven, keyword-rich | Article-specific description |
| Keywords | Array from config (9 keywords per site) | Inherited from layout |
| Open Graph | title, description, url, siteName, type="website" | type="article" |
| Twitter Card | summary_large_image | summary |
| Canonical URL | `https://{domain}/` | `https://{domain}/{slug}` |
| Robots | index: true, follow: true | Inherited |

### Structured Data (JSON-LD)

The app injects multiple JSON-LD schemas:

| Schema | Where | Purpose |
|--------|-------|---------|
| **WebApplication** | `layout.tsx` (every page) | Tells Google this is a free web app |
| **FAQPage** | `page.tsx` (homepage) | FAQ rich snippet eligibility |
| **BreadcrumbList** | `page.tsx` (homepage) | Breadcrumb display in SERPs |
| **HowTo** | `page.tsx` (homepage) | Step-by-step rich snippet (differs by site) |
| **Article** | Support pages | Article rich snippet for support content |

The HowTo schema is domain-aware:
- **Converter** → 3 steps (add content → preview → download PDF), totalTime: PT1M
- **Viewer** → 2 steps (add content → view preview), totalTime: PT30S

### Dynamic SEO Routes

| Route | File | Output |
|-------|------|--------|
| `/robots.txt` | `src/app/robots.ts` | Dynamic robots.txt with domain-specific sitemap URL |
| `/sitemap.xml` | `src/app/sitemap.ts` | Dynamic sitemap — includes `/markdown-to-pdf-guide` only for converter |
| `/llms.txt` | `src/app/llms.txt/route.ts` | AI discoverability (plain text) |

### AI Crawlers (llms.txt)

The `/llms.txt` endpoint serves a structured plain-text document designed for LLM crawlers (ChatGPT, Perplexity, Google AI Overviews). It includes:
- Tool description and purpose
- Key facts (free, private, no signup)
- List of all pages with URLs
- Step-by-step usage instructions
- Content differs per domain (viewer vs converter)

Cached for 24 hours via `Cache-Control: public, max-age=86400`.

### SEO Content Architecture

Content that needs to be indexed by search engines is rendered as **server components**:

- `Hero.tsx` — server component so H1, subheadline are in initial HTML (auto-hides when content is loaded via `HomeContent` wrapper)
- `SEOContent.tsx` — rich prose section with internal links, how-to steps, feature grid
- Support pages — server-rendered articles with cross-links

Client-only content (editor, preview, FAQ accordion) is **not critical for SEO** — search engines see the surrounding server-rendered context.

Internal linking strategy:
- Homepage SEOContent → links to support pages
- Support pages → link back to homepage tool
- Footer → links to all support pages
- Header nav → links to all support pages

---

## Mobile Responsiveness

| Feature | Implementation |
|---------|---------------|
| **Viewport** | Explicit `viewport` export: `width: device-width, initialScale: 1, maximumScale: 5` |
| **Mobile nav** | Hamburger menu (☰ / ✕) with slide-down panel, `sm:hidden` toggle |
| **Desktop nav** | Horizontal link bar, `hidden sm:flex` |
| **Editor/Preview** | Side-by-side on desktop (`sm:grid-cols-2`), tabbed on mobile (`grid-cols-1` with Edit/Preview tabs) |
| **Textarea height** | `h-[300px]` mobile, `h-[500px]` desktop via `sm:h-[500px]` |
| **Touch targets** | Buttons use `py-2.5 sm:py-1.5` — 44px+ on mobile per accessibility guidelines |
| **Hero text** | Responsive sizing: `text-3xl sm:text-4xl lg:text-5xl` |
| **Footer** | Single column on mobile (`grid-cols-1`), 3-column on desktop (`md:grid-cols-3`) |
| **Toolbar** | `flex-wrap` — buttons wrap naturally on narrow screens |
| **Feature grid** | `grid-cols-2 sm:grid-cols-3` in SEOContent |

---

## Project Structure

```
md-tools/
├── .gitignore
├── README.md                        # This file
├── package.json                     # Dependencies and scripts
├── package-lock.json
├── tsconfig.json                    # TypeScript configuration
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
│
└── src/
    ├── middleware.ts                 # ⭐ Domain detection middleware
    │
    ├── app/
    │   ├── globals.css              # Global styles + prose overrides
    │   ├── layout.tsx               # Root layout: viewport, metadata, JSON-LD, SiteProvider
    │   ├── page.tsx                 # Homepage: Hero, MarkdownTool, SEOContent, FAQ
    │   ├── robots.ts                # Dynamic robots.txt generation
    │   ├── sitemap.ts               # Dynamic sitemap.xml generation
    │   │
    │   ├── llms.txt/
    │   │   └── route.ts             # AI discoverability plain-text endpoint
    │   │
    │   ├── what-is-an-md-file/
    │   │   └── page.tsx             # Support article: What is a Markdown file?
    │   │
    │   ├── how-to-open-md-files/
    │   │   └── page.tsx             # Support article: How to open .md files
    │   │
    │   └── markdown-to-pdf-guide/
    │       └── page.tsx             # Support article: Markdown to PDF guide
    │
    ├── components/
    │   ├── SiteProvider.tsx          # React Context: provides SiteConfig to client tree
    │   ├── Header.tsx               # Sticky header with desktop nav + mobile hamburger
    │   ├── Footer.tsx               # 3-column footer with nav links
    │   ├── HomeContent.tsx          # ⭐ Client wrapper: Hero + MarkdownTool with auto-hide
    │   ├── Hero.tsx                 # Server component: gradient hero with H1
    │   ├── HeroCTA.tsx              # Client component: scroll-to-tool CTA button
    │   ├── MarkdownTool.tsx         # ⭐ Main tool: editor, file upload, drag-drop, tabs
    │   ├── MarkdownPreview.tsx      # Markdown renderer (react-markdown + remark-gfm)
    │   ├── PdfExportButton.tsx      # PDF download button (both sites)
    │   ├── SEOContent.tsx           # Server component: rich prose for search engines
    │   ├── FAQ.tsx                  # FAQ accordion section
    │   └── ArticleLayout.tsx        # Wrapper layout for support pages
    │
    ├── config/
    │   ├── sites.ts                 # ⭐ Central config: branding, SEO, features, themes
    │   └── sample.ts                # Sample Markdown content for "Load Sample" button
    │
    ├── lib/
    │   └── getSiteId.ts             # Hostname → SiteId helper (used in server components)
    │
    └── types/
        ├── index.ts                 # TypeScript type definitions (SiteConfig, SiteId, etc.)
        └── html2pdf.d.ts            # Type declarations for html2pdf.js module
```

---

## File Reference

### Core Runtime Files

| File | Lines | Role |
|------|-------|------|
| `src/middleware.ts` | 31 | Edge Runtime middleware — reads `Host` header, resolves siteId, sets `x-site-id` header. Supports `?site=` query param for dev. Matcher excludes `_next`, `api`, `favicon.ico`. |
| `src/config/sites.ts` | 155 | Single source of truth for both sites. Exports `getSiteConfig(siteId)` and the full `sites` record. Contains all SEO metadata, hero content, FAQ items, theme classes, feature flags. |
| `src/components/SiteProvider.tsx` | 23 | React Context wrapping the app. `SiteProvider` accepts a `config` prop (set in layout.tsx). `useSiteConfig()` hook for client components. Throws if used outside provider. |
| `src/app/layout.tsx` | 86 | Root layout. Sets viewport, generates metadata, injects WebApplication JSON-LD, wraps children in SiteProvider. |
| `src/app/page.tsx` | 118 | Homepage. Composes Header → HomeContent (Hero + MarkdownTool) → SEOContent → FAQ → Footer. Injects FAQPage, BreadcrumbList, and HowTo JSON-LD schemas. |

### Component Files

| File | Type | Role |
|------|------|------|
| `src/components/HomeContent.tsx` | Client | Wraps Hero and MarkdownTool together. Manages `heroVisible` state — hero auto-hides when user loads content (file upload, drag-drop, or Load Sample). Hero reappears on Clear. |
| `src/components/MarkdownTool.tsx` | Client | Main interactive tool. Manages markdown state, file validation (5MB limit, .md/.markdown/.txt), drag-drop with visual feedback, Edit/Preview mobile tabs, toolbar with Upload/Sample/Clear buttons, PDF export button. Accepts `onContentLoaded` callback for hero auto-hide. |
| `src/components/MarkdownPreview.tsx` | Client | Wraps `react-markdown` with `remark-gfm` plugin. Applies Tailwind Typography prose classes with dark-theme code block overrides. Renders into `#markdown-preview` div for PDF capture. |
| `src/components/PdfExportButton.tsx` | Client | Dynamic-imports html2pdf.js on click. Shows spinner during export. Error handling with alert fallback. Captures `#markdown-preview` element. Prominent button with shadow for visibility. |
| `src/components/Hero.tsx` | Server | Gradient hero section. Accepts `config` prop (not context — server components can't use hooks). Renders H1 and subheadline for crawler indexing. Delegates CTA to HeroCTA. Auto-hidden by HomeContent when content is loaded. |
| `src/components/HeroCTA.tsx` | Client | Extracted from Hero. Single button with `scrollIntoView` to `#tool` section. Needed as client component because `onClick` is not available in server components. |
| `src/components/SEOContent.tsx` | Server | Rich prose section with domain-specific content (viewer vs converter). Internal links to support pages. How-to steps, feature checklist grid. All server-rendered for SEO. |
| `src/components/Header.tsx` | Client | Sticky header. Desktop: horizontal nav links. Mobile: hamburger icon toggles dropdown menu with `useState`. Nav links are config-aware (PDF guide only on converter). |
| `src/components/Footer.tsx` | Client | 3-column responsive footer. Brand + tagline, Resources links, About text. Config-aware — shows PDF guide link only on converter. |
| `src/components/FAQ.tsx` | Client | Maps over `config.faq[]` items. Each item renders as H3 + paragraph. |
| `src/components/ArticleLayout.tsx` | Server | Wrapper for support pages. Applies `prose prose-lg` styling. Includes CTA box at bottom linking back to homepage tool. |

### SEO & Meta Files

| File | Role |
|------|------|
| `src/app/robots.ts` | Generates `robots.txt` with domain-specific sitemap URL. Uses `headers()` for domain detection. |
| `src/app/sitemap.ts` | Generates `sitemap.xml`. Includes homepage + 2 support pages for viewer, + 3 for converter. All set to `lastModified: new Date()`. |
| `src/app/llms.txt/route.ts` | Route handler serving plain text for AI crawlers. Fully describes tool purpose, features, pages, and usage steps per domain. |
| `src/app/what-is-an-md-file/page.tsx` | Support article with Article JSON-LD, OG/Twitter meta, canonical URL. |
| `src/app/how-to-open-md-files/page.tsx` | Support article with Article JSON-LD, OG/Twitter meta, canonical URL. |
| `src/app/markdown-to-pdf-guide/page.tsx` | Support article (converter-relevant) with Article JSON-LD, OG/Twitter meta, canonical URL. |

---

## Type System

All types are defined in `src/types/index.ts`:

```typescript
type SiteId = "viewer" | "converter";

interface SiteConfig {
  id: SiteId;
  domain: string;            // e.g., "viewmdfile.com"
  name: string;              // e.g., "ViewMDFile"
  tagline: string;
  features: {
    pdfExport: boolean;      // Controls PDF button + PDF-related content
  };
  seo: {
    title: string;           // Default <title>
    description: string;     // Meta description
    keywords: string[];      // Meta keywords
  };
  hero: {
    headline: string;        // H1 text
    subheadline: string;     // Hero paragraph
    cta: string;             // CTA button label
  };
  faq: FAQItem[];            // FAQ section items
  theme: {
    primary: string;         // e.g., "bg-blue-600"
    primaryHover: string;    // e.g., "hover:bg-blue-700"
    accent: string;          // e.g., "text-blue-600"
    gradient: string;        // e.g., "from-blue-600 to-indigo-700"
  };
}

interface FAQItem {
  question: string;
  answer: string;
}
```

html2pdf.js type declarations are in `src/types/html2pdf.d.ts` (module declaration for the untyped npm package).

---

## Getting Started

### Prerequisites

- **Node.js** 18.17+ (LTS recommended)
- **npm** 9+

### Installation

```bash
git clone https://github.com/amzocean/md-tools.git
cd md-tools
npm install
```

### Local Development

```bash
npm run dev
```

The app starts at `http://localhost:3000`.

**Testing different sites locally:**

| URL | Site |
|-----|------|
| `http://localhost:3000` | ViewMDFile (default) |
| `http://localhost:3000?site=converter` | MDFileToPDF |

The `?site=` query parameter overrides domain detection in development. This is handled in middleware and works on all routes:

```
http://localhost:3000?site=converter
http://localhost:3000/what-is-an-md-file?site=converter
http://localhost:3000/markdown-to-pdf-guide?site=converter
```

**Alternative: hosts file override (optional)**

Add to `/etc/hosts` (Mac/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):

```
127.0.0.1 viewmdfile.local
127.0.0.1 mdfiletopdf.local
```

Then visit `http://viewmdfile.local:3000` or `http://mdfiletopdf.local:3000`.

### Build & Verify

```bash
npm run build    # Production build — checks types, lints, compiles
npm run start    # Serve production build locally
npm run lint     # Run ESLint
```

---

## Deployment on Vercel

### 1. Import Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Connect your GitHub account and select `amzocean/md-tools`
4. Vercel auto-detects Next.js — accept defaults
5. Click **Deploy**

No environment variables or build settings needed.

### 2. Configure Domains

In Vercel dashboard → **Project Settings** → **Domains**:

1. Add `viewmdfile.com`
2. Add `www.viewmdfile.com` → redirect to `viewmdfile.com`
3. Add `mdfiletopdf.com`
4. Add `www.mdfiletopdf.com` → redirect to `mdfiletopdf.com`

### 3. DNS Configuration

At your domain registrar, add these DNS records **for each domain**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `76.76.21.21` | 300 |
| CNAME | `www` | `cname.vercel-dns.com` | 300 |

Vercel automatically provisions and renews SSL certificates for all added domains.

### 4. Verify Deployment

After DNS propagates (usually 1–15 minutes):

- Visit `https://viewmdfile.com` — should show blue-themed Markdown viewer
- Visit `https://mdfiletopdf.com` — should show emerald-themed Markdown-to-PDF converter
- Check `/robots.txt` on each domain — should reference correct sitemap
- Check `/sitemap.xml` on each domain — converter should include `/markdown-to-pdf-guide`
- Check `/llms.txt` on each domain — should show domain-specific content

---

## Adding a New Domain / Site Variant

To add a third domain (e.g., `markdowneditor.com`):

1. **Add the SiteId** to `src/types/index.ts`:
   ```typescript
   type SiteId = "viewer" | "converter" | "editor";
   ```

2. **Add the config** to `src/config/sites.ts`:
   ```typescript
   editor: {
     id: "editor",
     domain: "markdowneditor.com",
     name: "MarkdownEditor",
     // ... full config object
   }
   ```

3. **Update middleware** in `src/middleware.ts`:
   ```typescript
   if (hostname.includes("markdowneditor")) return "editor";
   ```

4. **Add the domain in Vercel** dashboard and configure DNS.

That's it — all components automatically adapt to the new config.

---

## Key Implementation Details

### Middleware Edge Runtime Constraints

The middleware runs in Next.js Edge Runtime, which has limitations:
- **Cannot use `@/` path aliases** — Node.js module resolution is not available. The `resolveSiteId()` function is inlined directly in `middleware.ts` rather than imported from a shared module.
- **Cannot access filesystem** — all logic must be self-contained.
- **Limited APIs** — only Web APIs are available (no `fs`, `path`, etc.).

### Headers API Behavior (Next.js 14)

In Next.js 14.x, `headers()` from `next/headers` is **synchronous**:
```typescript
const siteId = headers().get("x-site-id");  // Synchronous in 14.x
```

In Next.js 15+, this becomes asynchronous:
```typescript
const siteId = (await headers()).get("x-site-id");  // Async in 15+
```

All pages are **dynamically rendered** (not static) because they call `headers()` at render time. This is intentional — each domain needs different output.

### Tailwind Typography Plugin Overrides

The `@tailwindcss/typography` plugin applies default styles to `.prose` elements. Two overrides were needed:

**Code block readability** — the plugin sets a dark background but doesn't override text color, making code unreadable. Fixed in two places:

1. **Tailwind classes** on MarkdownPreview:
   ```
   prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:overflow-x-auto
   ```

2. **CSS overrides** in `globals.css`:
   ```css
   .prose pre { background-color: #111827; color: #f3f4f6; }
   .prose pre code { color: inherit; background: transparent; }
   ```

---

## License

MIT
