<template>
  <form class="form" @submit.prevent="$emit(`submit`)">
    <h1 class="heading">{{ headingText }}</h1>
    <slot/>
    <button :disabled="!isValid" type="submit">{{ buttonText }}</button>
  </form>
</template>

<script>
export default {
  props: {
    headingText: String,
    buttonText: String,
    isValid: Boolean
  }
}
</script>

<style scoped>
.form {
  margin: auto;
  text-align: center;
  width: 320px;
}

.heading {
  font-size: 23px;
}
</style>
