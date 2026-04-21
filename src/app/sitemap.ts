import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import type { SiteId } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const domain =
    siteId === "converter" ? "mdfiletopdf.com" : "viewmdfile.com";
  const base = `https://${domain}`;

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    {
      path: "/what-is-an-md-file",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/how-to-open-md-files",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
  ];

  if (siteId === "converter") {
    routes.push({
      path: "/markdown-to-pdf-guide",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    });
  }

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
