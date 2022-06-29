<template>
  <div class="row">
    <div class="col" v-if="product">
      <div class="card p-3 mx-auto" v-if="product">
        <div class="card-body">
          <h4 class="font-weight-bold text-capitalize">{{ product.name }}</h4>
          <h6 class="mb-0">{{ product.category.data.name }}</h6>
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
    <template v-slot:header>
      <div class="local-modal-header">FoodClub</div>
    </template>
    <template v-slot:body>
      <div class="local-modal-body">{{ modal.message }}</div>
    </template>
    <template v-slot:footer>
      <div class="local-modal-footer">
        <button class="btn btn-secondary" @click="onModalClose">OK</button>
      </div>
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
        .get(`/products/${this.$route.params.id}`, {
          params: { include: 'category' },
        })
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
.local-modal-header,
.local-modal-body,
.local-modal-footer {
  padding: 0.5rem;
  background-color: #fff;
  width: 100%;
}

.local-modal-header {
  text-align: left;
  color: var(--primary);
  font-weight: bold;
}

.local-modal-footer {
  text-align: right;
}

img {
  max-width: 300px;
  margin: auto;
}
</style>
