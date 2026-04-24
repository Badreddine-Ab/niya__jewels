import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { ApiKey } from "../../.medusa/types/query-entry-points";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => ({
              currency_code: currency.currency_code,
              is_default: currency.is_default ?? false,
            })
          ),
        },
      };
    });
    return new WorkflowResponse(normalizedInput);
  }
);

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const countries = ["ma", "fr", "dz", "tn", "be", "ch"];

  logger.info("Seeding NIYA Jewels store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          { currency_code: "eur", is_default: true },
          { currency_code: "usd" },
        ] as any,
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });

  logger.info("Seeding region data...");
  let region = await container.resolve(Modules.REGION).listRegions({
    name: "France & Maghreb",
  });

  if (!region.length) {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "France & Maghreb",
            currency_code: "eur",
            countries,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = regionResult;
  }

  const regionData = region[0];
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "NIYA Jewels - Entrepôt Principal",
          address: {
            city: "Casablanca",
            country_code: "MA",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_location_id: stockLocation.id },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [{ name: "Profil d'expédition par défaut", type: "default" }],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Livraison NIYA Jewels",
    type: "shipping",
    service_zones: [
      {
        name: "France & Maghreb",
        geo_zones: countries.map((country_code) => ({
          country_code,
          type: "country" as const,
        })),
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Livraison Standard (5-7 jours)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Livraison en 5 à 7 jours ouvrés.",
          code: "standard",
        },
        prices: [
          { currency_code: "eur", amount: 8 },
          { currency_code: "usd", amount: 9 },
          { region_id: regionData.id, amount: 8 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Livraison Express (2-3 jours)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Livraison en 2 à 3 jours ouvrés.",
          code: "express",
        },
        prices: [
          { currency_code: "eur", amount: 15 },
          { currency_code: "usd", amount: 17 },
          { region_id: regionData.id, amount: 15 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [defaultSalesChannel[0].id] },
  });

  logger.info("Seeding publishable API key...");
  let publishableApiKey: ApiKey | null = null;
  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id", "token"],
    filters: { type: "publishable" },
  });
  publishableApiKey = data?.[0];

  if (!publishableApiKey) {
    const { result: [publishableApiKeyResult] } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "NIYA Jewels Boutique",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    });
    publishableApiKey = publishableApiKeyResult as ApiKey;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [defaultSalesChannel[0].id] },
  });
  logger.info(`Publishable API key: ${(publishableApiKey as any).token || publishableApiKey.id}`);

  logger.info("Seeding product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        { name: "Bagues", is_active: true },
        { name: "Colliers", is_active: true },
        { name: "Bracelets", is_active: true },
        { name: "Boucles d'oreilles", is_active: true },
        { name: "Sets & Parures", is_active: true },
      ],
    },
  });

  logger.info("Seeding collections...");
  const { result: collectionResult } = await createCollectionsWorkflow(container).run({
    input: {
      collections: [
        { title: "Collection Signature", handle: "signature" },
        { title: "Bijoux Dorés", handle: "dores" },
        { title: "Collection Minimaliste", handle: "minimaliste" },
      ],
    },
  });

  const signatureCollection = collectionResult.find((c) => c.handle === "signature");
  const doresCollection = collectionResult.find((c) => c.handle === "dores");
  const minimalisteCollection = collectionResult.find((c) => c.handle === "minimaliste");

  logger.info("Seeding jewelry products...");
  await createProductsWorkflow(container).run({
    input: {
      products: [
        // ── BAGUES ──
        {
          title: "Bague Lune Dorée",
          category_ids: [categoryResult.find((c) => c.name === "Bagues")!.id],
          collection_id: signatureCollection?.id,
          description:
            "Une bague délicate inspirée de la lune, ornée d'un croissant en laiton doré. Pièce artisanale unique, symbole de féminité et de mystère.",
          handle: "bague-lune-doree",
          weight: 15,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png" },
          ],
          options: [{ title: "Taille", values: ["50", "52", "54", "56", "58"] }],
          variants: ["50", "52", "54", "56", "58"].map((size) => ({
            title: `Taille ${size}`,
            sku: `BAGUE-LUNE-${size}`,
            options: { Taille: size },
            prices: [
              { amount: 2800, currency_code: "eur" },
              { amount: 3200, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Bague Torsadée Minimaliste",
          category_ids: [categoryResult.find((c) => c.name === "Bagues")!.id],
          collection_id: minimalisteCollection?.id,
          description:
            "Bague fine torsadée en laiton plaqué or. Design épuré et contemporain, parfaite pour un port quotidien ou une occasion spéciale.",
          handle: "bague-torsadee",
          weight: 10,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png" },
          ],
          options: [{ title: "Taille", values: ["50", "52", "54", "56", "58"] }],
          variants: ["50", "52", "54", "56", "58"].map((size) => ({
            title: `Taille ${size}`,
            sku: `BAGUE-TORSADEE-${size}`,
            options: { Taille: size },
            prices: [
              { amount: 2200, currency_code: "eur" },
              { amount: 2500, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // ── COLLIERS ──
        {
          title: "Collier Étoile Scintillante",
          category_ids: [categoryResult.find((c) => c.name === "Colliers")!.id],
          collection_id: signatureCollection?.id,
          description:
            "Collier délicat avec pendentif étoile serti de cristaux. Chaîne fine ajustable en laiton doré. Un bijou qui illumine chaque tenue.",
          handle: "collier-etoile",
          weight: 20,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png" },
          ],
          options: [{ title: "Longueur", values: ["40 cm", "45 cm", "50 cm"] }],
          variants: ["40 cm", "45 cm", "50 cm"].map((length) => ({
            title: length,
            sku: `COLLIER-ETOILE-${length.replace(" ", "")}`,
            options: { Longueur: length },
            prices: [
              { amount: 3500, currency_code: "eur" },
              { amount: 4000, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Collier Perles Naturelles",
          category_ids: [categoryResult.find((c) => c.name === "Colliers")!.id],
          collection_id: doresCollection?.id,
          description:
            "Collier élégant composé de perles naturelles de culture, terminé par un fermoir plaqué or. Un classique intemporel de la bijouterie.",
          handle: "collier-perles",
          weight: 35,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png" },
          ],
          options: [{ title: "Longueur", values: ["40 cm", "45 cm", "50 cm", "60 cm"] }],
          variants: ["40 cm", "45 cm", "50 cm", "60 cm"].map((length) => ({
            title: length,
            sku: `COLLIER-PERLES-${length.replace(" ", "")}`,
            options: { Longueur: length },
            prices: [
              { amount: 5800, currency_code: "eur" },
              { amount: 6500, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // ── BRACELETS ──
        {
          title: "Bracelet Chaîne Dorée Fine",
          category_ids: [categoryResult.find((c) => c.name === "Bracelets")!.id],
          collection_id: minimalisteCollection?.id,
          description:
            "Bracelet chaîne fine en laiton plaqué or. Fermoir à mousqueton réglable. Élégance minimaliste pour les amoureux du style discret.",
          handle: "bracelet-chaine-doree",
          weight: 12,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png" },
          ],
          options: [{ title: "Taille", values: ["16 cm", "17 cm", "18 cm", "19 cm"] }],
          variants: ["16 cm", "17 cm", "18 cm", "19 cm"].map((size) => ({
            title: size,
            sku: `BRACELET-CHAINE-${size.replace(" ", "")}`,
            options: { Taille: size },
            prices: [
              { amount: 2500, currency_code: "eur" },
              { amount: 2800, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Bracelet Jonc Gravé",
          category_ids: [categoryResult.find((c) => c.name === "Bracelets")!.id],
          collection_id: signatureCollection?.id,
          description:
            "Jonc ouvert en laiton doré, gravé de motifs floraux artisanaux. Peut être personnalisé avec un prénom ou un message.",
          handle: "bracelet-jonc-grave",
          weight: 28,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png" },
          ],
          options: [{ title: "Taille", values: ["Unique"] }],
          variants: [
            {
              title: "Taille Unique",
              sku: "BRACELET-JONC-UNIQUE",
              options: { Taille: "Unique" },
              prices: [
                { amount: 4200, currency_code: "eur" },
                { amount: 4800, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // ── BOUCLES D'OREILLES ──
        {
          title: "Boucles d'Oreilles Créoles Dorées",
          category_ids: [categoryResult.find((c) => c.name === "Boucles d'oreilles")!.id],
          collection_id: doresCollection?.id,
          description:
            "Créoles lisses en laiton plaqué or. Design classique et indémodable, disponibles en plusieurs diamètres. L'essentiel de chaque collection.",
          handle: "boucles-creoles-dorees",
          weight: 18,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png" },
          ],
          options: [{ title: "Diamètre", values: ["20 mm", "30 mm", "40 mm", "50 mm"] }],
          variants: ["20 mm", "30 mm", "40 mm", "50 mm"].map((size) => ({
            title: size,
            sku: `CREOLES-${size.replace(" ", "")}`,
            options: { "Diamètre": size },
            prices: [
              { amount: 2000, currency_code: "eur" },
              { amount: 2300, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Boucles d'Oreilles Pendantes Fleur",
          category_ids: [categoryResult.find((c) => c.name === "Boucles d'oreilles")!.id],
          collection_id: signatureCollection?.id,
          description:
            "Boucles d'oreilles pendantes en forme de fleur, ornées de petites perles nacrées. Légères et féminines, parfaites pour toutes les occasions.",
          handle: "boucles-pendantes-fleur",
          weight: 8,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png" },
          ],
          options: [{ title: "Taille", values: ["Unique"] }],
          variants: [
            {
              title: "Taille Unique",
              sku: "BOUCLES-FLEUR-UNIQUE",
              options: { Taille: "Unique" },
              prices: [
                { amount: 3200, currency_code: "eur" },
                { amount: 3600, currency_code: "usd" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // ── SETS ──
        {
          title: "Parure Complète — Collection Nuit Étoilée",
          category_ids: [categoryResult.find((c) => c.name === "Sets & Parures")!.id],
          collection_id: signatureCollection?.id,
          description:
            "Parure complète composée d'un collier étoile, de créoles assorties et d'un bracelet chaîne. Idéale en cadeau, livrée dans un coffret NIYA Jewels.",
          handle: "parure-nuit-etoilee",
          weight: 60,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            { url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png" },
          ],
          options: [{ title: "Taille (Bague)", values: ["50", "52", "54", "56"] }],
          variants: ["50", "52", "54", "56"].map((size) => ({
            title: `Bague Taille ${size}`,
            sku: `PARURE-ETOILEE-${size}`,
            options: { "Taille (Bague)": size },
            prices: [
              { amount: 8900, currency_code: "eur" },
              { amount: 9900, currency_code: "usd" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });

  logger.info("Seeding inventory levels...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = inventoryItems.map(
    (item) => ({
      location_id: stockLocation.id,
      stocked_quantity: 500,
      inventory_item_id: item.id,
    })
  );

  await createInventoryLevelsWorkflow(container).run({
    input: { inventory_levels: inventoryLevels },
  });

  logger.info("✅ NIYA Jewels seed data complete!");
  logger.info(`⚡ Publishable API Key ID: ${publishableApiKey.id}`);
}
