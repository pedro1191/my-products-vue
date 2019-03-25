<template>
  <div id="app" class="d-flex flex-column h-100">
    <gws-header></gws-header>
    <main role="main" class="flex-shrink-0">
      <router-view/>
    </main>
    <gws-footer></gws-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    gwsHeader: Header,
    gwsFooter: Footer
  }
}
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
