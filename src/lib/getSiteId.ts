import { SiteId } from "@/types";

export function getSiteIdFromHostname(hostname: string): SiteId {
  if (hostname.includes("mdfiletopdf")) return "converter";
  if (hostname.includes("viewmdfile")) return "viewer";
  return "viewer";
}
