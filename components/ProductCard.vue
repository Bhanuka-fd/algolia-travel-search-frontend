<script setup lang="ts">
import type { Product } from '../types/travel'

defineProps<{
  product: Product
}>()
</script>

<template>
  <NuxtLink :to="`/product/${product.productId}`" class="card" style="display:block;">
    <h3>{{ product.name }}</h3>
    <p><strong>Country:</strong> {{ product.country }}</p>
    <p><strong>Theme:</strong> {{ product.theme }}</p>
    <p><strong>Duration:</strong> {{ product.duration }} days</p>
    <p><strong>Base Price:</strong> ${{ product.basePrice }}</p>
    <p><strong>Departures:</strong> {{ product.departureCount }}</p>
  </NuxtLink>
</template>