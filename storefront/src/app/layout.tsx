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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}