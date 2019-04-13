<template>
  <footer class="mt-auto py-3 bg-dark">
    <div class="container">
      <div class="row">
        <div class="col d-flex">
          <p class="m-0 text-muted">Copyright &copy; My Food {{ thisYear }}</p>
          <gws-social-media class="ml-auto" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SocialMedia from './SocialMedia.vue';

export default {
  computed: {
    thisYear() {
      return new Date().getFullYear();
    }
  },
  components: {
    gwsSocialMedia: SocialMedia
  }
};
</script>
