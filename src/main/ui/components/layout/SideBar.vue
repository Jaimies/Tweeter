<template>
  <div class="sidebar">
    <RouterLink class="link" to="/users">Browse users</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1;
}

.link {
  font-size: 18px;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}
</style>
