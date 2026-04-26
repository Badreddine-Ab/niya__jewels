import LocalizedClientLink from "@modules/common/components/localized-client-link"

const MARQUEE_ITEMS = [
  "Bijoux Artisanaux",
  "Fait au Maroc",
  "Collection Exclusive 2025",
  "Livraison Offerte dès 5000 DA",
  "Pièces Uniques",
  "Or 18 Carats",
  "Argent 925",
]

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* SPLIT HERO: dark editorial left + product image right */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "95vh" }}>

        {/* LEFT PANEL: dark charcoal with editorial content */}
        <div className="relative flex flex-col items-center lg:items-start justify-center px-8 sm:px-16 lg:px-20 xl:px-28 py-32 lg:py-0 bg-charcoal-800 w-full lg:w-[56%] flex-shrink-0">

          {/* Moroccan grid texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(201,169,110,1) 0px, rgba(201,169,110,1) 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(-45deg, rgba(201,169,110,1) 0px, rgba(201,169,110,1) 1px, transparent 1px, transparent 40px)
              `,
            }}
          />

          {/* Vertical side label (desktop) */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-600 to-transparent" />
            <span
              className="text-gold-500 text-[8px] tracking-[0.5em] uppercase font-light"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Artisanat · Maroc
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-600 to-transparent" />
          </div>

          {/* Bottom corner ornaments */}
          <div className="absolute bottom-8 left-20 w-8 h-8 border-b border-l border-gold-700 opacity-30 hidden lg:block" />
          <div className="absolute top-8 left-20 w-8 h-8 border-t border-l border-gold-700 opacity-30 hidden lg:block" />

          {/* Content */}
          <div className="relative z-10 text-center lg:text-left w-full max-w-xl lg:max-w-none">

            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="w-8 h-px bg-rose-500 opacity-70" />
              <span className="text-rose-300 text-[9px] tracking-[0.45em] uppercase font-light">
                Collection Exclusive
              </span>
              <div className="w-8 h-px bg-rose-500 opacity-70" />
            </div>

            {/* Logo */}
            <div className="mb-7 flex justify-center lg:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/niya-logo.svg"
                alt="NIYA Jewels"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <span
                className="block text-cream-100 font-light"
                style={{
                  fontSize: "clamp(3.2rem, 5.5vw, 6.5rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                L&apos;Art des
              </span>
              <span
                className="block font-light italic"
                style={{
                  fontSize: "clamp(3.2rem, 5.5vw, 6.5rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.1,
                  color: "#C9A96E",
                }}
              >
                Bijoux
              </span>
            </h1>

            {/* Gold separator */}
            <div className="flex items-center justify-center lg:justify-start gap-5 my-8">
              <div className="w-10 h-px bg-gold-700 opacity-70" />
              <span className="text-gold-500 text-[9px]">◈</span>
              <div className="w-10 h-px bg-gold-700 opacity-70" />
            </div>

            {/* Subheadline */}
            <p
              className="text-cream-400 font-light mb-10 mx-auto lg:mx-0 max-w-xs"
              style={{ fontSize: "0.8rem", letterSpacing: "0.08em", lineHeight: 2.1 }}
            >
              Chaque pièce est une œuvre d&apos;art,<br />
              créée avec passion au cœur du Maroc.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
              <LocalizedClientLink href="/store">
                <button className="px-10 py-3.5 bg-rose-500 text-white text-[10px] tracking-[0.35em] uppercase font-light hover:bg-rose-600 transition-colors duration-300 min-w-[210px]">
                  Découvrir la boutique
                </button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/notre-histoire">
                <button className="px-10 py-3.5 border border-cream-50/20 text-cream-100/60 text-[10px] tracking-[0.35em] uppercase font-light hover:border-gold-400 hover:text-gold-300 transition-all duration-300 min-w-[210px]">
                  Notre histoire
                </button>
              </LocalizedClientLink>
            </div>

            {/* Scroll hint */}
            <div className="mt-14 flex flex-col items-center lg:items-start gap-2">
              <span className="text-charcoal-400 text-[8px] tracking-[0.45em] uppercase font-light">
                Découvrir
              </span>
              <div className="w-px h-7 bg-gradient-to-b from-gold-600 to-transparent" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: product image (desktop only) */}
        <div className="hidden lg:block relative flex-1 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/set-bijoux.jpg"
            alt="NIYA Jewels — Bijoux artisanaux du Maroc"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Blend gradient on left edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.1) 30%, transparent 60%)",
            }}
          />
          {/* Bottom caption */}
          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1.5">
            <span className="text-cream-100 text-[8px] tracking-[0.5em] uppercase font-light opacity-70">
              Set Bijoux
            </span>
            <div className="w-10 h-px bg-gold-400 opacity-40" />
            <span className="text-cream-300 text-[7px] tracking-[0.35em] uppercase font-light opacity-45">
              Collection 2025
            </span>
          </div>
        </div>

        {/* MOBILE ONLY: small image strip below hero text */}
        <div className="lg:hidden relative h-56 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/set-bijoux.jpg"
            alt="NIYA Jewels Collection"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0.35) 0%, transparent 50%)" }}
          />
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-t border-charcoal-700 bg-charcoal-800 py-3 overflow-hidden">
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center flex-shrink-0">
              {MARQUEE_ITEMS.map((item, j) => (
                <span key={j} className="inline-flex items-center gap-6 mx-6">
                  <span className="text-gold-400 text-[9px] tracking-[0.4em] uppercase font-light whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-gold-600 text-[8px]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
