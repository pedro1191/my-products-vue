<template>
  <div class="card h-100">
    <div class="card-header">
      <h6 class="card-title mb-0 text-capitalize">
        <router-link
          :to="{ name: 'productsSingle', params: { id: product.id } }"
        >
          {{ product.name }}
        </router-link>
      </h6>
      <small>{{ product.category.data.name }}</small>
    </div>
    <div class="card-body">
      <router-link :to="{ name: 'productsSingle', params: { id: product.id } }">
        <img class="card-img-top" :src="product.image" :alt="product.name" />
      </router-link>
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
};
</script>

<style scoped>
.card {
  max-width: 300px;
  margin: auto;
}

a {
  color: var(--dark);
}
</style>
