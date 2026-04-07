<script setup lang="ts">
import type { Product } from '../types/travel'
import { useFetch } from 'nuxt/app'

const { data: products } = await useFetch<Product[]>('../api/products', {
  default: () => []
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Products</h1>

    <div class="grid grid-3">
      <ProductCard
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </div>
  </div>
</template>