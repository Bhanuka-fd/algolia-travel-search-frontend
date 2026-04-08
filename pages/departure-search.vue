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
    <h1 class="page-title">Departure Search</h1>
    <p class="page-lead">Search specific departures to evaluate date-level discovery behavior.</p>

    <div class="card search-meta-card meta-card">
      <p><strong>App ID:</strong> {{ config.public.algoliaAppId }}</p>
      <p><strong>Index:</strong> {{ config.public.algoliaDepartureIndex }}</p>
    </div>

    <ais-instant-search
      :search-client="searchClient"
      :index-name="config.public.algoliaDepartureIndex"
    >
      <div class="card search-controls-card">
        <div class="search-meta-row">
          <p class="search-index-label">
            Searching index:
            <span class="search-index-badge">{{ config.public.algoliaDepartureIndex }}</span>
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
            <DepartureCard :departure="item" />
          </template>

          <template #empty>
            <div class="card search-empty-state">
              No departures found. Try a different keyword.
            </div>
          </template>
        </ais-hits>
      </div>
    </ais-instant-search>
  </div>
</template>