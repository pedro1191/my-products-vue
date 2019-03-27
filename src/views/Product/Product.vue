<template>
  <div class="container">
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
import axios from '@/axios-default'
import Categories from '@/components/Categories.vue'

export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      categories: [],
      modal: {
        loading: false,
        error: false,
        message: null
      }
    }
  },
  methods: {
    getCategories () {
      this.modal.loading = true

      axios.get('/categories')
        .then(response => {
          this.modal.loading = false
          this.categories = response.data.data
        })
        .catch(error => {
          this.onHttpRequestError(error)
        })
    },
    onHttpRequestError (error) {
      this.modal.loading = false
      this.modal.error = true
      console.log(error.response)

      switch (error.response.status) {
        default:
          this.modal.message = 'Oops! Something went wrong.'
      }
    },
    onModalClose () {
      this.modal.loading = false
      this.modal.message = null
      this.modal.error = false
    }
  },
  components: {
    gwsCategories: Categories
  }
}
</script>
