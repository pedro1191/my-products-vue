<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <gws-logo :customStyle="customLogoStyle" /> My Food
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" :aria-expanded="mobileNavbarOpen" aria-label="Toggle navigation" :class="{collapsed: !mobileNavbarOpen}" @click="onNavbarTogglerClick">
        Menu <i class="fas fa-bars ml-2"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{ show: mobileNavbarOpen }">
        <ul class="navbar-nav ml-auto">
          <router-link class="nav-item" to="/" tag="li" active-class="active" exact>
            <a class="nav-link">Home</a>
          </router-link>
          <router-link class="nav-item" to="/about" tag="li" active-class="active">
            <a class="nav-link">About</a>
          </router-link>
          <li class="nav-item dropdown" @click="onDropdownClick" :class="{ show: dropdownOpen }" v-if="showCategoriesMenu">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="dropdownOpen">
              Categories
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" :class="{ show: dropdownOpen }">
              <gws-category v-for="category in categories" :key="category.id" :category="category" customClasses="dropdown-item"></gws-category>
            </div>
          </li>
          <router-link class="nav-item" to="/contact" tag="li" active-class="active">
            <a class="nav-link">Contact</a>
          </router-link>
          <li class="nav-item">
            <a :href="dashboardUrl" target="_blank" class="nav-link" rel="noreferrer noopener">Dashboard</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo.vue';
import Category from './Category.vue';

export default {
  data() {
    return {
      dashboardUrl: process.env.VUE_APP_DASHBOARD_APP_URL,
      customLogoStyle: {
        height: '50px'
      },
      dropdownOpen: false,
      mobileNavbarOpen: false
    };
  },
  computed: {
    showCategoriesMenu: function() {
      return this.$store.getters.isASmallDevice;
    },
    categories: function() {
      return this.$store.getters.categories;
    }
  },
  watch: {
    $route() {
      this.mobileNavbarOpen = false;
    }
  },
  methods: {
    onNavbarTogglerClick() {
      this.mobileNavbarOpen = !this.mobileNavbarOpen;
    },
    onDropdownClick() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  },
  components: {
    gwsLogo: Logo,
    gwsCategory: Category
  }
};
</script>

<style scoped>
.nav-item {
  text-align: center;
}
</style>
