<template>
    <router-link
      :to="{ name: 'products', query: { category: category.id } }"
      class="list-group-item">
      {{ category.name }}
    </router-link>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
      validator: function (category) {
        return (category.id && Number.isInteger(category.id) && category.name)
      }
    }
  }
}
</script>
