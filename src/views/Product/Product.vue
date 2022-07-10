<template>
  <div class="container-fluid pl-0 pr-lg-5">
    <div class="row pt-4">
      <div class="col-12 col-sm-5 col-md-4">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-12 col-sm-7 col-md-8">
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
    categories: function () {
      return this.$store.getters.categories;
    },
  },
};
</script>
