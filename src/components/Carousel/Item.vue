<template>
  <div class="carousel-item">
    <img class="d-block img-fluid" :src="image" :alt="`Slide ${index}`">
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>
