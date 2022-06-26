<template>
  <div class="card h-100">
    <router-link :to="{ name: 'productsSingle', params: { id: product.id } }">
      <img class="card-img-top" :src="product.image" :alt="product.name" />
    </router-link>
    <div class="card-body">
      <h4 class="card-title">
        <router-link
          :to="{ name: 'productsSingle', params: { id: product.id } }"
        >
          {{ product.name }}
        </router-link>
      </h4>
      <h5>{{ product.category.data.name }}</h5>
      <p class="card-text">{{ smallDescription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    product: {
      type: Object,
      required: true,
      validation: function (product) {
        return (
          product.id &&
          Number.isInteger(product.id) &&
          product.name &&
          product.description &&
          product.image
        );
      },
    },
  },
  computed: {
    smallDescription() {
      if (this.product.description.length > 100) {
        return this.product.description.substring(0, 97) + '...';
      }
      return this.product.description;
    },
  },
};
</script>

<style scoped>
a {
  color: #dc3545;
}
</style>
