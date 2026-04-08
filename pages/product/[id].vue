<script setup lang="ts">
import { computed } from 'vue'
import { useFetch, useRoute } from '#app'
import type { Departure, Product } from '~/types/travel'

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
    <p class="page-lead">A closer look at product details and matching departures.</p>

    <div class="card meta-card">
      <ul class="info-list">
        <li class="info-list-item"><strong>Country:</strong> {{ product.country }}</li>
        <li class="info-list-item"><strong>Theme:</strong> {{ product.theme }}</li>
        <li class="info-list-item"><strong>Duration:</strong> {{ product.duration }} days</li>
        <li class="info-list-item"><strong>Base Price:</strong> ${{ product.basePrice }}</li>
        <li class="info-list-item"><strong>Rating:</strong> {{ product.rating }}</li>
        <li class="info-list-item"><strong>Total Departures:</strong> {{ product.departureCount }}</li>
      </ul>

      <button class="cta-button">
        Start Booking
      </button>
    </div>

    <h2 class="section-title">Related Departures</h2>
    <div class="grid grid-3">
      <DepartureCard
        v-for="departure in relatedDepartures"
        :key="departure.departureId"
        :departure="departure"
      />
    </div>
  </div>

  <div class="container" v-else>
    <div class="card state-card">
      <h1 class="page-title">Product not found</h1>
      <p class="page-lead">The product may have been removed or the link is incorrect.</p>
    </div>
  </div>
</template>