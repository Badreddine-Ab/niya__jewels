"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="text-charcoal-600 hover:text-gold-500 transition-colors duration-200 text-xs uppercase tracking-wider font-light flex gap-2"
            href="/cart"
            data-testid="nav-cart-link"
          >
            {`Panier (${totalItems})`}
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-cream-100 border border-gold-200 w-[400px] text-charcoal-800 shadow-lg"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-5 flex items-center justify-between border-b border-gold-200">
              <h3
                className="text-charcoal-800 font-light tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
              >
                Mon Panier
              </h3>
              {totalItems > 0 && (
                <span className="text-gold-500 text-xs tracking-wider font-light">
                  {totalItems} article{totalItems > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[380px] px-5 grid grid-cols-1 gap-y-6 no-scrollbar py-4">
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        className="grid grid-cols-[90px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink href={`/products/${item.product_handle}`}>
                          <div className="w-full aspect-square overflow-hidden bg-cream-200">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </div>
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col mr-4">
                                <h3 className="text-charcoal-700 text-xs font-light leading-relaxed">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  className="text-charcoal-400 text-xs font-light mt-1"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Qté : {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-2 text-xs text-charcoal-400 hover:text-gold-500 transition-colors"
                            data-testid="cart-item-remove-button"
                          >
                            Supprimer
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="p-5 flex flex-col gap-y-4 border-t border-gold-200">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-600 text-xs font-light tracking-wider uppercase">
                      Sous-total
                    </span>
                    <span
                      className="text-charcoal-800 text-sm font-light"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <button
                      className="w-full py-3 bg-charcoal-800 text-cream-100 text-xs tracking-[0.3em] uppercase font-light hover:bg-charcoal-700 transition-colors duration-200"
                      data-testid="go-to-cart-button"
                    >
                      Voir mon panier
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex py-16 flex-col gap-y-5 items-center justify-center px-5">
                <span className="text-gold-400 text-2xl">◇</span>
                <p className="text-charcoal-500 text-sm font-light tracking-wider">
                  Votre panier est vide
                </p>
                <LocalizedClientLink href="/store">
                  <button
                    onClick={close}
                    className="px-6 py-2.5 border border-charcoal-800 text-charcoal-800 text-xs tracking-[0.25em] uppercase font-light hover:bg-charcoal-800 hover:text-cream-100 transition-all duration-200"
                  >
                    Découvrir nos bijoux
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown