<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col text-center">
        <h1 class="my-4">FoodClub</h1>
        <p>
          This is a Progressive Web Application built using Vue.js that shows
          things divided by categories. It links a Dashboard with authentication
          where the administrator can manage them and consumes a
          <a
            class="text-danger"
            href="https://github.com/pedro1191/my-products-rest.git"
            target="_blank"
            rel="noreferrer noopener"
          >
            REST API
          </a>
          to load the categories and send contact messages. The "theme" chosen
          here relates to culinary, but it could have been anything else.
        </p>
        <p><strong>Version:</strong> 2.0.0</p>
        <p>
          <a
            class="text-danger"
            href="https://github.com/pedro1191/my-products-vue.git"
            target="_blank"
            rel="noreferrer noopener"
          >
            See source code <font-awesome-icon icon="fa-code" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAbout',
};
</script>

<style scoped>
h1 {
  font-family: PatrickHand, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
}
</style>
