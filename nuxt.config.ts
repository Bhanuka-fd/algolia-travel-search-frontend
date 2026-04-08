import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [fileURLToPath(new URL('./assets/css/main.css', import.meta.url))],

  modules: ['@nuxtjs/algolia'],

  algolia: {
    applicationId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    instantSearch: true,
  },

  runtimeConfig: {
    algoliaAdminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    public: {
      algoliaAppId: process.env.ALGOLIA_APP_ID,
      algoliaSearchApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
      algoliaProductsIndex: process.env.ALGOLIA_PRODUCT_INDEX || 'travel_products',
      algoliaDeparturesIndex: process.env.ALGOLIA_DEPARTURE_INDEX || 'travel_departures',
    }
  }
})