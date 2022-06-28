<template>
  <div class="text-content">
    <h1>FIND HERE WHAT'S THE BEST IN THE CUISINE!</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum
      erat a condimentum molestie. Sed sagittis mi non dictum aliquet.
    </p>
    <router-link class="btn btn-primary nav-item" to="/about">
      <a class="nav-link">LEARN MORE</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppBannerHeadline',
};
</script>

<style scoped>
.text-content {
  padding: 1rem 0.5rem;
}

@media (min-width: 992px) {
  .text-content {
    padding: 3rem 2rem;
  }

  .text-content p {
    padding: 1rem 0;
  }
}
</style>
