<template>
  <v-btn :disabled="!isValid || isLoading" type="submit" block :loading="isLoading">
    <slot/>
  </v-btn>
</template>
<script>
export default {
  props: {
    isLoading: Boolean,
    isValid: Boolean,
  }
}
</script>
