<script setup lang="ts">
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import aa from 'search-insights'
const config = useRuntimeConfig()

const searchClient = algoliasearch(
  config.public.algoliaAppId,
  config.public.algoliaSearchApiKey
)

function handleProductClick(item: any) {
  console.log('PRODUCT CLICK')
  console.log('objectID:', item.objectID)
  console.log('queryID:', item.__queryID)
  console.log('position:', item.__position)
  console.log('name:', item.name)

  aa('clickedObjectIDsAfterSearch', {
    eventName: 'Product Result Clicked',
    index: config.public.algoliaProductIndex,
    objectIDs: [item.objectID],
    positions: [item.__position],
    queryID: item.__queryID
  })
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">Product Search</h1>

    <div class="card" style="margin-bottom: 20px;">
      <p><strong>App ID:</strong> {{ config.public.algoliaAppId }}</p>
      <p><strong>Index:</strong> {{ config.public.algoliaProductIndex }}</p>
    </div>

    <ais-instant-search
      :search-client="searchClient"
      :index-name="config.public.algoliaProductIndex"
    >
      <ais-configure :click-analytics.camel="true" :hits-per-page.camel="10" />

      <div class="card" style="margin-bottom: 20px;">
        <ais-search-box />
      </div>

      <div style="display:grid; grid-template-columns: 250px 1fr; gap: 20px;">
        <div class="card">
          <h3>Filters</h3>

          <div style="margin-bottom: 20px;">
            <h4>Country</h4>
            <ais-refinement-list attribute="country" />
          </div>

          <div>
            <h4>Theme</h4>
            <ais-refinement-list attribute="theme" />
          </div>
        </div>

        <div>
          

          <ais-hits>
            <template #item="{ item }">
                <div>
                    <div @click="handleProductClick(item)">
                    <NuxtLink
                        :to="`/product/${item.productId}?queryID=${item.__queryID}&objectID=${item.objectID}&position=${item.__position}`"
                        style="display:block;"
                    >
                        <ProductCard :product="item" />
                    </NuxtLink>
                    </div>

                    <div style="margin:8px 0 24px; font-size: 12px; color: #666;">
                    queryID: {{ item.__queryID }} | position: {{ item.__position }}
                    </div>
                </div>
                </template>
          </ais-hits>
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>