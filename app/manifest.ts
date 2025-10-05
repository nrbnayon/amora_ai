import type { MetadataRoute } from "next"
import { APP_CONFIG } from "@/lib/constants"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.name,
    short_name: "Amora AI",
    description: APP_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7b0b4e",
    orientation: "portrait",
    categories: ["lifestyle", "productivity", "social"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
