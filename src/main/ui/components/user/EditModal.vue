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
import {provideGetUserUseCase, provideUpdateProfileUseCase} from "@/di/provideUseCases"
import {User} from "@/domain/model/User"
import {clone} from "@/shared/ObjectUtil"

const currentUser = provideGetUserUseCase().run()

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
    saveProfile() {
      const updatedUser = clone(this.user, {bio: this.bio, name: this.name})
      provideUpdateProfileUseCase().run(updatedUser)
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
