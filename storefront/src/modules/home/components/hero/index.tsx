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
    <section className="relative w-full overflow-hidden bg-cream-100">
      {/* Moroccan geometric texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(201,169,110,0.04) 0px, rgba(201,169,110,0.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(-45deg, rgba(201,169,110,0.04) 0px, rgba(201,169,110,0.04) 1px, transparent 1px, transparent 40px)
          `,
        }}
      />

      {/* Warm radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(201,169,110,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(201,169,110,0.06) 0%, transparent 40%)",
        }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-gold-300 opacity-60" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-gold-300 opacity-60" />
      <div className="absolute bottom-16 left-8 w-10 h-10 border-b-2 border-l-2 border-gold-300 opacity-60" />
      <div className="absolute bottom-16 right-8 w-10 h-10 border-b-2 border-r-2 border-gold-300 opacity-60" />

      {/* Side decorative lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
        <span
          className="text-gold-500 text-[9px] tracking-[0.4em] uppercase font-light"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Artisanat • Maroc
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
        <span
          className="text-gold-500 text-[9px] tracking-[0.4em] uppercase font-light"
          style={{ writingMode: "vertical-rl" }}
        >
          Collection 2025
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 py-24 md:py-32"
        style={{ minHeight: "92vh" }}
      >
        {/* Pre-header label */}
        <div className="flex items-center gap-4 mb-10 opacity-0 animate-[fade-in-top_0.6s_ease_0.1s_forwards]">
          <div className="w-8 h-px bg-gold-400" />
          <span className="text-gold-500 text-[9px] tracking-[0.5em] uppercase font-light">
            Collection Exclusive
          </span>
          <div className="w-8 h-px bg-gold-400" />
        </div>

        {/* Logo — the star */}
        <div className="opacity-0 animate-[fade-in-top_0.9s_ease_0.25s_forwards] mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/niya-logo.jpg"
            alt="NIYA Jewels"
            className="w-52 md:w-72 mx-auto"
          />
        </div>

        {/* Decorative separator */}
        <div className="flex items-center gap-5 mb-8 opacity-0 animate-[fade-in-top_0.8s_ease_0.4s_forwards]">
          <div className="w-14 h-px bg-gold-400 opacity-70" />
          <span className="text-gold-500 text-[9px]">◈</span>
          <div className="w-14 h-px bg-gold-400 opacity-70" />
        </div>

        {/* Editorial headline */}
        <h1
          className="text-center opacity-0 animate-[fade-in-top_0.9s_ease_0.5s_forwards] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          <span
            className="block text-charcoal-800"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            L&apos;Art des
          </span>
          <span
            className="block"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              lineHeight: 1.05,
              color: "#C9A96E",
              fontStyle: "italic",
            }}
          >
            Bijoux
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-charcoal-400 text-center font-light mb-10 opacity-0 animate-[fade-in-top_0.8s_ease_0.65s_forwards] max-w-sm"
          style={{ letterSpacing: "0.08em", fontSize: "0.8rem", lineHeight: 2 }}
        >
          Chaque pièce est une œuvre d&apos;art,
          <br />
          créée avec passion et authenticité au cœur du Maroc.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 opacity-0 animate-[fade-in-top_0.8s_ease_0.8s_forwards]">
          <LocalizedClientLink href="/store">
            <button className="group relative px-12 py-4 bg-charcoal-800 text-cream-100 overflow-hidden transition-all duration-500 hover:bg-charcoal-700 min-w-[220px]">
              <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-light">
                Découvrir la boutique
              </span>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gold-400 group-hover:w-full transition-all duration-500" />
            </button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections">
            <button className="px-12 py-4 border border-gold-500 text-gold-600 transition-all duration-300 hover:bg-gold-500 hover:text-cream-50 min-w-[220px]">
              <span className="text-[10px] tracking-[0.4em] uppercase font-light">
                Nos collections
              </span>
            </button>
          </LocalizedClientLink>
        </div>

        {/* Scroll hint */}
        <div className="mt-14 opacity-0 animate-[fade-in-top_0.8s_ease_1s_forwards] flex flex-col items-center gap-2">
          <span className="text-charcoal-300 text-[8px] tracking-[0.4em] uppercase">Découvrir</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold-400 to-transparent animate-[gold-pulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-t border-gold-200 bg-charcoal-800 py-3 overflow-hidden">
        <div
          className="flex animate-marquee"
          style={{ width: "max-content" }}
        >
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
