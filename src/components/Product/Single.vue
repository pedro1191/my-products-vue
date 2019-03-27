<template>
  <div class="row">
    <div class="col my-4">

      <div class="card mx-auto" v-if="product">
        <img class="card-img-top img-fluid" :src="product.image" :alt="product.name">
        <div class="card-body">
          <h3 class="card-title">{{ product.name }}</h3>
          <h5>{{ product.category.data.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
        </div>
      </div>

      <div class="text-center text-muted" v-else>
        <h1>The specified product was not found =/</h1>
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
import axios from '@/axios-default'
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  created () {
    this.getProduct()
  },
  data () {
    return {
      product: null,
      modal: {
        loading: false,
        error: false,
        message: null
      }
    }
  },
  methods: {
    getProduct () {
      this.modal.loading = true

      axios.get(`/products/${this.$route.params.id}`, { params: { include: 'category' } })
        .then(response => {
          console.log(response.data)
          this.modal.loading = false
          this.product = response.data.data
        })
        .catch(error => {
          this.onHttpRequestError(error)
        })
    },
    onHttpRequestError (error) {
      this.modal.loading = false
      console.log(error.response)

      switch (error.response.status) {
        case 404:
          this.product = null
          break
        default:
          this.modal.error = true
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
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
}
</script>

<style scoped>
.card {
  max-width: 700px;
}
</style>
