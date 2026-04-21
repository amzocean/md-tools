import { headers } from "next/headers";
import { getSiteConfig } from "@/config/sites";
import type { SiteId } from "@/types";
import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const config = getSiteConfig(siteId);
  const base = `https://${config.domain}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
    ],
  };

  const howToJsonLd = config.features.pdfExport
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Convert Markdown to PDF",
        description:
          "Convert any Markdown (.md) file to a downloadable PDF document for free.",
        step: [
          {
            "@type": "HowToStep",
            name: "Add your Markdown content",
            text: "Paste Markdown text into the editor, click Upload .md to select a file, or drag and drop a .md file onto the page.",
          },
          {
            "@type": "HowToStep",
            name: "Preview the output",
            text: "The rendered Markdown preview appears instantly on the right side of the screen (or in the Preview tab on mobile).",
          },
          {
            "@type": "HowToStep",
            name: "Download as PDF",
            text: 'Click the "Download PDF" button to export your rendered Markdown as a clean PDF document.',
          },
        ],
        tool: {
          "@type": "HowToTool",
          name: "MDFileToPDF.com",
        },
        totalTime: "PT1M",
      }
    : {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to View a Markdown File Online",
        description:
          "Preview any Markdown (.md) file instantly in your browser for free.",
        step: [
          {
            "@type": "HowToStep",
            name: "Add your Markdown content",
            text: "Paste Markdown text into the editor, click Upload .md to select a file, or drag and drop a .md file onto the page.",
          },
          {
            "@type": "HowToStep",
            name: "View the rendered preview",
            text: "The beautifully rendered Markdown appears instantly on the right side of the screen (or in the Preview tab on mobile).",
          },
        ],
        tool: {
          "@type": "HowToTool",
          name: "ViewMDFile.com",
        },
        totalTime: "PT30S",
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Header />
      <HomeContent config={config} />
      <SEOContent config={config} />
      <FAQ />
      <Footer />
    </>
  );
}
