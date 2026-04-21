export type SiteId = "viewer" | "converter";

export interface SiteFeatures {
  pdfExport: boolean;
}

export interface SiteSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface SiteHero {
  headline: string;
  subheadline: string;
  cta: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  id: SiteId;
  domain: string;
  name: string;
  tagline: string;
  features: SiteFeatures;
  seo: SiteSEO;
  hero: SiteHero;
  faq: FAQItem[];
  theme: {
    primary: string;
    primaryHover: string;
    accent: string;
    gradient: string;
  };
}
