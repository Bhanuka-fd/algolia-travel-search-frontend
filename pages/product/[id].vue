<script setup lang="ts">
import { computed } from 'vue'
import { useFetch, useRoute } from '#app'
import type { Departure, Product } from '~/types/travel'
import aa from 'search-insights'

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

const queryID = computed(() => route.query.queryID || '')
const objectID = computed(() => route.query.objectID || '')
const position = computed(() => route.query.position || '')

function handleStartBooking() {
  console.log('CONVERSION EVENT')
  console.log('productId:', route.params.id)
  console.log('objectID:', objectID.value)
  console.log('queryID:', queryID.value)
  console.log('position:', position.value)
  console.log('event:', 'Start Booking')

  if (objectID.value && queryID.value) {
    aa('convertedObjectIDsAfterSearch', {
      eventName: 'Product Booking Started',
      index: useRuntimeConfig().public.algoliaProductIndex,
      objectIDs: [String(objectID.value)],
      queryID: String(queryID.value)
    })
  }
}

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

      <hr style="margin:16px 0;" />

      <p><strong>queryID:</strong> {{ queryID }}</p>
      <p><strong>objectID:</strong> {{ objectID }}</p>
      <p><strong>position:</strong> {{ position }}</p>

      <button @click="handleStartBooking" class="cta-button">
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