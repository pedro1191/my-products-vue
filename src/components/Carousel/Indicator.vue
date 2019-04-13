<template>
  <li data-target="#carouselIndicators" :data-slide-to="index"></li>
</template>

<script>
export default {
  props: {
    index: {
      required: true
    }
  }
};
</script>
