<template>
  <div class="categories">
    <div class="title my-4" @click="onCategoriesTitleClick">
      <h2>{{ title }}</h2>
      <i
        class="ml-3 fas"
        :class="{ 'fa-plus': !showCategories, 'fa-minus': showCategories }"
      >
      </i>
    </div>
    <div v-if="showCategories">
      <ul class="list-group" v-if="categories.length > 0">
        <gws-category
          v-for="(category, index) in categories"
          :key="index"
          :category="category"
          customClasses="list-group-item"
        >
        </gws-category>
      </ul>
      <h4 class="text-center text-muted" v-else>No categories found =/</h4>
    </div>
  </div>
</template>

<script>
import Category from './Category.vue';

export default {
  name: 'AppCategories',
  components: {
    gwsCategory: Category,
  },
  props: {
    title: {
      type: String,
      default: 'Categories',
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showCategories: true,
    };
  },
  methods: {
    onCategoriesTitleClick() {
      this.showCategories = !this.showCategories;
    },
  },
};
</script>

<style scoped>
.categories {
  position: fixed;
}

.title {
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;
  color: #dc3545;
}

.title i {
  font-size: 1.5rem;
  color: #dc3545;
}
</style>
