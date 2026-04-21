import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-16 small:py-24">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="text-gold-500 text-[10px] tracking-[0.4em] uppercase mb-3 font-light">
          Collection
        </span>
        <h2
          className="text-charcoal-800 mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          {collection.title}
        </h2>
        <div className="w-10 h-px bg-gold-400 mb-6" />
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          className="text-charcoal-600 hover:text-gold-500 transition-colors duration-200 text-xs tracking-[0.25em] uppercase font-light border-b border-transparent hover:border-gold-400 pb-0.5"
        >
          Voir tout →
        </LocalizedClientLink>
      </div>

      {/* Product grid */}
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-16 small:gap-y-24">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}