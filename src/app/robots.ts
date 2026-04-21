import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import type { SiteId } from "@/types";

export default function robots(): MetadataRoute.Robots {
  const siteId = (headers().get("x-site-id") || "viewer") as SiteId;
  const domain =
    siteId === "converter" ? "mdfiletopdf.com" : "viewmdfile.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
