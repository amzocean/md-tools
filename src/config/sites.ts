import { SiteConfig, SiteId } from "@/types";

const sites: Record<SiteId, SiteConfig> = {
  viewer: {
    id: "viewer",
    domain: "viewmdfile.com",
    name: "ViewMDFile",
    tagline: "Instantly preview Markdown files online",
    features: {
      pdfExport: true,
    },
    seo: {
      title: "View MD File Online — Free Markdown Viewer | ViewMDFile.com",
      description:
        "Instantly preview any Markdown (.md) file in your browser. Paste text, upload a file, or drag and drop — no signup, no install required. Beautiful rendered output with full Markdown support.",
      keywords: [
        "markdown viewer",
        "md file viewer",
        "view markdown online",
        "markdown preview",
        "md file reader",
        "open md file",
        "markdown renderer",
        "view md file",
        "markdown file viewer online",
      ],
    },
    hero: {
      headline: "Preview Markdown Files Instantly",
      subheadline:
        "Paste, upload, or drag & drop any .md file to see it beautifully rendered in your browser. Free, fast, and private — nothing is stored on our servers.",
      cta: "Start Previewing",
    },
    faq: [
      {
        question: "What is a Markdown file?",
        answer:
          "A Markdown (.md) file is a plain text file that uses simple formatting syntax to create structured documents. It's widely used for README files, documentation, notes, and web content. Markdown uses symbols like # for headings, * for lists, and ** for bold text.",
      },
      {
        question: "How do I view a Markdown file?",
        answer:
          "Simply paste your Markdown text into the editor, upload a .md file using the upload button, or drag and drop a file onto the page. The rendered preview will appear instantly on the right (or in the Preview tab on mobile).",
      },
      {
        question: "Is my data stored or shared?",
        answer:
          "No. All processing happens entirely in your browser. Your Markdown content is never sent to any server, stored, or shared with anyone. Your data stays completely private.",
      },
      {
        question: "What Markdown features are supported?",
        answer:
          "We support standard Markdown including headings, bold, italic, links, images, code blocks, inline code, blockquotes, ordered and unordered lists, tables, horizontal rules, and strikethrough text (GitHub Flavored Markdown).",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes! ViewMDFile.com is fully responsive and works on phones, tablets, and desktop browsers. On mobile devices, you can switch between the editor and preview using tabs.",
      },
      {
        question: "Do I need to create an account?",
        answer:
          "No. ViewMDFile.com is completely free and requires no signup, login, or account of any kind.",
      },
    ],
    theme: {
      primary: "bg-blue-600",
      primaryHover: "hover:bg-blue-700",
      accent: "text-blue-600",
      gradient: "from-blue-600 to-indigo-700",
    },
  },
  converter: {
    id: "converter",
    domain: "mdfiletopdf.com",
    name: "MDFileToPDF",
    tagline: "Convert Markdown to PDF in seconds",
    features: {
      pdfExport: true,
    },
    seo: {
      title:
        "Convert Markdown to PDF — Free MD to PDF Converter | MDFileToPDF.com",
      description:
        "Convert any Markdown (.md) file to a clean, downloadable PDF. Paste text, upload a file, or drag and drop — preview your document and export to PDF instantly. Free, no signup required.",
      keywords: [
        "markdown to pdf",
        "md to pdf",
        "convert markdown to pdf",
        "md file to pdf",
        "markdown pdf converter",
        "export markdown pdf",
        "markdown pdf download",
        "md to pdf online",
        "markdown to pdf converter free",
      ],
    },
    hero: {
      headline: "Convert Markdown to PDF Instantly",
      subheadline:
        "Upload your .md file, preview the beautifully rendered output, and download a clean PDF — free, fast, and completely private. No signup required.",
      cta: "Start Converting",
    },
    faq: [
      {
        question: "How do I convert a Markdown file to PDF?",
        answer:
          'Simply paste your Markdown text, upload a .md file, or drag and drop it onto the page. Preview the rendered output, then click the "Download PDF" button to save it as a PDF file.',
      },
      {
        question: "Is the PDF conversion free?",
        answer:
          "Yes, completely free. There are no limits on the number of conversions, no watermarks on the output, and no signup required.",
      },
      {
        question: "What does the PDF look like?",
        answer:
          "The PDF preserves the rendered Markdown formatting including headings, lists, tables, code blocks, and text styling. It produces a clean, professional document suitable for sharing or printing.",
      },
      {
        question: "Is my data stored or shared?",
        answer:
          "No. All processing — both the Markdown rendering and the PDF conversion — happens entirely in your browser. Nothing is uploaded to any server. Your documents remain completely private.",
      },
      {
        question: "What Markdown features are supported?",
        answer:
          "We support full GitHub Flavored Markdown (GFM) including headings, bold, italic, links, images, code blocks, inline code, blockquotes, ordered and unordered lists, tables, horizontal rules, and strikethrough text.",
      },
      {
        question: "Can I convert multiple files?",
        answer:
          "You can convert one file at a time. After downloading your PDF, simply clear the editor and load a new file to convert another document.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes! MDFileToPDF.com works on all devices including phones and tablets. The PDF download works on all modern browsers.",
      },
    ],
    theme: {
      primary: "bg-emerald-600",
      primaryHover: "hover:bg-emerald-700",
      accent: "text-emerald-600",
      gradient: "from-emerald-600 to-teal-700",
    },
  },
};

export function getSiteConfig(siteId: SiteId): SiteConfig {
  return sites[siteId];
}

export default sites;
