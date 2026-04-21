import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-gold-200 w-full bg-charcoal-800 text-cream-200">
      {/* Main footer content */}
      <div className="content-container">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-20">
          {/* Brand column */}
          <div className="flex flex-col gap-6 max-w-xs">
            <div>
              <span
                className="text-cream-100"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  letterSpacing: "0.2em",
                }}
              >
                NIYA
              </span>
              <span
                className="block text-gold-400 text-[9px] tracking-[0.5em] uppercase -mt-1"
              >
                Jewels
              </span>
            </div>
            <div className="w-8 h-px bg-gold-500" />
            <p className="text-cream-400 text-xs leading-relaxed font-light tracking-wide">
              Bijoux artisanaux créés avec passion et authenticité.
              Chaque pièce est unique, imaginée pour sublimer votre beauté naturelle.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.instagram.com/niya__jewels"
                target="_blank"
                rel="noreferrer"
                className="text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs tracking-widest uppercase font-light"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-light">
                  Catégories
                </span>
                <ul
                  className="grid grid-cols-1 gap-3"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs font-light tracking-wider",
                            children && "text-cream-200"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs font-light"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-light">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-3">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs font-light tracking-wider"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-4">
              <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-light">
                Informations
              </span>
              <ul className="grid grid-cols-1 gap-3">
                <li>
                  <LocalizedClientLink
                    className="text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs font-light tracking-wider"
                    href="/account"
                  >
                    Mon Compte
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs font-light tracking-wider"
                    href="/store"
                  >
                    Boutique
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/niya__jewels"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream-400 hover:text-gold-400 transition-colors duration-200 text-xs font-light tracking-wider"
                  >
                    Nous Contacter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap w-full py-6 border-t border-charcoal-700 justify-between items-center gap-4">
          <Text className="text-charcoal-400 text-xs font-light tracking-wider">
            © {new Date().getFullYear()} NIYA Jewels — Tous droits réservés
          </Text>
          <p className="text-charcoal-500 text-xs font-light tracking-wider">
            Fait avec ✦ au Maroc
          </p>
        </div>
      </div>
    </footer>
  )
}
