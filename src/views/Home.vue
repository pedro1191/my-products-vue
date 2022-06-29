<template>
  <div class="container">
    <header class="pt-4">
      <gws-banner />
    </header>
    <section class="row pt-4">
      <div class="col-md-4" v-if="showCategoriesMenu">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-md-8">
        <gws-products-cards :products="products"></gws-products-cards>
      </div>
    </section>

    <gws-modal v-if="modal.error">
      <template v-slot:header>FoodClub</template>
      <template v-slot:body>
        {{ modal.message }}
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary py-1" @click="onModalClose">OK</button>
      </template>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default';
import Banner from '../components/Banner.vue';
import Categories from '../components/Categories.vue';
import ProductsCards from '../components/Product/Cards.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'AppHome',
  components: {
    gwsCategories: Categories,
    gwsBanner: Banner,
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
