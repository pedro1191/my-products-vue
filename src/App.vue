<template>
  <div id="app" class="d-flex flex-column h-100">
    <gws-navbar></gws-navbar>

    <main role="main" class="flex-shrink-0">
      <router-view />
    </main>

    <gws-footer></gws-footer>

    <gws-modal v-if="isLoading">
      <gws-spinner slot="body"></gws-spinner>
    </gws-modal>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';
import Spinner from './components/Spinner.vue';

export default {
  mounted() {
    this.addResizeEventListener();
    this.$store.dispatch('getCategories');
  },
  computed: {
    isLoading: function() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    addResizeEventListener: function() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.$store.dispatch(
            'setCurrentScreenWidth',
            window.innerWidth || window.document.documentElement.clientWidth
          );
        });
      });
    }
  },
  components: {
    gwsNavbar: Navbar,
    gwsFooter: Footer,
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main > .container {
  padding-top: 76px;
}
</style>
