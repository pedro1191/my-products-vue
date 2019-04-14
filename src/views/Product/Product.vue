<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3" v-if="showCategoriesMenu">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-lg-9">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Categories from '@/components/Categories.vue';

export default {
  computed: {
    showCategoriesMenu: function() {
      return !this.$store.getters.isASmallDevice;
    },
    categories: function() {
      return this.$store.getters.categories;
    }
  },
  components: {
    gwsCategories: Categories
  }
};
</script>
