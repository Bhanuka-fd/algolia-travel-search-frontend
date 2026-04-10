import { defineNuxtPlugin } from '#app'
import aa from 'search-insights'

export default defineNuxtPlugin(() => {
  aa('init', {
    appId: useRuntimeConfig().public.algoliaAppId,
    apiKey: useRuntimeConfig().public.algoliaSearchApiKey,
    useCookie: true
  })
})