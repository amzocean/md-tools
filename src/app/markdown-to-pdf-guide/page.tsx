import type { Metadata } from "next";
import { headers } from "next/headers";
import { getSiteConfig } from "@/config/sites";
import type { SiteId } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleLayout from "@/components/ArticleLayout";

export async function generateMetadata(): Promise<Metadata> {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);
  const url = `https://${config.domain}/markdown-to-pdf-guide`;
  const title = "How to Convert Markdown to PDF — Complete Guide";
  const description =
    "Learn multiple ways to convert Markdown files to PDF, including free online tools, command-line methods, and desktop apps. Step-by-step guide.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: config.name,
      type: "article",
    },
    twitter: { card: "summary", title, description },
  };
}

export default function MarkdownToPdfGuide() {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Convert Markdown to PDF",
    description:
      "Learn multiple ways to convert Markdown files to PDF, including free online tools, command-line methods, and desktop apps.",
    url: `https://${config.domain}/markdown-to-pdf-guide`,
    publisher: { "@type": "Organization", name: config.name, url: `https://${config.domain}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <ArticleLayout config={config}>
        <h1>How to Convert Markdown to PDF</h1>

        <p>
          Converting Markdown to PDF is useful when you need to share documents
          with people who may not have a Markdown viewer, or when you need a
          polished, printable version of your document. Here are the best
          methods.
        </p>

        <h2>Method 1: Use MDFileToPDF.com (Easiest)</h2>
        <p>
          The simplest way to convert Markdown to PDF is to use{" "}
          <strong>MDFileToPDF.com</strong>:
        </p>
        <ol>
          <li>Visit the homepage</li>
          <li>Paste your Markdown text or upload a <code>.md</code> file</li>
          <li>Preview the rendered output</li>
          <li>Click <strong>Download PDF</strong></li>
        </ol>
        <p>
          The entire process happens in your browser — no data is sent to any
          server, and the resulting PDF is clean and professional.
        </p>

        <h2>Method 2: Use VS Code</h2>
        <p>
          VS Code with the <strong>Markdown PDF</strong> extension can convert
          Markdown to PDF directly:
        </p>
        <ol>
          <li>Install the &quot;Markdown PDF&quot; extension</li>
          <li>Open your <code>.md</code> file</li>
          <li>
            Open the command palette (<code>Ctrl+Shift+P</code>) and search for
            &quot;Markdown PDF: Export (pdf)&quot;
          </li>
        </ol>

        <h2>Method 3: Use Pandoc (Command Line)</h2>
        <p>
          <strong>Pandoc</strong> is a powerful command-line document converter:
        </p>
        <pre>
          <code>pandoc input.md -o output.pdf</code>
        </pre>
        <p>
          Note: Pandoc requires a LaTeX engine (like TeX Live or MiKTeX) for
          PDF output. For simpler needs, MDFileToPDF.com may be more convenient.
        </p>

        <h2>Method 4: Use a Desktop App</h2>
        <ul>
          <li>
            <strong>Typora:</strong> File → Export → PDF
          </li>
          <li>
            <strong>Mark Text:</strong> File → Export → PDF
          </li>
          <li>
            <strong>Obsidian:</strong> Use the &quot;Pandoc Plugin&quot; community
            plugin for PDF export
          </li>
        </ul>

        <h2>Tips for Better PDF Output</h2>
        <ul>
          <li>
            <strong>Use clear headings:</strong> Well-structured documents with
            proper heading hierarchy produce better PDFs
          </li>
          <li>
            <strong>Keep tables simple:</strong> Complex tables may not render
            perfectly in PDF format
          </li>
          <li>
            <strong>Test images:</strong> Make sure image URLs are accessible
            when converting
          </li>
          <li>
            <strong>Review before exporting:</strong> Always check the preview
            before downloading the PDF
          </li>
        </ul>
      </ArticleLayout>
      <Footer />
    </>
  );
}
