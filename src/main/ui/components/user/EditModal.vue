<template>
  <BaseModal>
    <BaseInput label="Name" v-model="name"/>
    <BaseInput label="Bio" v-model="bio"/>
    <button class="save" @click="saveProfile">Save</button>
  </BaseModal>
</template>

<script>
import BaseInput from "@/ui/components/ui/BaseInput"
import BaseModal from "@/ui/components/ui/BaseModal"
import {provideGetUserUseCase, provideUpdateUserUseCase} from "@/di/provideUseCases"
import {User} from "@/domain/model/User"

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
      const updatedUser = {...this.user, bio: this.bio, name: this.name}
      provideUpdateUserUseCase().run(updatedUser)
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
