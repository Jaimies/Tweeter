<template>
  <aside class="sidebar">
    <RouterLink class="link" :to="homeLink">Tweeter</RouterLink>
    <RouterLink class="link" to="/users">Browse users</RouterLink>
  </aside>
</template>

<script>
export default {
  computed: {
    homeLink() {
      const isAuthenticated = this.$store.state.isAuthenticated
      return isAuthenticated ? "/home" : "/"
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1;
}

.link {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}
</style>
