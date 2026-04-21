"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

const SideMenuItems = {
  "Accueil": "/",
  "Boutique": "/store",
  "Mon Compte": "/account",
  "Panier": "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none text-charcoal-600 hover:text-gold-500 text-xs tracking-widest uppercase font-light"
                >
                  Menu
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-charcoal-900/20 backdrop-blur-sm pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-4"
              >
                <PopoverPanel className="flex flex-col absolute w-full sm:w-80 h-screen z-[51] inset-x-0 top-0">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-cream-100 justify-between p-8 border-r border-gold-200"
                  >
                    {/* Header */}
                    <div>
                      <div className="flex justify-between items-center mb-12">
                        <span
                          className="text-charcoal-800"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.5rem",
                            fontWeight: 300,
                            letterSpacing: "0.2em",
                          }}
                        >
                          NIYA
                        </span>
                        <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="text-charcoal-500 hover:text-charcoal-800 transition-colors"
                        >
                          <XMark />
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="w-8 h-px bg-gold-400 mb-10" />

                      {/* Nav items */}
                      <ul className="flex flex-col gap-6 items-start">
                        {Object.entries(SideMenuItems).map(([name, href]) => (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-charcoal-700 hover:text-gold-500 transition-colors duration-200 font-light tracking-wider uppercase text-sm"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer of menu */}
                    <div className="flex flex-col gap-y-5">
                      <div className="w-8 h-px bg-gold-400 mb-2" />

                      {!!locales?.length && (
                        <div
                          className="flex justify-between items-center text-charcoal-500 hover:text-charcoal-800 transition-colors cursor-pointer"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}

                      <div
                        className="flex justify-between items-center text-charcoal-500 hover:text-charcoal-800 transition-colors cursor-pointer"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      <Text className="text-charcoal-400 text-xs tracking-wider font-light">
                        © {new Date().getFullYear()} NIYA Jewels
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu