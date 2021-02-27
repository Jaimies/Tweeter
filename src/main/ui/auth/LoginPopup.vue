<template>
  <BaseModal v-model="isShown">
    <Welcome/>
  </BaseModal>
</template>

<script>
import BaseModal from "@/ui/components/ui/Modal"
import Welcome from "@/ui/pages/Welcome"

export default {
  components: {Welcome, BaseModal},
  props: {
    value: Boolean,
  },
  computed: {
    isShown: {
      get() { return this.value },
      set(value) { this.$emit("input", value) },
    }
  },
}
</script>
