<template>
  <button
    class="carousel-control-prev"
    href="#carouselIndicators"
    role="button"
    data-slide="prev"
    @click="$emit('previousClicked')"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </button>
</template>

<style scoped>
button {
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
