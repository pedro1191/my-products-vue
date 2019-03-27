<template>
  <div>
    <gws-products-cards :products="products" />
    <gws-pagination
      v-if="pagination.total_pages > 1"
      :pagination="pagination"
      @onLinkClicked="changePage($event)"
    >
    </gws-pagination>
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
import Pagination from '@/components/Pagination.vue'

export default {
  created () {
    this.getProducts()
  },
  data () {
    return {
      products: [],
      pagination: {},
      current_page: 1,
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
          include: 'category',
          page: this.current_page
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
      this.current_page = 1
      this.getProducts()
    }
  },
  methods: {
    getProducts () {
      this.modal.loading = true

      axios.get('/products', this.urlParams)
        .then(response => {
          this.products = response.data.data
          this.pagination = response.data.meta.pagination
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
    },
    changePage (page) {
      this.current_page = page
      this.getProducts()
    }
  },
  components: {
    gwsProductsCards: ProductsCards,
    gwsModal: Modal,
    gwsSpinner: Spinner,
    gwsPagination: Pagination
  }
}
</script>
