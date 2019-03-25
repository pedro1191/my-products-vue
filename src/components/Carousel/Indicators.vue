<template>
  <ol class="carousel-indicators">
    <gws-carousel-indicator
      v-for="i in numberOfIndicators"
      :key="i"
      :index="i"
      :class="{ active: i === 0 }"
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
    }
  },
  components: {
    gwsCarouselIndicator: CarouselIndicator
  }
}
</script>
