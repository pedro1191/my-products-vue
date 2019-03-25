<template>
  <div class="row">
    <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in products" :key="index">
      <gws-product-card :product="product"></gws-product-card>
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
