<template>
  <div class="row flex-nowrap">
    <div class="col col-md-auto text-left spicy">
      <img alt="Spicy" :src="gwsSpicy" />
    </div>
    <div class="col headline" v-if="!isASmallDevice">
      <gws-banner-headline />
    </div>
    <div class="col-8 col-md-auto text-right chef">
      <img alt="Chef" :src="gwsChef" />
    </div>
  </div>
  <div class="row" v-if="isASmallDevice">
    <div class="col">
      <gws-banner-headline />
    </div>
  </div>
</template>

<script>
import BannerHeadline from '@/components/BannerHeadline.vue';
import gwsChef from '@/assets/chef.jpg';
import gwsSpicy from '@/assets/spicy.jpg';

export default {
  name: 'AppBanner',
  components: {
    gwsBannerHeadline: BannerHeadline,
  },
  data() {
    return {
      gwsChef,
      gwsSpicy,
    };
  },
  computed: {
    isASmallDevice: function () {
      return this.$store.getters.isASmallDevice;
    },
  },
};
</script>

<style scoped>
.spicy,
.headline {
  padding-top: 3rem;
}

.spicy img {
  width: 100%;
}

.chef img {
  width: 100%;
}

@media (min-width: 768px) {
  .chef img {
    max-width: 250px;
  }
}

@media (min-width: 992px) {
  .spicy,
  .headline {
    padding-top: 5rem;
  }

  .spicy img {
    max-width: 130px;
  }

  .chef img {
    max-width: 300px;
  }
}
</style>
