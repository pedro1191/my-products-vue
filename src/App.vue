<template>
  <div class="d-flex flex-column h-100">
    <gws-navbar></gws-navbar>

    <main role="main" class="flex-shrink-0">
      <router-view />
    </main>

    <gws-footer></gws-footer>

    <gws-modal v-if="isLoading">
      <template v-slot:default>
        <gws-spinner></gws-spinner>
      </template>
    </gws-modal>
  </div>
  <gws-update-notifier></gws-update-notifier>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';
import Spinner from './components/Spinner.vue';
import UpdateNotifier from './components/UpdateNotifier.vue';

export default {
  components: {
    gwsNavbar: Navbar,
    gwsFooter: Footer,
    gwsModal: Modal,
    gwsSpinner: Spinner,
    gwsUpdateNotifier: UpdateNotifier,
  },
  computed: {
    isLoading: function () {
      return this.$store.getters.isLoading;
    },
  },
  mounted() {
    this.addResizeEventListener();
    this.$store.dispatch('getCategories');
  },
  methods: {
    addResizeEventListener: function () {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.$store.dispatch(
            'setCurrentScreenWidth',
            window.innerWidth || window.document.documentElement.clientWidth
          );
        });
      });
    },
  },
};
</script>

<style>
:root {
  --navbar-offset: 76px;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.ttf');
}

@font-face {
  font-family: 'PatrickHand';
  src: url('./assets/fonts/PatrickHand-Regular.ttf');
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
}

main > div {
  padding-top: var(--navbar-offset);
}
</style>
