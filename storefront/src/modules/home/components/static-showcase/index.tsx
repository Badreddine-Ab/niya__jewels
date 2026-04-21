import LocalizedClientLink from "@modules/common/components/localized-client-link"

const TEST_PRODUCTS = [
  {
    id: 1,
    name: "Bague Croissant Dorée",
    category: "Bagues",
    price: "890 MAD",
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: 2,
    name: "Collier Étoile Filigrané",
    category: "Colliers",
    price: "1 290 MAD",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: 3,
    name: "Créoles Dorées 30mm",
    category: "Boucles d'oreilles",
    price: "680 MAD",
    badge: null,
    image: "https://images.unsplash.com/photo-1573408301185-9519f93f43b9?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: 4,
    name: "Bracelet Chaîne Fine",
    category: "Bracelets",
    price: "750 MAD",
    badge: null,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: 5,
    name: "Bague Torsadée",
    category: "Bagues",
    price: "990 MAD",
    badge: "Exclusif",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: 6,
    name: "Collier Perles Vénitiennes",
    category: "Colliers",
    price: "1 490 MAD",
    badge: null,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=750&fit=crop&auto=format&q=80",
  },
]

export default function StaticShowcase() {
  return (
    <section className="bg-cream-100 py-24 px-6">
      <div className="content-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-[9px] tracking-[0.5em] uppercase font-light">
            Sélection
          </span>
          <h2
            className="mt-4 mb-5 text-charcoal-800"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
          >
            Nos Créations
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold-400" />
            <span className="text-gold-500 text-xs">◈</span>
            <div className="w-12 h-px bg-gold-400" />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TEST_PRODUCTS.map((product) => (
            <LocalizedClientLink
              key={product.id}
              href="/store"
              className="group block"
            >
              <div className="flex flex-col gap-3">
                {/* Image container */}
                <div className="relative overflow-hidden aspect-[3/4] bg-cream-200">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-charcoal-800 text-cream-100 text-[8px] tracking-[0.3em] uppercase font-light px-2.5 py-1.5">
                      {product.badge}
                    </div>
                  )}

                  {/* Product image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end pb-5 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(26,26,26,0.65) 0%, transparent 55%)",
                    }}
                  >
                    <span className="text-cream-100 text-[9px] tracking-[0.4em] uppercase font-light border-b border-gold-400 pb-0.5">
                      Voir le produit
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="flex flex-col gap-1 px-1">
                  <span className="text-charcoal-300 text-[9px] tracking-[0.3em] uppercase font-light">
                    {product.category}
                  </span>
                  <h3
                    className="text-charcoal-700 group-hover:text-gold-600 transition-colors duration-300 font-light leading-snug"
                    style={{ fontSize: "0.82rem", letterSpacing: "0.03em" }}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="text-gold-500 font-light mt-0.5"
                    style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
                  >
                    {product.price}
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-14">
          <LocalizedClientLink href="/store">
            <button className="group relative px-14 py-4 border border-charcoal-700 text-charcoal-700 hover:bg-charcoal-800 hover:text-cream-100 transition-all duration-400 overflow-hidden">
              <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-light">
                Voir toute la collection
              </span>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gold-400 group-hover:w-full transition-all duration-500" />
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
