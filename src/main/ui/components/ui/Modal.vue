<template>
  <v-dialog
      v-model="isShown"
      max-width="500">
    <v-card class="pa-6">
      <slot/>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    isShown: {
      get() { return this.value },
      set(value) { this.$emit("input", value) },
    }
  }
}
</script>