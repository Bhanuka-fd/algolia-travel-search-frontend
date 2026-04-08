<script setup lang="ts">
import type { Departure } from '~/types/travel'

defineProps<{
  departure: Departure
}>()
</script>

<template>
  <div class="card">
    <h3 class="card-title">{{ departure.productName }}</h3>

    <ul class="info-list">
      <li class="info-list-item"><strong>Departure ID:</strong> {{ departure.departureId }}</li>
      <li class="info-list-item"><strong>Dates:</strong> {{ departure.startDate }} to {{ departure.endDate }}</li>
      <li class="info-list-item"><strong>Price:</strong> ${{ departure.price }}</li>
      <li class="info-list-item"><strong>Availability:</strong> {{ departure.availability }}</li>
      <li class="info-list-item"><strong>Deal:</strong> {{ departure.deal ? 'Yes' : 'No' }}</li>
    </ul>

    <button class="cta-button">
      Select Departure
    </button>
  </div>
</template>