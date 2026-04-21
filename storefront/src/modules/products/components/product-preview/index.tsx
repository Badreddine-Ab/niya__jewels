import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div data-testid="product-wrapper" className="flex flex-col gap-4">
        {/* Image container */}
        <div className="relative overflow-hidden bg-cream-200 aspect-[3/4]">
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/10 transition-all duration-500" />
          {/* Quick view indicator */}
          <div className="absolute bottom-0 left-0 right-0 bg-charcoal-800/90 text-cream-100 py-2.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light">
              Voir le produit
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-1.5 px-1">
          <h3
            className="text-charcoal-700 group-hover:text-gold-600 transition-colors duration-200 font-light leading-snug"
            style={{ fontSize: "0.85rem", letterSpacing: "0.03em" }}
            data-testid="product-title"
          >
            {product.title}
          </h3>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && (
              <span className="text-gold-600 text-sm font-light tracking-wider">
                <PreviewPrice price={cheapestPrice} />
              </span>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}