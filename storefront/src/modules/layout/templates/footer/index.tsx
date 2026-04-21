import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" }).catch(() => ({ collections: [], count: 0 }))
  const productCategories = await listCategories().catch(() => [])

  return (
    <footer className="bg-charcoal-800 text-cream-200 border-t border-charcoal-700">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-600 to-transparent opacity-40" />

      <div className="content-container">
        <div className="flex flex-col gap-y-14 xsmall:flex-row items-start justify-between py-20">
          {/* Brand column */}
          <div className="flex flex-col gap-6 max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/niya-logo.svg"
              alt="NIYA Jewels"
              className="h-16 w-auto brightness-0 invert opacity-75"
            />
            <div className="w-7 h-px bg-gold-600" />
            <p className="text-charcoal-300 text-xs leading-relaxed font-light tracking-wide">
              Bijoux artisanaux créés avec passion et authenticité.
              <br />
              Chaque pièce est unique, imaginée pour sublimer votre beauté.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/niya__jewels"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-charcoal-400 hover:text-gold-400 transition-colors duration-200 group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="text-[9px] tracking-[0.3em] uppercase font-light">Instagram</span>
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-10">
            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-gold-500 text-[9px] tracking-[0.4em] uppercase font-light">
                  Catégories
                </span>
                <ul className="grid grid-cols-1 gap-3" data-testid="footer-categories">
                  {productCategories.slice(0, 6).map((c) => {
                    if (c.parent_category) return null
                    const children = c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null

                    return (
                      <li className="flex flex-col gap-2" key={c.id}>
                        <LocalizedClientLink
                          className={clx(
                            "text-charcoal-300 hover:text-gold-400 transition-colors duration-200 text-[10px] font-light tracking-wider",
                            children && "text-cream-300"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3 grid grid-cols-1 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="text-charcoal-400 hover:text-gold-400 transition-colors duration-200 text-[10px] font-light"
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
                <span className="text-gold-500 text-[9px] tracking-[0.4em] uppercase font-light">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-3">
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-charcoal-300 hover:text-gold-400 transition-colors duration-200 text-[10px] font-light tracking-wider"
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
              <span className="text-gold-500 text-[9px] tracking-[0.4em] uppercase font-light">
                Informations
              </span>
              <ul className="grid grid-cols-1 gap-3">
                {[
                  { label: "Mon Compte", href: "/account" },
                  { label: "Boutique", href: "/store" },
                  { label: "Collections", href: "/collections" },
                ].map((link) => (
                  <li key={link.href}>
                    <LocalizedClientLink
                      className="text-charcoal-300 hover:text-gold-400 transition-colors duration-200 text-[10px] font-light tracking-wider"
                      href={link.href}
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.instagram.com/niya__jewels"
                    target="_blank"
                    rel="noreferrer"
                    className="text-charcoal-300 hover:text-gold-400 transition-colors duration-200 text-[10px] font-light tracking-wider"
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
          <Text className="text-charcoal-500 text-[10px] font-light tracking-wider">
            © {new Date().getFullYear()} NIYA Jewels · Tous droits réservés
          </Text>
          <p className="text-charcoal-500 text-[10px] font-light tracking-wider flex items-center gap-2">
            <span className="text-gold-600">◈</span>
            Fait avec passion au Maroc
          </p>
        </div>
      </div>
    </footer>
  )
}
