import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteConfig } from "@/types";

interface ArticleLayoutProps {
  children: ReactNode;
  config: SiteConfig;
}

export default function ArticleLayout({ children, config }: ArticleLayoutProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600">
        {children}
      </div>
      <div className="mt-12 p-6 bg-gray-100 rounded-xl text-center">
        <p className="text-gray-700 mb-4 font-medium">
          Ready to try it yourself?
        </p>
        <Link
          href="/"
          className={`inline-flex items-center px-5 py-2.5 rounded-lg text-white font-semibold text-sm ${config.theme.primary} ${config.theme.primaryHover} transition-colors`}
        >
          {config.features.pdfExport
            ? "Convert Markdown to PDF Now"
            : "Preview Markdown Now"}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
