# MD Tools — ViewMDFile.com & MDFileToPDF.com

A single Next.js application serving two domains:

- **ViewMDFile.com** — Instantly preview Markdown files online
- **MDFileToPDF.com** — Convert Markdown files to PDF

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography`
- **react-markdown** + **remark-gfm** for rendering
- **html2pdf.js** for client-side PDF export

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the viewer. Add `?site=converter` to preview the converter branding.

## Architecture

- **Middleware** detects the domain from the `Host` header and sets `x-site-id`
- **SiteProvider** (React Context) provides config to all client components
- **Config-driven** — all branding, SEO, content, and features are in `src/config/sites.ts`
- **No database, no auth** — everything runs in the browser

## Local Development

Use query params to test different sites:

- `http://localhost:3000` → ViewMDFile (default)
- `http://localhost:3000?site=converter` → MDFileToPDF

Or set up `/etc/hosts`:

```
127.0.0.1 viewmdfile.local
127.0.0.1 mdfiletopdf.local
```

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Vercel auto-detects Next.js — no special settings needed
3. Deploy

### 3. Configure Domains

In the Vercel project dashboard → Settings → Domains:

1. Add `viewmdfile.com`
2. Add `www.viewmdfile.com` (redirect to apex)
3. Add `mdfiletopdf.com`
4. Add `www.mdfiletopdf.com` (redirect to apex)

Update DNS at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

Repeat for both domains. Vercel automatically provisions SSL certificates.

### 4. Verify

Both domains will serve the same app, but middleware detects the hostname and serves different branding, content, and features.

## Folder Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Home page
│   ├── what-is-an-md-file/     # SEO support page
│   ├── how-to-open-md-files/   # SEO support page
│   └── markdown-to-pdf-guide/  # SEO support page
├── components/
│   ├── SiteProvider.tsx         # React Context for site config
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── MarkdownTool.tsx         # Main editor + preview tool
│   ├── MarkdownPreview.tsx      # Markdown renderer
│   ├── PdfExportButton.tsx      # PDF download (converter only)
│   ├── FAQ.tsx
│   └── ArticleLayout.tsx        # Layout for support pages
├── config/
│   ├── sites.ts                 # All site configuration
│   └── sample.ts                # Sample markdown content
├── lib/
│   └── getSiteId.ts             # Hostname → siteId helper
├── types/
│   ├── index.ts                 # Type definitions
│   └── html2pdf.d.ts            # Type declarations for html2pdf.js
└── middleware.ts                 # Domain detection middleware
```

## License

MIT
