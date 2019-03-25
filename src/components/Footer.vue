<template>
  <footer class="mt-auto py-3 bg-dark">
    <div class="container">
      <p class="m-0 text-muted">Copyright &copy; My Products {{ thisYear }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    thisYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
