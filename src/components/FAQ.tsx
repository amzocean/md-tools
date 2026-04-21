"use client";

import { useSiteConfig } from "./SiteProvider";
import type { FAQItem } from "@/types";

export default function FAQ() {
  const config = useSiteConfig();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {config.faq.map((item: FAQItem, idx: number) => (
          <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.question}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
