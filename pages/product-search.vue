<script setup lang="ts">
import { liteClient as algoliasearch } from 'algoliasearch/lite'

const config = useRuntimeConfig()

const searchClient = algoliasearch(
  config.public.algoliaAppId,
  config.public.algoliaSearchApiKey
)
</script>

<template>
  <div class="container">
    <h1 class="page-title">Product Search</h1>
    <p class="page-lead">Search across destinations and compare relevance at product level.</p>

    <div class="card search-meta-card meta-card">
      <p><strong>App ID:</strong> {{ config.public.algoliaAppId }}</p>
      <p><strong>Index:</strong> {{ config.public.algoliaProductIndex }}</p>
    </div>

    <ais-instant-search
      :search-client="searchClient"
      :index-name="config.public.algoliaProductIndex"
    >
      <div class="card search-controls-card">
        <div class="search-meta-row">
          <p class="search-index-label">
            Searching index:
            <span class="search-index-badge">{{ config.public.algoliaProductIndex }}</span>
          </p>

          <ais-stats>
            <template #default="{ nbHits }">
              <p class="search-stats">{{ nbHits }} results</p>
            </template>
          </ais-stats>
        </div>

        <ais-search-box />
      </div>

      <div class="grid grid-3">
        <ais-hits>
          <template #item="{ item }">
            <ProductCard :product="item" />
          </template>

          <template #empty>
            <div class="card search-empty-state">
              No products found. Try a different keyword.
            </div>
          </template>
        </ais-hits>
      </div>
    </ais-instant-search>
  </div>
</template>