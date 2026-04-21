"use client";

import Link from "next/link";
import { useSiteConfig } from "./SiteProvider";

export default function Footer() {
  const config = useSiteConfig();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">{config.name}</h3>
            <p className="text-sm">{config.tagline}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/what-is-an-md-file"
                  className="hover:text-white transition-colors"
                >
                  What is a Markdown File?
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-open-md-files"
                  className="hover:text-white transition-colors"
                >
                  How to Open MD Files
                </Link>
              </li>
              {config.features.pdfExport && (
                <li>
                  <Link
                    href="/markdown-to-pdf-guide"
                    className="hover:text-white transition-colors"
                  >
                    Markdown to PDF Guide
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-sm">
              {config.name} is a free, privacy-first tool. All processing
              happens in your browser — no data is ever sent to a server.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} {config.domain}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
