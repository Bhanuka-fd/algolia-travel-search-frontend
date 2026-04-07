<script setup lang="ts">
import { computed } from 'vue'
import { useFetch, useRoute } from 'nuxt/app'
import type { Departure, Product } from '../../types/travel'

const route = useRoute()

const { data: products } = await useFetch<Product[]>('/api/products', {
  default: () => []
})
const { data: departures } = await useFetch<Departure[]>('/api/departures', {
  default: () => []
})

const product = computed(() =>
  products.value.find((item) => item.productId === route.params.id)
)

const relatedDepartures = computed(() =>
  departures.value.filter((item) => item.productId === route.params.id)
)
</script>

<template>
  <div class="container" v-if="product">
    <h1 class="page-title">{{ product.name }}</h1>

    <div class="card" style="margin-bottom:20px;">
      <p><strong>Country:</strong> {{ product.country }}</p>
      <p><strong>Theme:</strong> {{ product.theme }}</p>
      <p><strong>Duration:</strong> {{ product.duration }} days</p>
      <p><strong>Base Price:</strong> ${{ product.basePrice }}</p>
    </div>

    <h2>Related Departures</h2>
    <div class="grid grid-3">
      <DepartureCard
        v-for="departure in relatedDepartures"
        :key="departure.departureId"
        :departure="departure"
      />
    </div>
  </div>
</template>