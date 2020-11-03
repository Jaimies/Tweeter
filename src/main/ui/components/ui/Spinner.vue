<template>
  <div class="wrapper">
    <div class="spinner"/>
  </div>
</template>

<style lang="scss" scoped>
$main-color: #80260f;
$border-color: rgba($main-color, .2);

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid;
  border-radius: 50%;
  border-color: $border-color $border-color $border-color $main-color;
  margin: auto;
  animation: spin 1s linear infinite;
}

.wrapper {
  padding: 20px 10px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
