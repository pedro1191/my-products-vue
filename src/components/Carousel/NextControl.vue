<template>
  <button
    class="carousel-control-next"
    href="#carouselIndicators"
    role="button"
    data-slide="next"
    @click="$emit('nextClicked')"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </button>
</template>

<style scoped>
button {
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
