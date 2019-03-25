<template>
  <h1>Start</h1>
</template>

<script>
import axios from '@/axios-default'

export default {
  created () {
    this.getProducts(this.$route.query.category)
  },
  data () {
    return {
      products: [],
      modal: {
        loading: false,
        error: false,
        message: null
      }
    }
  },
  computed: {
    urlSearch () {
      if (this.$route.query.category) {
        return `/products?category=${this.$route.query.category}`
      }
      return '/products'
    }
  },
  watch: {
    '$route.query.category': function (value) {
      this.getProducts(value)
    }
  },
  methods: {
    getProducts (category) {
      this.modal.loading = true

      axios.get(this.urlSearch)
        .then(response => {
          this.products = response.data.data
          this.modal.loading = false
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
      this.modal.error = false
      this.modal.message = null
    }
  }
}
</script>
