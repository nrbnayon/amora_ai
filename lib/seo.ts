import type { Metadata } from "next"
import { APP_CONFIG } from "./constants"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

export function generateSEO({
  title,
  description = APP_CONFIG.description,
  image = "/og-image.jpg",
  url = APP_CONFIG.url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | ${APP_CONFIG.name}` : APP_CONFIG.name
  const seoImage = image.startsWith("http") ? image : `${APP_CONFIG.url}${image}`

  return {
    title: seoTitle,
    description,
    keywords: tags || ["wedding planning", "AI wedding planner", "wedding organizer"],
    authors: authors?.map((name) => ({ name })) || [{ name: "Amora AI Team" }],
    creator: "Amora AI",
    publisher: "Amora AI",
    metadataBase: new URL(APP_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: seoTitle,
      description,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: title || APP_CONFIG.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: [seoImage],
      creator: "@amoraai",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

// Structured data helpers
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${APP_CONFIG.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
    logo: `${APP_CONFIG.url}/logo.png`,
    sameAs: ["https://twitter.com/amoraai", "https://facebook.com/amoraai", "https://instagram.com/amoraai"],
  }
}
