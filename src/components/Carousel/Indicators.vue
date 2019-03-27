<template>
  <ol class="carousel-indicators">
    <gws-carousel-indicator
      v-for="(i, index) in numberOfIndicators"
      :key="index"
      :index="i"
      :class="{ active: index === activeIndex }"
    >
    </gws-carousel-indicator>
  </ol>
</template>

<script>
import CarouselIndicator from '@/components/Carousel/Indicator.vue'

export default {
  props: {
    numberOfIndicators: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    gwsCarouselIndicator: CarouselIndicator
  }
}
</script>
