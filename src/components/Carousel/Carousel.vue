<template>
  <div id="carouselIndicators" class="carousel slide my-4" data-ride="carousel">
    <gws-carousel-indicators :numberOfIndicators="carouselItems.length"></gws-carousel-indicators>
    <gws-carousel-items :items="carouselItems"></gws-carousel-items>
    <gws-carousel-prev-control/>
    <gws-carousel-next-control/>
  </div>
</template>

<script>
import CarouselIndicators from '@/components/Carousel/Indicators.vue'
import CarouselItems from '@/components/Carousel/Items.vue'
import CarouselPrevControl from '@/components/Carousel/PrevControl.vue'
import CarouselNextControl from '@/components/Carousel/NextControl.vue'

export default {
  data () {
    return {
      carouselItems: [
        { image: 'http://placehold.it/900x350' },
        { image: 'http://placehold.it/900x350' },
        { image: 'http://placehold.it/900x350' }
      ]
    }
  },
  components: {
    gwsCarouselIndicators: CarouselIndicators,
    gwsCarouselItems: CarouselItems,
    gwsCarouselPrevControl: CarouselPrevControl,
    gwsCarouselNextControl: CarouselNextControl
  }
}
</script>
