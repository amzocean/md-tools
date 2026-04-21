import { headers } from "next/headers";
import type { SiteId } from "@/types";
import { getSiteConfig } from "@/config/sites";

export async function GET() {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);

  const viewerContent = `# ViewMDFile.com

> Free online Markdown (.md) file viewer and previewer

## What this tool does
ViewMDFile.com lets you instantly preview any Markdown file in your browser.
You can paste Markdown text, upload a .md file, or drag and drop — the rendered
output appears immediately with full GitHub Flavored Markdown (GFM) support.

## Key facts
- Completely free, no signup or login required
- All processing happens client-side in your browser
- No data is sent to any server — fully private
- Supports headings, bold, italic, links, images, code blocks, tables, lists, blockquotes, strikethrough
- Works on desktop, tablet, and mobile devices
- Supports .md, .markdown, and .txt file uploads

## Pages
- https://viewmdfile.com/ — Main tool: paste or upload Markdown to preview
- https://viewmdfile.com/what-is-an-md-file — Guide: What is a Markdown file?
- https://viewmdfile.com/how-to-open-md-files — Guide: How to open .md files

## How to use
1. Go to https://viewmdfile.com
2. Paste Markdown text into the editor, OR click "Upload .md" to select a file, OR drag and drop a .md file
3. The rendered preview appears instantly on the right (desktop) or in the Preview tab (mobile)
4. Click "Clear" to reset and start over
`;

  const converterContent = `# MDFileToPDF.com

> Free online Markdown to PDF converter

## What this tool does
MDFileToPDF.com converts any Markdown (.md) file into a clean, downloadable PDF.
You can paste Markdown text, upload a .md file, or drag and drop — preview the
rendered output and then download it as a professional PDF document.

## Key facts
- Completely free, no signup or login required
- No watermarks on exported PDFs
- All processing happens client-side in your browser
- No data is sent to any server — fully private
- Supports full GitHub Flavored Markdown (GFM): headings, bold, italic, links, images, code blocks, tables, lists, blockquotes, strikethrough
- Works on desktop, tablet, and mobile devices
- Supports .md, .markdown, and .txt file uploads

## Pages
- https://mdfiletopdf.com/ — Main tool: convert Markdown to PDF
- https://mdfiletopdf.com/what-is-an-md-file — Guide: What is a Markdown file?
- https://mdfiletopdf.com/how-to-open-md-files — Guide: How to open .md files
- https://mdfiletopdf.com/markdown-to-pdf-guide — Guide: How to convert Markdown to PDF

## How to use
1. Go to https://mdfiletopdf.com
2. Paste Markdown text into the editor, OR click "Upload .md" to select a file, OR drag and drop a .md file
3. The rendered preview appears instantly on the right (desktop) or in the Preview tab (mobile)
4. Click "Download PDF" to export the rendered Markdown as a PDF file
5. Click "Clear" to reset and start over
`;

  const content =
    siteId === "converter" ? converterContent : viewerContent;

  return new Response(content.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
