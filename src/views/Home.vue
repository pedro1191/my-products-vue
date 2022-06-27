<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3" v-if="showCategoriesMenu">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-lg-9">
        <gws-slider></gws-slider>
        <gws-products-cards :products="products"></gws-products-cards>
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
import Categories from '../components/Categories.vue';
import Slider from '../components/Carousel/Carousel.vue';
import ProductsCards from '../components/Product/Cards.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'AppHome',
  components: {
    gwsCategories: Categories,
    gwsSlider: Slider,
    gwsProductsCards: ProductsCards,
    gwsModal: Modal,
  },
  data() {
    return {
      products: [],
      modal: {
        error: false,
        message: '',
      },
    };
  },
  computed: {
    showCategoriesMenu: function () {
      return !this.$store.getters.isASmallDevice;
    },
    categories: function () {
      return this.$store.getters.categories;
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.$store.dispatch('setLoading', true);

      const params = {
        params: {
          include: 'category',
        },
      };

      axios
        .get('/products', params)
        .then((response) => {
          this.onStopLoading();
          this.products = response.data.data;
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.onStopLoading();
      this.modal.error = true;

      switch (error.response.status) {
        default:
          this.modal.message = 'Oops! Something went wrong.';
      }
    },
    onStopLoading() {
      this.$store.dispatch('setLoading', false);
    },
    onModalClose() {
      this.modal.message = '';
      this.modal.error = false;
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
</style>
