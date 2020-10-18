<template>
  <button @click="emitEvents">
    <span v-if="checked"><slot name="enabledText"/></span>
    <span v-else><slot name="disabledText"/></span>
  </button>
</template>

<script>
export default {
  props: {
    checked: Boolean
  },
  methods: {
    emitEvents() {
      this.$emit("toggle")
      const event = this.checked ? "uncheck": "check"
      this.$emit(event)
    }
  }
}
</script>
