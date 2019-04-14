<template>
  <div>
    <gws-products-cards :products="products" />

    <gws-pagination v-if="pagination.total_pages > 1" :pagination="pagination" @onLinkClicked="changePage($event)"></gws-pagination>

    <gws-modal v-if="modal.error">
      <div slot="header"> My Food</div>
      <div slot="body">{{ modal.message }}</div>
      <button class="btn btn-primary" @click="onModalClose" slot="footer">OK</button>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default';
import ProductsCards from './Cards.vue';
import Modal from '../Modal.vue';
import Pagination from '../Pagination.vue';

export default {
  created() {
    this.getProducts();
  },
  data() {
    return {
      products: [],
      pagination: {},
      current_page: 1,
      modal: {
        error: false,
        message: null
      }
    };
  },
  computed: {
    urlParams() {
      const params = {
        params: {
          include: 'category',
          page: this.current_page
        }
      };

      if (this.$route.query.category) {
        params.params['category_id'] = this.$route.query.category;
      }

      return params;
    }
  },
  watch: {
    '$route.query.category': function() {
      this.current_page = 1;
      this.getProducts();
    }
  },
  methods: {
    getProducts() {
      this.$store.dispatch('setLoading', true);

      axios
        .get('/products', this.urlParams)
        .then(response => {
          this.products = response.data.data;
          this.pagination = response.data.meta.pagination;
          this.onStopLoading();
        })
        .catch(error => {
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
      this.modal.message = null;
    },
    changePage(page) {
      this.current_page = page;
      this.getProducts();
    }
  },
  components: {
    gwsProductsCards: ProductsCards,
    gwsModal: Modal,
    gwsPagination: Pagination
  }
};
</script>
