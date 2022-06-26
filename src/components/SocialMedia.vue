<template>
  <div class="social-media text-muted">
    <a
      href="https://www.facebook.com"
      title="Facebook"
      target="_blank"
      rel="noreferrer noopener"
    >
      <font-awesome-icon icon="fa-brands fa-facebook-f" />
    </a>
    <a
      href="https://www.instagram.com"
      title="Instagram"
      target="_blank"
      rel="noreferrer noopener"
    >
      <font-awesome-icon icon="fa-brands fa-instagram" />
    </a>
    <a
      href="https://www.twitter.com"
      title="Twitter"
      target="_blank"
      rel="noreferrer noopener"
    >
      <font-awesome-icon icon="fa-brands fa-twitter" />
    </a>
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
