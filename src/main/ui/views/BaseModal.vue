<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0006;
  z-index: 9;
}

.content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 10;
  padding: 15px;
}
</style>
