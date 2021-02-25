<template>
  <v-btn rounded :color="checked ? 'primary' : 'default'" @click="emitEvents">
    <template v-if="checked">
      <slot name="enabledText"/>
    </template>
    <template v-else>
      <slot name="disabledText"/>
    </template>
  </v-btn>
</template>

<script>
export default {
  props: {
    checked: Boolean
  },
  methods: {
    emitEvents() {
      this.$emit("toggle")
      const event = this.checked ? "uncheck" : "check"
      this.$emit(event)
    }
  }
}
</script>
