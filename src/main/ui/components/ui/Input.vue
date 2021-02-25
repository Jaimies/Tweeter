<template>
  <v-text-field :type="type"
                outlined
                :value="value"
                :label="label"
                :autocomplete="autocomplete"
                @input="$emit(`input`, $event); resetValidation()"
                @blur="validate"
                :error-messages="error"
                @focus="resetValidation"/>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    error: String,
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
      if (this.validation) this.validation.$touch()
    }
  },
  computed: {
    showErrors() {
      return this.validation && this.validation.$error
    }
  }
}
</script>
