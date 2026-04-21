import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-cream-100">
      {/* Main hero - full viewport height */}
      <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 80%, rgba(201,169,110,0.05) 0%, transparent 40%)
            `,
            backgroundColor: "#FAF7F2",
          }}
        />

        {/* Decorative line - left */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
          <span className="text-gold-500 text-[10px] tracking-[0.3em] uppercase rotate-90 whitespace-nowrap my-4">
            Bijoux Artisanaux
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Decorative line - right */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
          <span className="text-gold-500 text-[10px] tracking-[0.3em] uppercase rotate-90 whitespace-nowrap my-4">
            Fait avec Amour
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Center content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Brand tagline */}
          <p className="text-gold-500 text-xs tracking-[0.4em] uppercase mb-8 font-light">
            ✦ Collection Exclusive ✦
          </p>

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/niya-logo.svg"
            alt="NIYA Jewels"
            className="w-64 md:w-80 mx-auto mb-8"
          />

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gold-400" />
            <span className="text-gold-500 text-xs tracking-[0.4em] uppercase">Maroc</span>
            <div className="w-16 h-px bg-gold-400" />
          </div>

          {/* Description */}
          <p
            className="text-charcoal-500 font-light leading-relaxed mb-10 max-w-md mx-auto"
            style={{ letterSpacing: "0.05em", fontSize: "0.95rem" }}
          >
            Bijoux artisanaux créés avec passion.<br />
            Chaque pièce raconte une histoire unique.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LocalizedClientLink href="/store">
              <button className="group relative px-10 py-3.5 bg-charcoal-800 text-cream-100 overflow-hidden transition-all duration-300 hover:bg-charcoal-700">
                <span className="relative z-10 text-xs tracking-[0.3em] uppercase font-light">
                  Découvrir la boutique
                </span>
              </button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/collections">
              <button className="group px-10 py-3.5 border border-gold-500 text-gold-600 transition-all duration-300 hover:bg-gold-500 hover:text-cream-50">
                <span className="text-xs tracking-[0.3em] uppercase font-light">
                  Nos collections
                </span>
              </button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold-300 opacity-60" />
        <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold-300 opacity-60" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold-300 opacity-60" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold-300 opacity-60" />
      </div>

      {/* Feature strip */}
      <div className="border-t border-b border-gold-200 bg-white py-4">
        <div className="content-container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: "✦", text: "Livraison Gratuite dès 5000 DA" },
              { icon: "◈", text: "Pièces Uniques & Artisanales" },
              { icon: "✧", text: "Matériaux de Qualité Supérieure" },
              { icon: "◇", text: "Satisfaite ou Remboursée" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-gold-500 text-sm">{item.icon}</span>
                <span className="text-charcoal-600 text-xs tracking-wider uppercase font-light">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero