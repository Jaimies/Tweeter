<template>
  <div class="sidebar">
    <RouterLink class="link" to="/home" v-if="isAuthenticated">Tweeter</RouterLink>
    <RouterLink class="link" to="/users">Browse users</RouterLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: this.$store.state.isAuthenticated
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
