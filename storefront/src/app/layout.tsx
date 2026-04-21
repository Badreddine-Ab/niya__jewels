import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "NIYA Jewels — Bijoux Artisanaux",
  description: "Découvrez nos bijoux artisanaux uniques. Colliers, bracelets, bagues et boucles d'oreilles créés avec passion.",
  openGraph: {
    siteName: "NIYA Jewels",
    type: "website",
    locale: "fr_FR",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}