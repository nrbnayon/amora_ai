import type { MetadataRoute } from "next"
import { APP_CONFIG } from "@/lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/onboarding/", "/auth/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/dashboard/", "/onboarding/", "/auth/"],
      },
    ],
    sitemap: `${APP_CONFIG.url}/sitemap.xml`,
  }
}
