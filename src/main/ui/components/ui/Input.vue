<template>
  <v-text-field :type="inputType"
                outlined
                :value="value"
                :label="label"
                :autocomplete="autocomplete"
                @input="$emit(`input`, $event); resetValidation()"
                @blur="validate"
                @click:append="showPassword = !showPassword"
                :append-icon="icon"
                :error-messages="error"
                @focus="resetValidation"/>
</template>

<script>
import {mdiEye, mdiEyeOff} from "@mdi/js"

export default {
  data: () => ({
    showPassword: false
  }),
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
    },
    icon() {
      if (this.type != "password") return null
      return this.showPassword ? mdiEye : mdiEyeOff
    },
    inputType() {
      return this.showPassword ? "text" : this.type
    }
  }
}
</script>
