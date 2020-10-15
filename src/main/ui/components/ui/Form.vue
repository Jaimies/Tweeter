<template>
  <form class="form" @submit.prevent="$emit(`submit`)">
    <h1 class="heading">
      <slot name="heading"/>
    </h1>
    <slot/>
    <button :disabled="!isValid" type="submit">
      <slot name="submitBtn"/>
    </button>
  </form>
</template>

<script>
export default {
  props: {
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
