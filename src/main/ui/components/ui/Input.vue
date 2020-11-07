<template>
  <label class="label">
    {{ label }}:
    <input :type="type"
           :value="value"
           :autocomplete="autocomplete"
           class="input"
           @input="$emit(`input`, $event.target.value); resetValidation()"
           @blur="validate"
           @focus="resetValidation">

    <slot v-if="showErrors"/>
  </label>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    validation: Object,
    autocomplete: {
      type: String,
      default: "on"
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    resetValidation() {
      if (this.validation) this.validation.$reset()
    },

    validate() {
      if(this.validation) this.validation.$touch()
    }
  },
  computed: {
    showErrors() {
      return this.validation && this.validation.$error
    }
  }
}
</script>

<style scoped>
.label {
  display: block;
  text-align: left;
  margin-bottom: 15px;
}

.input {
  display: block;
  font-size: 19px;
  padding: 5px 10px 5px;
  width: 100%;
}
</style>
