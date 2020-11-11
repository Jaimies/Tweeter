<template>
  <BaseModal>
    <BaseInput label="Name" v-model="name"/>
    <BaseInput label="Bio" v-model="bio"/>
    <button class="save" @click="saveProfile">Save</button>
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
    user: User
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
  }
}
</script>

<style scoped>
.save {
  margin-left: auto;
}
</style>
