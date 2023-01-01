<template>
  <div class="row">
    <div class="col pl-4 pl-sm-0 mt-4" v-if="product">
      <div class="card p-3 mx-auto" v-if="product">
        <div class="card-body">
          <h4 class="font-weight-bold text-capitalize">{{ product.name }}</h4>
          <h6 class="mb-0">{{ product.category.name }}</h6>
          <img
            class="card-img-top img-fluid my-4"
            :src="product.image"
            :alt="product.name"
          />
          <p class="card-text">{{ product.description }}</p>
        </div>
      </div>
    </div>
    <div class="col text-center text-muted" v-else>
      The specified resource has not been found =/
    </div>
  </div>

  <button class="btn btn-link" @click="$router.back()">
    <font-awesome-icon icon="fa-backward" /> Go Back
  </button>

  <gws-modal v-if="modal.error">
    <template v-slot:header>FoodClub</template>
    <template v-slot:body>
      {{ modal.message }}
    </template>
    <template v-slot:footer>
      <button class="btn btn-primary py-1" @click="onModalClose">OK</button>
    </template>
  </gws-modal>
</template>

<script>
import axios from '@/axios-default';
import Modal from '../Modal.vue';

export default {
  name: 'AppSingle',
  components: {
    gwsModal: Modal,
  },
  data() {
    return {
      product: undefined,
      modal: {
        error: false,
        message: '',
      },
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$store.dispatch('setLoading', true);

      axios
        .get(`/products/${this.$route.params.id}`)
        .then((response) => {
          this.onStopLoading();
          this.product = response.data.data;
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.onStopLoading();

      switch (error.response.status) {
        case 404:
          this.product = undefined;
          break;
        default:
          this.modal.error = true;
          this.modal.message = 'Oops! Something went wrong.';
      }
    },
    onStopLoading() {
      this.$store.dispatch('setLoading', false);
    },
    onModalClose() {
      this.modal.error = false;
      this.modal.message = '';
    },
  },
};
</script>

<style scoped>
img {
  max-width: 300px;
  margin: auto;
}
</style>
