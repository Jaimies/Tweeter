<template>
  <BaseModal v-model="isShown">
    <BaseInput label="Name" v-model="name"/>
    <BaseInput label="Bio" v-model="bio"/>
    <v-btn class="save" @click="saveProfile">Save</v-btn>
  </BaseModal>
</template>

<script>
import BaseInput from "@/ui/components/ui/Input"
import BaseModal from "@/ui/components/ui/Modal"
import {provideUpdateProfileUseCase} from "@/di/provideUseCases"
import {User} from "@/domain/model/User"
import {clone} from "@/shared/ObjectUtil"

const updateProfileUseCase = provideUpdateProfileUseCase()

export default {
  components: {BaseInput, BaseModal},
  props: {
    user: User,
    value: Boolean,
  },
  data() {
    return {
      name: this.user.name,
      bio: this.user.bio
    }
  },
  methods: {
    async saveProfile() {
      updateProfileUseCase.run({bio: this.bio, name: this.name})
      const updatedUser = clone(this.user, {name: this.name, bio: this.bio})
      this.$emitBubbling("updateUser", updatedUser)
      this.$emit("close")
    }
  },
  computed: {
    isShown: {
      get() { return this.value },
      set(value) { this.$emit("input", value) },
    }
  }
}
</script>

<style scoped>
.save {
  margin-left: auto;
}
</style>
