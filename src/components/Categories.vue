<template>
  <div>
    <div @click="onCategoriesTitleClick">
      <h1 class="my-4">
        {{ title }}
        <span
          class="ml-3 oi"
          :class="{ 'oi-plus': !showCategories, 'oi-minus': showCategories }"
        >
        </span>
      </h1>
    </div>
    <div v-if="showCategories">
      <ul class="list-group" v-if="categories.length > 0">
        <gws-category
          v-for="(category, index) in categories"
          :key="index"
          :category="category"
          >
        </gws-category>
      </ul>
      <h4 class="text-center text-muted" v-else>No categories found =/</h4>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Category.vue'

export default {
  props: {
    title: {
      type: String,
      default: 'Categories'
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showCategories: true
    }
  },
  components: {
    gwsCategory: Category
  },
  methods: {
    onCategoriesTitleClick () {
      this.showCategories = !this.showCategories
    }
  }
}
</script>

<style scoped>
h1 {
  cursor: pointer;
}

h1 span {
  font-size: 1.5rem;
}
</style>
