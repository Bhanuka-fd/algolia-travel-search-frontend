<script setup lang="ts">
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import aa from 'search-insights'
const config = useRuntimeConfig()

const searchClient = algoliasearch(
  config.public.algoliaAppId,
  config.public.algoliaSearchApiKey
)

function handleDepartureClick(item: any) {
  console.log('DEPARTURE CLICK')
  console.log('objectID:', item.objectID)
  console.log('queryID:', item.__queryID)
  console.log('position:', item.__position)
  console.log('departureId:', item.departureId)
  console.log('productName:', item.productName)

  aa('clickedObjectIDsAfterSearch', {
    eventName: 'Departure Result Clicked',
    index: config.public.algoliaDepartureIndex,
    objectIDs: [item.objectID],
    positions: [item.__position],
    queryID: item.__queryID
  })
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">Departure Search</h1>

    <div class="card" style="margin-bottom: 20px;">
      <p><strong>App ID:</strong> {{ config.public.algoliaAppId }}</p>
      <p><strong>Index:</strong> {{ config.public.algoliaDepartureIndex }}</p>
    </div>

    <ais-instant-search
      :search-client="searchClient"
      :index-name="config.public.algoliaDepartureIndex"
    >
      <ais-configure
        :click-analytics.camel="true"
        :hits-per-page.camel="10"
        />

      <div class="card" style="margin-bottom: 20px;">
        <ais-search-box />
      </div>

      <div style="display:grid; grid-template-columns: 250px 1fr; gap: 20px;">
        <div class="card">
          <h3>Filters</h3>

          <div>
            <h4>Deal</h4>
            <ais-refinement-list attribute="deal" />
          </div>
        </div>

        <div>
         
        <div>
          <div class="card" style="margin-bottom: 20px;">
            <ais-stats />
          </div>
          <ais-hits>
            <template #item="{ item }">
                <div>
                <NuxtLink
                    :to="`/departure/${item.departureId}?queryID=${item.__queryID}&objectID=${item.objectID}&position=${item.__position}`"
                    style="display:block;"
                    @click="handleDepartureClick(item)"
                >
                    <DepartureCard :departure="item" />
                </NuxtLink>

                <div style="margin:8px 0 24px; font-size: 12px; color: #666;">
                    queryID: {{ item.__queryID }} | position: {{ item.__position }}
                </div>
                </div>
            </template>
         </ais-hits>
        </div>
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>