import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import StaticShowcase from "@modules/home/components/static-showcase"
import Reviews from "@modules/home/components/reviews"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "NIYA Jewels — Bijoux Artisanaux du Maroc",
  description:
    "Découvrez nos bijoux artisanaux uniques. Colliers, bracelets, bagues et boucles d'oreilles créés avec passion et authenticité au Maroc.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  }).catch(() => ({ collections: [], count: 0 }))

  return (
    <>
      <Hero />

      {/* Static test products — always visible */}
      <StaticShowcase />

      {/* Dynamic products from backend — shows when available */}
      {collections.length > 0 && region && (
        <div className="bg-cream-100">
          <ul className="flex flex-col">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}

      {/* Values strip */}
      <div className="border-t border-b border-rose-100 bg-white py-5">
        <div className="content-container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: "♡", label: "Livraison Gratuite", sub: "dès 5000 DA" },
              { icon: "✦", label: "Pièces Artisanales", sub: "toutes uniques" },
              { icon: "◇", label: "Or & Argent", sub: "qualité premium" },
              { icon: "✧", label: "Satisfait ou Remboursé", sub: "14 jours" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-rose-400 text-sm">{item.icon}</span>
                <span className="text-charcoal-700 text-[9px] tracking-[0.3em] uppercase font-light">
                  {item.label}
                </span>
                <span className="text-charcoal-400 text-[8px] tracking-wider font-light">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <Reviews />

      {/* Notre Histoire teaser */}
      <section className="relative overflow-hidden bg-charcoal-800">
        {/* Moroccan grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(201,169,110,1) 0px, rgba(201,169,110,1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(-45deg, rgba(201,169,110,1) 0px, rgba(201,169,110,1) 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div className="content-container relative z-10 flex flex-col md:flex-row items-stretch max-w-5xl mx-auto">
          {/* Photo — takes full column height */}
          <div className="relative w-full md:w-[40%] flex-shrink-0 h-64 md:h-auto overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hiba-portrait.jpg"
              alt="Najih Hiba — Fondatrice NIYA Jewels"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 15%" }}
            />
            {/* Right-side gradient to blend into dark section */}
            <div
              className="absolute inset-0 hidden md:block"
              style={{
                background: "linear-gradient(to right, transparent 60%, rgba(26,26,26,0.8) 100%)",
              }}
            />
          </div>

          {/* Text */}
          <div className="py-20 md:py-24 px-8 md:px-14 flex flex-col justify-center text-center md:text-left">
            <span className="text-rose-300 text-[9px] tracking-[0.5em] uppercase font-light block mb-3">
              La fondatrice
            </span>
            <h2
              className="text-cream-50 mb-6"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
              }}
            >
              Notre Histoire
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-7">
              <div className="w-8 h-px bg-gold-700" />
              <span className="text-gold-500 text-[9px]">◈</span>
              <div className="w-8 h-px bg-gold-700" />
            </div>
            <p
              className="text-cream-400 font-light mb-9"
              style={{ fontSize: "0.875rem", lineHeight: 1.95, letterSpacing: "0.03em", maxWidth: "340px", margin: "0 auto 2.25rem" }}
            >
              Niya n&apos;est pas née dans le bruit…<br />
              Elle est née dans le silence. Dans ces moments où le cœur parle doucement,
              mais avec une vérité immense.
            </p>
            <div className="flex justify-center md:justify-start">
              <LocalizedClientLink href="/notre-histoire">
                <button className="px-8 py-3 border border-rose-400 text-rose-300 text-[10px] tracking-[0.3em] uppercase font-light hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300">
                  Lire notre histoire
                </button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
