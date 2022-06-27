<template>
  <router-link
    :to="{ name: 'products', query: { category: category.id } }"
    :class="customClasses"
    active-class="active"
    exact
  >
    <li>
      <a class="nav-link">{{ category.name }}</a>
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'AppCategory',
  props: {
    category: {
      type: Object,
      required: true,
      validator: function (category) {
        return category.id && Number.isInteger(category.id) && category.name;
      },
    },
    customClasses: String,
  },
};
</script>

<style scoped>
.list-group-item:hover,
.list-group-item:focus {
  color: var(--primary);
  text-decoration: none;
}
</style>
