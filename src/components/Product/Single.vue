<template>
  <div class="row">
    <div class="col my-4">
      <div class="card mx-auto" v-if="product">
        <img
          class="card-img-top img-fluid"
          :src="product.image"
          :alt="product.name"
        />
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
  </div>
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

.card {
  max-width: 700px;
}
</style>
