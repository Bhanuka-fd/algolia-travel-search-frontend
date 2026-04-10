<script setup lang="ts">
import type { Product } from '~/types/travel'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="card">
    <h3 class="card-title">{{ product.name }}</h3>

    <ul class="info-list">
      <li class="info-list-item"><strong>Country:</strong> {{ product.country }}</li>
      <li class="info-list-item"><strong>Theme:</strong> {{ product.theme }}</li>
      <li class="info-list-item"><strong>Duration:</strong> {{ product.duration }} days</li>
      <li class="info-list-item"><strong>Base Price:</strong> ${{ product.basePrice }}</li>
      <li class="info-list-item"><strong>Departures:</strong> {{ product.departureCount }}</li>
    </ul>
  </div>
</template>