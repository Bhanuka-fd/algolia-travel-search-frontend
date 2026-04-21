export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    algoliaAdminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    public: {
      amplitudeApiKey: process.env.NUXT_PUBLIC_AMPLITUDE_API_KEY,
      algoliaAppId: process.env.ALGOLIA_APP_ID,
      algoliaSearchApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
      algoliaProductIndex: process.env.ALGOLIA_PRODUCT_INDEX,
      algoliaDepartureIndex: process.env.ALGOLIA_DEPARTURE_INDEX
    }
  }
})