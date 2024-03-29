<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <gws-logo :customStyle="customLogoStyle" /> FoodClub
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        :aria-expanded="mobileNavbarOpen"
        aria-label="Toggle navigation"
        :class="{ collapsed: !mobileNavbarOpen }"
        @click="onNavbarTogglerClick"
      >
        Menu <font-awesome-icon class="ml-2" icon="fa-bars" />
      </button>
      <transition name="grow">
        <div
          class="collapse navbar-collapse show"
          id="navbarSupportedContent"
          v-if="mobileNavbarOpen || showMenu"
        >
          <ul class="navbar-nav m-auto">
            <router-link class="nav-item" to="/" active-class="active" exact>
              <li><a class="nav-link">Home</a></li>
            </router-link>
            <router-link class="nav-item" to="/about" active-class="active">
              <li><a class="nav-link">About</a></li>
            </router-link>
            <li
              class="nav-item dropdown"
              :class="{ show: dropdownOpen, active: isCategoriesPage }"
              v-if="showCategoriesMenu"
            >
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                :aria-expanded="dropdownOpen"
                @click="onDropdownClick"
              >
                Renowned Chefs
              </a>
              <transition name="grow">
                <div
                  class="dropdown-menu show"
                  aria-labelledby="navbarDropdown"
                  v-if="dropdownOpen"
                >
                  <gws-category
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    customClasses="dropdown-item"
                  >
                  </gws-category>
                </div>
              </transition>
            </li>
            <router-link class="nav-item" to="/contact" active-class="active">
              <li><a class="nav-link">Contact</a></li>
            </router-link>
            <a
              class="nav-item"
              :href="dashboardUrl"
              target="_blank"
              rel="noreferrer noopener"
            >
              <li><a class="nav-link">Dashboard</a></li>
            </a>
          </ul>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo.vue';
import Category from './Category.vue';

export default {
  name: 'AppNavbar',
  components: {
    gwsLogo: Logo,
    gwsCategory: Category,
  },
  data() {
    return {
      dashboardUrl: process.env.VUE_APP_DASHBOARD_APP_URL,
      customLogoStyle: {
        height: '50px',
      },
      dropdownOpen: false,
      mobileNavbarOpen: false,
    };
  },
  computed: {
    showMenu: function () {
      return (
        !this.$store.getters.isAnExtraSmallDevice &&
        !this.$store.getters.isASmallDevice
      );
    },
    showCategoriesMenu: function () {
      return this.$store.getters.isAnExtraSmallDevice;
    },
    categories: function () {
      return this.$store.getters.categories;
    },
    isCategoriesPage: function () {
      return this.$route.name === 'products';
    },
  },
  watch: {
    $route() {
      this.mobileNavbarOpen = false;
      this.dropdownOpen = false;
    },
  },
  methods: {
    onNavbarTogglerClick() {
      this.mobileNavbarOpen = !this.mobileNavbarOpen;
    },
    onDropdownClick() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  font-family: PatrickHand, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  font-size: 1.25rem;
}

.nav-item {
  color: var(--primary);
  text-align: center;
  border-radius: 40px;
  border: 2px solid transparent;
  padding: 0 1em;
  font-weight: bold;
  text-decoration: none;
}

.nav-item.active {
  color: var(--dark);
  border: 2px solid var(--primary);
}

.nav-item.active .nav-link {
  color: var(--dark);
}

.dropdown-toggle::after {
  transform: rotate(0deg);
  transition: all 0.5s ease-in-out;
}

.dropdown.show .dropdown-toggle::after {
  transform: rotate(180deg);
  transition: all 0.5s ease-in-out;
}
</style>
