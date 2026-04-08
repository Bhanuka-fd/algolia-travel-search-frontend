<script setup lang="ts">
import { useFetch } from '#app'
import type { Departure } from '~/types/travel'

const { data: departures } = await useFetch<Departure[]>('../api/departures', {
  default: () => []
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Departures</h1>
    <p class="page-lead">Inspect date-level inventory, price, and current deal visibility.</p>

    <div class="grid grid-3">
      <DepartureCard
        v-for="departure in departures"
        :key="departure.departureId"
        :departure="departure"
      />
    </div>
  </div>
</template>