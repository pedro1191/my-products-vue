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
import ProductsCards from './Cards.vue';
import Modal from '../Modal.vue';
import Pagination from '../Pagination.vue';

export default {
  name: 'AppStart',
  components: {
    gwsProductsCards: ProductsCards,
    gwsModal: Modal,
    gwsPagination: Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      current_page: 1,
      modal: {
        error: false,
        message: '',
      },
    };
  },
  computed: {
    urlParams() {
      const params = {
        params: {
          include: 'category',
          page: this.current_page,
        },
      };

      if (this.$route.query.category) {
        params.params['category_id'] = this.$route.query.category;
      }

      return params;
    },
  },
  watch: {
    '$route.query.category': function () {
      this.current_page = 1;
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.$store.dispatch('setLoading', true);

      axios
        .get('/products', this.urlParams)
        .then((response) => {
          this.products = response.data.data;
          this.pagination = response.data.meta.pagination;
          this.onStopLoading();
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
      this.modal.error = false;
      this.modal.message = '';
    },
    changePage(page) {
      this.current_page = page;
      this.getProducts();
    },
  },
};
</script>
