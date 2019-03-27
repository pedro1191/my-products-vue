<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" to="/">
        <gws-logo :customStyle="customLogoStyle"/> My Products
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        :aria-expanded="mobileNavbarOpen"
        aria-label="Toggle navigation"
        :class="{collapsed: !mobileNavbarOpen}"
        @click="onNavbarTogglerClick">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{show: mobileNavbarOpen}">
        <ul class="navbar-nav ml-auto">
          <router-link class="nav-item" to="/" tag="li" active-class="active" exact>
            <a class="nav-link">Home</a>
          </router-link>
          <router-link class="nav-item" to="/about" tag="li" active-class="active">
            <a class="nav-link">About</a>
          </router-link>
          <router-link class="nav-item" to="/products" tag="li" active-class="active">
            <a class="nav-link">Products</a>
          </router-link>
          <router-link class="nav-item" to="/contact" tag="li" active-class="active">
            <a class="nav-link">Contact</a>
          </router-link>
          <li class="nav-item">
            <a href="http://192.168.0.128:8086" target="_blank" class="nav-link" rel="noopener">Dashboard</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  data () {
    return {
      customLogoStyle: {
        height: '50px'
      },
      dropdownOpen: false,
      mobileNavbarOpen: false
    }
  },
  components: {
    gwsLogo: Logo
  },
  methods: {
    onNavbarTogglerClick () {
      this.mobileNavbarOpen = !this.mobileNavbarOpen
    }
  }
}
</script>

<style scoped>
.nav-item {
  text-align: center;
}
</style>
