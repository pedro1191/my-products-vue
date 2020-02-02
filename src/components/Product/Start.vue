<template>
  <div>
    <gws-products-cards :products="products" />

    <gws-pagination v-if="pagination.total_pages > 1" :pagination="pagination" @onLinkClicked="changePage($event)"></gws-pagination>

    <gws-modal v-if="modal.error">
      <div class="local-modal-header" slot="header"> My Food</div>
      <div class="local-modal-body" slot="body">{{ modal.message }}</div>
      <div class="local-modal-footer" slot="footer">
        <button class="btn btn-secondary" @click="onModalClose">OK</button>
      </div>
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
        message: ''
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
      this.modal.message = '';
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
  color: #dc3545;
  font-weight: bold;
}

.local-modal-footer {
  text-align: right;
}
</style>
