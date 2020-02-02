<template>
  <div id="carouselIndicators" class="carousel slide my-4" data-ride="carousel">
    <gws-carousel-indicators :numberOfIndicators="carouselItems.length" :activeIndex="activeIndex"></gws-carousel-indicators>
    <gws-carousel-items :items="carouselItems" :activeIndex="activeIndex"></gws-carousel-items>
    <gws-carousel-prev-control @previousClicked="onPreviousClick" />
    <gws-carousel-next-control @nextClicked="onNextClick" />
  </div>
</template>

<script>
import CarouselIndicators from './Indicators.vue';
import CarouselItems from './Items.vue';
import CarouselPrevControl from './PrevControl.vue';
import CarouselNextControl from './NextControl.vue';
import gwsBanner1 from '@/assets/banner1.jpeg';
import gwsBanner2 from '@/assets/banner2.jpeg';
import gwsBanner3 from '@/assets/banner3.jpeg';

export default {
  created() {
    this.setCarouselInterval();
  },
  data() {
    return {
      carouselItems: [
        { image: gwsBanner1 },
        { image: gwsBanner2 },
        { image: gwsBanner3 }
      ],
      activeIndex: 0,
      carouselInterval: 0
    };
  },
  methods: {
    setCarouselInterval() {
      clearInterval(this.carouselInterval);

      this.carouselInterval = setInterval(() => {
        this.setNextItem();
      }, 5000);
    },
    onPreviousClick() {
      if (this.activeIndex - 1 < 0) {
        this.activeIndex = this.carouselItems.length - 1;
      } else {
        this.activeIndex--;
      }
      this.setCarouselInterval();
    },
    onNextClick() {
      this.setNextItem();
      this.setCarouselInterval();
    },
    setNextItem() {
      if (this.activeIndex >= this.carouselItems.length - 1) {
        this.activeIndex = 0;
      } else {
        this.activeIndex++;
      }
    }
  },
  components: {
    gwsCarouselIndicators: CarouselIndicators,
    gwsCarouselItems: CarouselItems,
    gwsCarouselPrevControl: CarouselPrevControl,
    gwsCarouselNextControl: CarouselNextControl
  }
};
</script>
