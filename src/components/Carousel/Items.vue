<template>
  <div class="carousel-inner" role="listbox">
    <gws-carousel-item
      v-for="(item, index) in items"
      :key="index"
      :image="item.image"
      :index="index"
      :class="{ active: index === 0 }"
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
    }
  },
  components: {
    gwsCarouselItem: CarouselItem
  }
}
</script>
