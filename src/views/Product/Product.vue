<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4" v-if="showCategoriesMenu">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-md-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Categories from '@/components/Categories.vue';

export default {
  name: 'AppProduct',
  components: {
    gwsCategories: Categories,
  },
  computed: {
    showCategoriesMenu: function () {
      return !this.$store.getters.isASmallDevice;
    },
    categories: function () {
      return this.$store.getters.categories;
    },
  },
};
</script>
