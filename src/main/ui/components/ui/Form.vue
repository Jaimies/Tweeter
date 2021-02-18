<template>
  <form class="form" @submit.prevent="$emit(`submit`)">
    <h1 class="v-heading mb-6 mt-6 text-center">
      <slot name="heading"/>
    </h1>
    <slot/>
    <v-btn :disabled="!isValid" type="submit" block>
      <slot name="submitBtn"/>
    </v-btn>
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
  width: 364px;
}
</style>
