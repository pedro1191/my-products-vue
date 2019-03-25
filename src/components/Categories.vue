<template>
  <div>
    <h1 class="my-4">{{ title }}</h1>
    <ul class="list-group">
      <gws-category
        v-for="(category, index) in categories"
        :key="index"
        :category="category"
        >
      </gws-category>
    </ul>
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
  components: {
    gwsCategory: Category
  }
}
</script>
