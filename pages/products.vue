<script setup lang="ts">
import { useFetch } from '#app'
import type { Product } from '~/types/travel'

const nuxtApp = useNuxtApp()

function testAmplitude() {
    nuxtApp.$amplitude.track({
        event_type: 'Test Event',
        event_properties: {
            source: 'nuxt_app',
            test: true,
        }
    })
}

const { data: products } = await useFetch<Product[]>('../api/products', {
  default: () => []
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Products</h1>
    <p class="page-lead">Browse travel products and open any card for detailed departures.</p>

    <div class="grid grid-3">
      <NuxtLink
        v-for="product in products"
        :key="product.productId"
        :to="`/product/${product.productId}`"
      >
        <ProductCard :product="product" />
      </NuxtLink>
    </div>

    <button @click="testAmplitude">send test events</button>
  </div>
</template>