<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <gws-categories :categories="categories"></gws-categories>
      </div>
      <div class="col-lg-9">
        <gws-slider></gws-slider>
        <gws-products-cards :products="products"></gws-products-cards>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Categories from '@/components/Categories.vue'
import Slider from '@/components/Carousel/Carousel.vue'
import ProductsCards from '@/components/Product/Cards.vue'

export default {
  name: 'home',
  data () {
    return {
      categories: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
        { id: 4, name: 'Category 4' }
      ],
      products: [
        { id: 1, name: 'Product 1', description: 'Description of product 1', image: 'http://placehold.it/700x400' },
        { id: 2, name: 'Product 2', description: 'Description of product 2 Description of product 2 Description of product 2 Description of product 2 Description of product 2', image: 'http://placehold.it/700x400' },
        { id: 3, name: 'Product 3', description: 'Description of product 3', image: 'http://placehold.it/700x400' },
        { id: 4, name: 'Product 4', description: 'Description of product 4', image: 'http://placehold.it/700x400' }
      ]
    }
  },
  components: {
    gwsCategories: Categories,
    gwsSlider: Slider,
    gwsProductsCards: ProductsCards
  }
}
</script>
