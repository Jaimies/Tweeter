<template>
  <form class="form" @submit.prevent="$emit(`submit`)" novalidate>
    <h1 class="v-heading mb-6 mt-6 text-center">
      <slot name="heading"/>
    </h1>
    <slot/>
    <v-btn :disabled="!isValid || isLoading" type="submit" block :loading="isLoading">
      <slot name="submitBtn"/>
    </v-btn>
  </form>
</template>

<script>
export default {
  props: {
    isValid: Boolean,
    isLoading: Boolean,
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
