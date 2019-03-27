<template>
  <div class="row" v-if="products.length > 0">
    <div
      class="col-lg-4 col-md-6 my-4"
      v-for="(product, index) in products"
      :key="index"
    >
      <gws-product-card :product="product"></gws-product-card>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col my-4 text-center text-muted">
      <h1>No products found =/</h1>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/Product/Card.vue'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {
    gwsProductCard: ProductCard
  }
}
</script>
