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
import CarouselItem from './Item.vue';

export default {
  name: 'AppItems',
  components: {
    gwsCarouselItem: CarouselItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
};
</script>
