<template>
  <label class="label">
    {{ label }}:
    <input :type="type"
           :value="value"
           class="input"
           @input="$emit(`input`, $event.target.value)">
  </label>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    type: {
      type: String,
      default: "text"
    }
  }
}
</script>

<style scoped>
.label {
  display: block;
  text-align: left;
}

.input {
  display: block;
  font-size: 19px;
  margin-bottom: 15px;
  padding: 5px 10px 5px;
  width: 100%;
}
</style>
