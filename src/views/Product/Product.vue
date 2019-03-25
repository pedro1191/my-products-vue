<template>
  <div class="home">
    <div class="row">
      <div class="col-lg-3">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-lg-9">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Categories from '@/components/Categories.vue'

export default {
  name: 'home',
  data () {
    return {
      categories: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
        { id: 4, name: 'Category 4' }
      ]
    }
  },
  components: {
    gwsCategories: Categories
  }
}
</script>
