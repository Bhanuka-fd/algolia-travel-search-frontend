<script setup lang="ts">
import aa from 'search-insights'
const route = useRoute()

const { data: departures } = await useFetch('/api/departures')

const departure = computed(() =>
  departures.value?.find((item: any) => item.departureId === route.params.id)
)

const queryID = computed(() => route.query.queryID || '')
const objectID = computed(() => route.query.objectID || '')
const position = computed(() => route.query.position || '')

function handleDepartureBooking() {
  console.log('DEPARTURE CONVERSION EVENT')
  console.log('departureId:', route.params.id)
  console.log('objectID:', objectID.value)
  console.log('queryID:', queryID.value)
  console.log('position:', position.value)
  console.log('event:', 'Select Departure / Start Booking')

  if (objectID.value && queryID.value) {
    aa('convertedObjectIDsAfterSearch', {
      eventName: 'Departure Booking Started',
      index: useRuntimeConfig().public.algoliaDepartureIndex,
      objectIDs: [String(objectID.value)],
      queryID: String(queryID.value)
    })
  }
}
</script>

<template>
  <div class="container" v-if="departure">
    <h1 class="page-title">{{ departure.productName }}</h1>

    <div class="card" style="margin-bottom:20px;">
      <p><strong>Departure ID:</strong> {{ departure.departureId }}</p>
      <p><strong>Dates:</strong> {{ departure.startDate }} to {{ departure.endDate }}</p>
      <p><strong>Price:</strong> ${{ departure.price }}</p>
      <p><strong>Availability:</strong> {{ departure.availability }}</p>
      <p><strong>Deal:</strong> {{ departure.deal ? 'Yes' : 'No' }}</p>

      <hr style="margin:16px 0;" />

      <p><strong>queryID:</strong> {{ queryID }}</p>
      <p><strong>objectID:</strong> {{ objectID }}</p>
      <p><strong>position:</strong> {{ position }}</p>

      <button
        @click="handleDepartureBooking"
        style="margin-top:12px;padding:10px 16px;border:none;border-radius:8px;background:#2563eb;color:white;cursor:pointer;"
      >
        Confirm Departure
      </button>
    </div>
  </div>

  <div class="container" v-else>
    <h1 class="page-title">Departure not found</h1>
  </div>
</template>