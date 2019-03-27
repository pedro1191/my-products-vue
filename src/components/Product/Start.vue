<template>
  <div>
    <gws-products-cards :products="products" />
    <gws-modal v-if="modal.error">
      <div slot="header"> My Products</div>
      <div slot="body">{{ modal.message }}</div>
      <button class="btn btn-primary" @click="onModalClose" slot="footer">OK</button>
    </gws-modal>
    <gws-modal v-if="modal.loading">
      <gws-spinner slot="body"></gws-spinner>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default'
import ProductsCards from '@/components/Product/Cards.vue'
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

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
    urlParams () {
      const params = {
        params: {
          include: 'category'
        }
      }

      if (this.$route.query.category) {
        params.params['category_id'] = this.$route.query.category
      }

      return params
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

      axios.get('/products', this.urlParams)
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
  },
  components: {
    gwsProductsCards: ProductsCards,
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
}
</script>
