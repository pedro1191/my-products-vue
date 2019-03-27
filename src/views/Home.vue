<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-lg-9">
        <gws-slider></gws-slider>
        <gws-products-cards :products="products"></gws-products-cards>
      </div>
    </div>
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
// @ is an alias to /src
import axios from '@/axios-default'
import Categories from '@/components/Categories.vue'
import Slider from '@/components/Carousel/Carousel.vue'
import ProductsCards from '@/components/Product/Cards.vue'
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'home',
  created () {
    this.getCategories()
    this.getProducts()
  },
  data () {
    return {
      categories: [],
      products: [],
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
    getProducts () {
      this.modal.loading = true

      const params = {
        params: {
          include: 'category'
        }
      }

      axios.get('/products', params)
        .then(response => {
          this.modal.loading = false
          this.products = response.data.data
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
    gwsCategories: Categories,
    gwsSlider: Slider,
    gwsProductsCards: ProductsCards,
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
}
</script>
