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
  const url = `https://${config.domain}/how-to-open-md-files`;
  const title = "How to Open Markdown (.md) Files";
  const description =
    "Learn the best ways to open and view Markdown files on Windows, Mac, Linux, and online. A complete guide to reading .md files.";
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

export default function HowToOpenMdFiles() {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Open Markdown (.md) Files",
    description:
      "Learn the best ways to open and view Markdown files on Windows, Mac, Linux, and online.",
    url: `https://${config.domain}/how-to-open-md-files`,
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
        <h1>How to Open Markdown (.md) Files</h1>

        <p>
          Markdown files are plain text files, so they can be opened with any
          text editor. However, to see the <strong>formatted output</strong>{" "}
          with headings, bold text, links, and other styling, you need a
          Markdown viewer or renderer.
        </p>

        <h2>Method 1: Use an Online Viewer (Easiest)</h2>
        <p>
          The fastest way to view a Markdown file is to use an online tool like{" "}
          <strong>{config.name}</strong>. Simply visit the homepage, paste your
          Markdown text or upload your <code>.md</code> file, and see the
          rendered output instantly.
        </p>

        <h2>Method 2: Use a Code Editor</h2>
        <p>Popular code editors have built-in Markdown preview:</p>
        <ul>
          <li>
            <strong>VS Code:</strong> Open the file and press{" "}
            <code>Ctrl+Shift+V</code> (Windows/Linux) or{" "}
            <code>Cmd+Shift+V</code> (Mac) to toggle preview
          </li>
          <li>
            <strong>Sublime Text:</strong> Install the Markdown Preview
            package
          </li>
          <li>
            <strong>Atom:</strong> Built-in Markdown preview with{" "}
            <code>Ctrl+Shift+M</code>
          </li>
        </ul>

        <h2>Method 3: Use a Dedicated App</h2>
        <ul>
          <li><strong>Typora:</strong> A popular WYSIWYG Markdown editor (Windows, Mac, Linux)</li>
          <li><strong>Obsidian:</strong> A powerful note-taking app that uses Markdown</li>
          <li><strong>iA Writer:</strong> A minimalist Markdown writing app (Mac, iOS, Windows, Android)</li>
          <li><strong>Mark Text:</strong> A free, open-source Markdown editor</li>
        </ul>

        <h2>Method 4: View on GitHub</h2>
        <p>
          If your Markdown file is in a GitHub repository, GitHub automatically
          renders it. Simply navigate to the file in the repository and GitHub
          will display the formatted version.
        </p>

        <h2>Method 5: Use the Command Line</h2>
        <p>
          For developers, command-line tools like <code>glow</code> (Go) or{" "}
          <code>bat</code> (Rust) can render Markdown directly in the terminal
          with syntax highlighting.
        </p>

        <h2>Opening .md Files on Different Operating Systems</h2>
        <h3>Windows</h3>
        <p>
          Right-click the file → Open With → choose Notepad (for raw text) or
          VS Code (for preview). Alternatively, use {config.name} in your browser.
        </p>
        <h3>macOS</h3>
        <p>
          Double-click to open in TextEdit (raw text), or right-click → Open
          With → choose a Markdown app. Use Quick Look by pressing Space in
          Finder for a basic preview.
        </p>
        <h3>Linux</h3>
        <p>
          Open with any text editor (gedit, nano, vim) for raw text, or use VS
          Code / Typora for rendered preview.
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}
