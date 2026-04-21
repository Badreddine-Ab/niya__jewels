import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import StaticShowcase from "@modules/home/components/static-showcase"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

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
      <div className="border-t border-b border-gold-200 bg-white py-5">
        <div className="content-container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: "◈", label: "Livraison Gratuite", sub: "dès 5000 DA" },
              { icon: "✦", label: "Pièces Artisanales", sub: "toutes uniques" },
              { icon: "◇", label: "Or & Argent", sub: "qualité premium" },
              { icon: "✧", label: "Satisfait ou Remboursé", sub: "14 jours" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-gold-500 text-sm">{item.icon}</span>
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

      {/* About — L'Art de la Bijouterie */}
      <section className="relative bg-charcoal-800 py-28 px-6 overflow-hidden">
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(201,169,110,1) 0px, rgba(201,169,110,1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(-45deg, rgba(201,169,110,1) 0px, rgba(201,169,110,1) 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div className="content-container relative z-10 text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-[9px] tracking-[0.5em] uppercase font-light">
            Notre Histoire
          </span>
          <h2
            className="text-cream-100 mt-5 mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              lineHeight: 1.15,
            }}
          >
            L&apos;Art de la
            <br />
            <span style={{ color: "#C9A96E", fontStyle: "italic" }}>Bijouterie</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="w-10 h-px bg-gold-600" />
            <span className="text-gold-500 text-xs">◈</span>
            <div className="w-10 h-px bg-gold-600" />
          </div>
          <p className="text-cream-400 font-light leading-relaxed mb-10"
            style={{ fontSize: "0.875rem", letterSpacing: "0.05em", lineHeight: 1.9 }}>
            Chez NIYA Jewels, chaque bijou est une œuvre d&apos;art. Nous créons des
            pièces uniques qui célèbrent la beauté et l&apos;élégance marocaine. Inspirés
            par les traditions artisanales et la modernité, nos bijoux sont conçus pour
            durer et raconter votre histoire.
          </p>
          <a
            href="https://www.instagram.com/niya__jewels"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-3.5 border border-gold-600 text-gold-400 text-[10px] tracking-[0.4em] uppercase font-light hover:bg-gold-500 hover:text-charcoal-900 hover:border-gold-500 transition-all duration-300"
          >
            <span>Nous Suivre sur Instagram</span>
          </a>
        </div>
      </section>
    </>
  )
}
