<script setup lang="ts">
const route = useRoute()

const { data: products } = await useFetch('/api/products')
const { data: departures } = await useFetch('/api/departures')

const product = computed(() =>
  products.value?.find((item: any) => item.productId === route.params.id)
)

const relatedDepartures = computed(() =>
  departures.value?.filter((item: any) => item.productId === route.params.id) || []
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
      <p><strong>Rating:</strong> {{ product.rating }}</p>
      <p><strong>Total Departures:</strong> {{ product.departureCount }}</p>

      <button style="margin-top:12px;padding:10px 16px;border:none;border-radius:8px;background:#111827;color:white;cursor:pointer;">
        Start Booking
      </button>
    </div>

    <h2 style="margin-bottom:16px;">Related Departures</h2>
    <div class="grid grid-3">
      <DepartureCard
        v-for="departure in relatedDepartures"
        :key="departure.departureId"
        :departure="departure"
      />
    </div>
  </div>

  <div class="container" v-else>
    <h1 class="page-title">Product not found</h1>
  </div>
</template>