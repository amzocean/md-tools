import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getSiteConfig } from "@/config/sites";
import { SiteProvider } from "@/components/SiteProvider";
import type { SiteId } from "@/types";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);

  return {
    title: {
      default: config.seo.title,
      template: `%s | ${config.name}`,
    },
    description: config.seo.description,
    keywords: config.seo.keywords,
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: `https://${config.domain}`,
      siteName: config.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
    },
    alternates: {
      canonical: `https://${config.domain}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.name,
    url: `https://${config.domain}`,
    description: config.seo.description,
    applicationCategory: "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteProvider config={config}>
          <div className="flex-1">{children}</div>
        </SiteProvider>
      </body>
    </html>
  );
}
