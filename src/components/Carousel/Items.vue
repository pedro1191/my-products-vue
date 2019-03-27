<template>
  <div class="carousel-inner" role="listbox">
    <gws-carousel-item
      v-for="(item, index) in items"
      :key="index"
      :image="item.image"
      :index="index"
      :class="{ active: index === activeIndex }"
    >
    </gws-carousel-item>
  </div>
</template>

<script>
import CarouselItem from '@/components/Carousel/Item.vue'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    gwsCarouselItem: CarouselItem
  }
}
</script>
