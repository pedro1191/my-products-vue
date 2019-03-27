<template>
  <div>
    <div class="title my-4"
      @click="onCategoriesTitleClick">
      <h1>{{ title }}</h1>
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
.title {
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;
}

.title i {
  font-size: 1.5rem;
}
</style>
