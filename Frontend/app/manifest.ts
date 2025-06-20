import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swift Grocery Delivery",
    short_name: "Swift",
    description: "Order groceries for delivery from local supermarkets in Ethiopia",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00c853",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
