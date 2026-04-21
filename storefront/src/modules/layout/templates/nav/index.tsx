import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Announcement bar */}
      <div className="bg-charcoal-800 text-cream-100 text-center py-2 px-4">
        <p className="text-[10px] tracking-[0.3em] uppercase font-light">
          ✦ Livraison offerte dès 5000 DA — Code : NIYA10 pour -10% ✦
        </p>
      </div>

      {/* Main navigation */}
      <header className="relative h-16 mx-auto border-b border-gold-200 duration-200 bg-cream-100">
        <nav className="content-container text-ui-fg-subtle flex items-center justify-between w-full h-full">
          {/* Left — burger menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          {/* Center — Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="group opacity-90 hover:opacity-100 transition-opacity duration-300"
              data-testid="nav-store-link"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/niya-logo.svg"
                alt="NIYA Jewels"
                width={160}
                height={46}
                className="h-10 w-auto"
              />
            </LocalizedClientLink>
          </div>

          {/* Right — Links + Cart */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full text-xs tracking-wider font-light">
              <LocalizedClientLink
                className="text-charcoal-600 hover:text-gold-500 transition-colors duration-200 uppercase tracking-wider"
                href="/store"
              >
                Boutique
              </LocalizedClientLink>
              <LocalizedClientLink
                className="text-charcoal-600 hover:text-gold-500 transition-colors duration-200 uppercase tracking-wider"
                href="/account"
                data-testid="nav-account-link"
              >
                Mon Compte
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-charcoal-600 hover:text-gold-500 transition-colors duration-200 flex gap-2 text-xs uppercase tracking-wider"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Panier (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}