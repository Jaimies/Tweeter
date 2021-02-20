<template>
  <form class="form" @submit.prevent="$emit(`submit`)" novalidate>
    <slot/>
  </form>
</template>

<style scoped>
.form {
  margin: auto;
  text-align: center;
  width: 364px;
}
</style>
