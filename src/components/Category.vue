<template>
  <router-link
    :to="{ name: 'products', query: { category: category.id } }"
    :class="linkClasses"
  >
    <li>
      <a>{{ category.name }}</a>
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
  computed: {
    activeClass: function () {
      if (this.$route.query.category === String(this.category.id)) {
        return 'active';
      }

      return '';
    },
    linkClasses: function () {
      return `${this.customClasses} ${this.activeClass}`;
    },
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
