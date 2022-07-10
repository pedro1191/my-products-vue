<template>
  <div class="text-content">
    <h1>FIND HERE WHAT'S THE BEST IN THE CUISINE!</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum
      erat a condimentum molestie. Sed sagittis mi non dictum aliquet.
    </p>
    <router-link class="btn btn-primary font-weight-bold nav-item" to="/about">
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

.text-content h1 {
  font-size: 2em;
}

.text-content p {
  padding: 1rem 0;
}

@media (min-width: 992px) {
  .text-content {
    padding: 3rem 2rem;
  }

  .text-content h1 {
    font-size: 2.5rem;
  }
}
</style>
