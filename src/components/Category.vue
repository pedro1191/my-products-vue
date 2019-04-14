<template>
  <router-link :to="{ name: 'products', query: { category: category.id } }" :class="customClasses" active-class="active" exact>
    {{ category.name }}
  </router-link>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
      validator: function(category) {
        return category.id && Number.isInteger(category.id) && category.name;
      }
    },
    customClasses: String
  }
};
</script>

<style scoped>
.list-group-item:hover,
.list-group-item:focus {
  color: #dc3545;
  text-decoration: none;
}
</style>
