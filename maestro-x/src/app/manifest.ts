import type { MetadataRoute } from "next";
import { APP_NAME } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#070707",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
