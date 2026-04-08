<script setup lang="ts">
import { useFetch } from '#app'
import type { Product } from '~/types/travel'

const { data: products } = await useFetch<Product[]>('../api/products', {
  default: () => []
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Products</h1>
    <p class="page-lead">Browse travel products and open any card for detailed departures.</p>

    <div class="grid grid-3">
      <ProductCard
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </div>
  </div>
</template>