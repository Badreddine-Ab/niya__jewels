import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "NIYA Jewels — Bijoux Artisanaux",
  description:
    "Découvrez nos bijoux artisanaux uniques. Colliers, bracelets, bagues et boucles d'oreilles créés avec passion et authenticité.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="bg-cream-100">
        <ul className="flex flex-col">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      {/* About section */}
      <section className="bg-charcoal-800 py-20 px-6">
        <div className="content-container text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-light">
            Notre Histoire
          </span>
          <h2
            className="text-cream-100 mt-4 mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            L&apos;Art de la Bijouterie
          </h2>
          <div className="w-10 h-px bg-gold-500 mx-auto mb-6" />
          <p className="text-cream-400 font-light leading-relaxed text-sm tracking-wide">
            Chez NIYA Jewels, chaque bijou est une œuvre d&apos;art. Nous créons des pièces uniques
            qui célèbrent la beauté et l&apos;élégance. Inspirés par les traditions artisanales et
            la modernité, nos bijoux sont conçus pour durer et raconter votre histoire.
          </p>
          <div className="mt-10">
            <a
              href="https://www.instagram.com/niya__jewels"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3 border border-gold-500 text-gold-400 text-xs tracking-[0.3em] uppercase font-light hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300"
            >
              Nous Suivre
            </a>
          </div>
        </div>
      </section>
    </>
  )
}