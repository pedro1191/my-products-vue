<template>
  <div class="social-media text-muted">
    <a href="https://www.facebook.com" title="Facebook" target="_blank" rel="noreferrer noopener"><i class="fab fa-facebook-f"></i></a>
    <a href="https://www.instagram.com" title="Instagram" target="_blank" rel="noreferrer noopener"><i class="fab fa-instagram"></i></a>
    <a href="https://www.twitter.com" title="Twitter" target="_blank" rel="noreferrer noopener"><i class="fab fa-twitter"></i></a>
  </div>
</template>

<style scoped>
.social-media {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.social-media a {
  text-decoration: none;
  margin: 0 0.5rem;
  color: #6c757d;
}

.social-media a:hover,
.social-media a:active {
  color: #fff;
}
</style>
