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
  const url = `https://${config.domain}/what-is-an-md-file`;
  const title = "What is a Markdown (.md) File?";
  const description =
    "Learn what Markdown files are, why they are used, and how the .md format works. A beginner-friendly guide to understanding Markdown.";
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

export default function WhatIsMdFile() {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is a Markdown (.md) File?",
    description:
      "Learn what Markdown files are, why they are used, and how the .md format works.",
    url: `https://${config.domain}/what-is-an-md-file`,
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
        <h1>What is a Markdown (.md) File?</h1>

        <p>
          A <strong>Markdown file</strong> (with the <code>.md</code> or{" "}
          <code>.markdown</code> extension) is a plain text file that uses a
          lightweight formatting syntax to create structured documents. Created
          by John Gruber in 2004, Markdown has become one of the most popular
          ways to format text on the web.
        </p>

        <h2>Why Use Markdown?</h2>
        <ul>
          <li>
            <strong>Simplicity:</strong> Write formatted documents using simple
            symbols like <code>#</code> for headings and <code>**</code> for bold
          </li>
          <li>
            <strong>Portability:</strong> Markdown files are plain text, so they
            work on any device and operating system
          </li>
          <li>
            <strong>Versatility:</strong> Used for README files, documentation,
            blogs, notes, books, and more
          </li>
          <li>
            <strong>Readability:</strong> Even without rendering, Markdown is
            easy to read in its raw form
          </li>
        </ul>

        <h2>Where is Markdown Used?</h2>
        <p>Markdown is used extensively across the software industry and beyond:</p>
        <ul>
          <li><strong>GitHub:</strong> README files, issues, pull requests, and wikis</li>
          <li><strong>Documentation:</strong> Technical docs, API references, and user guides</li>
          <li><strong>Note-taking:</strong> Apps like Obsidian, Notion, and Bear use Markdown</li>
          <li><strong>Blogging:</strong> Static site generators like Hugo, Jekyll, and Gatsby</li>
          <li><strong>Communication:</strong> Slack, Discord, and other chat apps support Markdown</li>
        </ul>

        <h2>Basic Markdown Syntax</h2>
        <table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Syntax</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Heading</td><td><code># Heading 1</code></td></tr>
            <tr><td>Bold</td><td><code>**bold text**</code></td></tr>
            <tr><td>Italic</td><td><code>*italic text*</code></td></tr>
            <tr><td>Link</td><td><code>[title](url)</code></td></tr>
            <tr><td>Image</td><td><code>![alt](url)</code></td></tr>
            <tr><td>Code</td><td><code>`inline code`</code></td></tr>
            <tr><td>List</td><td><code>- item</code></td></tr>
            <tr><td>Blockquote</td><td><code>&gt; quote</code></td></tr>
          </tbody>
        </table>

        <h2>What is GitHub Flavored Markdown (GFM)?</h2>
        <p>
          GitHub Flavored Markdown extends standard Markdown with additional
          features like tables, task lists, strikethrough text, and automatic
          URL linking. GFM is the most widely used Markdown variant today and
          is the format supported by {config.name}.
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}
