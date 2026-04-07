<script setup lang="ts">
import type { Departure } from '../types/travel'

defineProps<{
  departure: Departure
}>()
</script>

<template>
  <div class="card">
    <h3>{{ departure.productName }}</h3>
    <p><strong>Departure ID:</strong> {{ departure.departureId }}</p>
    <p><strong>Dates:</strong> {{ departure.startDate }} to {{ departure.endDate }}</p>
    <p><strong>Price:</strong> ${{ departure.price }}</p>
    <p><strong>Availability:</strong> {{ departure.availability }}</p>
    <p><strong>Deal:</strong> {{ departure.deal ? 'Yes' : 'No' }}</p>
  </div>
</template>