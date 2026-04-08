export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    algoliaAdminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    public: {
      algoliaAppId: process.env.ALGOLIA_APP_ID,
      algoliaSearchApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
      algoliaProductIndex: process.env.ALGOLIA_PRODUCT_INDEX,
      algoliaDepartureIndex: process.env.ALGOLIA_DEPARTURE_INDEX
    }
  }
})