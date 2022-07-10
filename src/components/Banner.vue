<template>
  <div class="row">
    <div class="col-4 col-md-auto spicy">
      <img alt="Spicy" class="img-fluid" :src="gwsSpicy" />
    </div>
    <div class="col headline" v-if="isAMediumDeviceOrBigger">
      <gws-banner-headline />
    </div>
    <div class="col-8 col-md-auto ml-auto chef">
      <img alt="Chef" class="img-fluid" :src="gwsChef" />
    </div>
  </div>
  <div class="row" v-if="!isAMediumDeviceOrBigger">
    <div class="col headline">
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
    isAMediumDeviceOrBigger: function () {
      return (
        !this.$store.getters.isAnExtraSmallDevice &&
        !this.$store.getters.isASmallDevice
      );
    },
  },
};
</script>

<style scoped>
.spicy {
  padding-top: 3rem;
}

.headline {
  display: flex;
  align-items: center;
  align-content: center;
  padding: 1.5rem 2.5rem;
}

@media (min-width: 768px) {
  .spicy {
    padding-top: 4rem;
  }

  .spicy img {
    max-width: 125px;
  }

  .chef img {
    max-width: 300px;
  }
}
</style>
