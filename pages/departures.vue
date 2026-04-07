<script setup lang="ts">
import type { Departure } from '../types/travel'
import { useFetch } from 'nuxt/app'

const { data: departures } = await useFetch<Departure[]>('../api/departures', {
  default: () => []
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Departures</h1>

    <div class="grid grid-3">
      <DepartureCard
        v-for="departure in departures"
        :key="departure.departureId"
        :departure="departure"
      />
    </div>
  </div>
</template>