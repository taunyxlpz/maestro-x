import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "./globals.css";
import { APP_NAME } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${APP_NAME} — your repair expert in any language`,
  description: "Snap a photo, speak or type in any language. Maestro X tells you if you can fix it, need a pro, or it's an emergency.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: APP_NAME, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = { themeColor: "#070707", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
