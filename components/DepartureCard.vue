<script setup lang="ts">
import type { Departure } from '~/types/travel'

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

    <button style="margin-top:12px;padding:10px 16px;border:none;border-radius:8px;background:#2563eb;color:white;cursor:pointer;">
      Select Departure
    </button>
  </div>
</template>