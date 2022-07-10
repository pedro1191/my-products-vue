<template>
  <div class="categories">
    <header v-if="isASmallDeviceOrBigger">
      <img alt="Dinnerware" :src="gwsDinnerware" />
    </header>
    <div class="px-3 mx-auto">
      <div class="title my-4" @click="onCategoriesTitleClick">
        <h4 class="font-weight-bold">{{ title }}</h4>
        <font-awesome-icon
          class="ml-3"
          size="2x"
          icon="fa-minus"
          v-if="showCategories"
        />
        <font-awesome-icon class="ml-3" size="2x" icon="fa-plus" v-else />
      </div>
      <div v-if="showCategories">
        <ul class="list-group" v-if="categories.length > 0">
          <gws-category
            v-for="(category, index) in categories"
            :key="index"
            :category="category"
            customClasses="list-group-item"
          >
          </gws-category>
        </ul>
        <h4 class="text-center text-muted" v-else>No categories found =/</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Category from './Category.vue';
import gwsDinnerware from '@/assets/dinnerware.png';

export default {
  name: 'AppCategories',
  components: {
    gwsCategory: Category,
  },
  props: {
    title: {
      type: String,
      default: 'RENOWNED CHEFS',
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      gwsDinnerware,
      showCategories: true,
    };
  },
  computed: {
    isASmallDeviceOrBigger: function () {
      return !this.$store.getters.isAnExtraSmallDevice;
    },
  },
  methods: {
    onCategoriesTitleClick() {
      this.showCategories = !this.showCategories;
    },
  },
};
</script>

<style scoped>
header {
  padding: 1rem 0;
  border-bottom: 1px solid var(--dark);
}

header img {
  max-width: 100px;
}

.categories {
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  flex-direction: column;
  top: var(--navbar-offset);
}

.title {
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;
  color: var(--primary);
}

.title * {
  margin: 0;
}
</style>
