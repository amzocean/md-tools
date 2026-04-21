import Link from "next/link";
import type { SiteConfig } from "@/types";

interface SEOContentProps {
  config: SiteConfig;
}

export default function SEOContent({ config }: SEOContentProps) {
  const isConverter = config.features.pdfExport;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {isConverter
          ? "The Easiest Way to Convert Markdown to PDF"
          : "The Easiest Way to View Markdown Files Online"}
      </h2>

      {isConverter ? (
        <>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>MDFileToPDF.com</strong> is a free, browser-based tool that
            converts Markdown (<code className="text-sm bg-gray-100 px-1 rounded">.md</code>) files
            into clean, downloadable PDF documents. Whether you need to share a
            README, export documentation, or create a printable version of your
            notes, our converter handles it in seconds.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Simply paste your Markdown text, upload a file, or drag and drop —
            preview the rendered output with full{" "}
            <Link href="/what-is-an-md-file" className="text-emerald-600 hover:underline">
              GitHub Flavored Markdown
            </Link>{" "}
            support, then download a professional PDF with one click. No
            watermarks, no signup, no limits.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            How to Convert Markdown to PDF
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>Paste Markdown text, upload a <code className="text-sm bg-gray-100 px-1 rounded">.md</code> file, or drag and drop</li>
            <li>Preview the beautifully rendered output</li>
            <li>Click <strong>&ldquo;Download PDF&rdquo;</strong> to save your document</li>
          </ol>
          <p className="text-gray-700 mb-4 leading-relaxed">
            All processing happens entirely in your browser — your content is
            never uploaded to any server. Learn more in our{" "}
            <Link href="/markdown-to-pdf-guide" className="text-emerald-600 hover:underline">
              complete Markdown to PDF guide
            </Link>
            .
          </p>
        </>
      ) : (
        <>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>ViewMDFile.com</strong> is a free, browser-based{" "}
            <Link href="/what-is-an-md-file" className="text-blue-600 hover:underline">
              Markdown
            </Link>{" "}
            viewer that renders <code className="text-sm bg-gray-100 px-1 rounded">.md</code> files
            instantly. Whether you received a README file, have documentation to
            review, or just want to preview your Markdown before committing —
            this tool makes it effortless.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Paste text directly, upload a file, or drag and drop — the preview
            updates in real time with full GitHub Flavored Markdown support
            including headings, tables, code blocks, lists, and more.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
            How to View a Markdown File
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>Paste Markdown text, upload a <code className="text-sm bg-gray-100 px-1 rounded">.md</code> file, or drag and drop</li>
            <li>The rendered preview appears instantly</li>
            <li>Toggle between Edit and Preview on mobile</li>
          </ol>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Your content never leaves your browser — everything is processed
            locally for complete privacy. Need help opening Markdown files? Check
            our guide on{" "}
            <Link href="/how-to-open-md-files" className="text-blue-600 hover:underline">
              how to open .md files
            </Link>
            .
          </p>
        </>
      )}

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        Supported Markdown Features
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-700 text-sm">
        {[
          "Headings (H1–H6)",
          "Bold & Italic",
          "Links & Images",
          "Code Blocks",
          "Inline Code",
          "Blockquotes",
          "Ordered Lists",
          "Unordered Lists",
          "Tables",
          "Horizontal Rules",
          "Strikethrough",
          "Task Lists",
        ].map((feature) => (
          <div key={feature} className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
