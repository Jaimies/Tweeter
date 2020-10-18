<template>
  <button @click="$emit('toggle')">
    <span v-if="checked"><slot name="enabledText"/></span>
    <span v-else><slot name="disabledText"/></span>
  </button>
</template>

<script>
export default {
  props: {
    checked: Boolean
  }
}
</script>
