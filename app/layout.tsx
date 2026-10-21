import type { Metadata, Viewport } from "next"
import { Fraunces, Nunito, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteChrome } from "@/components/site/site-chrome"
import { Footer } from "@/components/site/footer"
import "./globals.css"

const body = Nunito({ variable: "--font-body", subsets: ["latin"] })
const display = Fraunces({ variable: "--font-display-ff", subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], style: ["normal", "italic"] })
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: ["500", "700"] })

export const metadata: Metadata = {
  title: { default: "Shah Art Studio & Academy — Preserve Precious Moments Forever", template: "%s · Shah Art Studio" },
  description: "3D hand & foot casting for newborns, baby keepsakes, resin art and bespoke home decor. We come to you. Handcrafted with 100% skin-safe organic materials.",
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
}
export const viewport: Viewport = { themeColor: "#FFF8F0" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${hand.variable}`}>
      <body>
        <SiteChrome />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
