<template>
  <div class="card">
    <div class="header -large">{{ normalizedUser.name }}</div>
    <div class="secondaryHeader">@{{ normalizedUser.id }}</div>
    <p class="bio">{{ normalizedUser.bio }}</p>
    <button class="edit" v-if="isCurrentUser" @click="showEditModal = true">Edit</button>

    <BaseModal @close="showEditModal = false" v-if="showEditModal">
      <BaseInput label="Name" v-model="name"/>
      <BaseInput label="Bio" v-model="bio"/>
      <button class="save" @click="saveProfile">Save</button>
    </BaseModal>
  </div>
</template>

<script>
import {User} from "../../domain/model/User"
import {provideGetUserUseCase, provideUpdateUserUseCase} from "../../di/provideUseCases"
import BaseModal from "./BaseModal"
import BaseInput from "./BaseInput"
import EditProfileModal from "./EditProfileModal"
import {mapUserToPresentation} from "../model/UiUser"

export default {
  components: {EditProfileModal, BaseInput, BaseModal},
  props: {
    user: User
  },
  data() {
    return {
      showEditModal: false,
      name: this.user.name,
      bio: this.user.bio
    }
  },
  computed: {
    normalizedUser() {
      return mapUserToPresentation(this.user)
    },
    isCurrentUser() {
      const currentUser = provideGetUserUseCase().run()
      return currentUser && this.user.id == currentUser.id
    }
  },
  methods: {
    saveProfile() {
      this.showEditModal = false
      const newUser = {...this.user, bio: this.bio, name: this.name}
      provideUpdateUserUseCase().run(newUser)
      this.$emit("update", newUser)
    }
  }
}
</script>

<style scoped>
.bio {
  margin-top: 10px;
}

.edit {
  position: absolute;
  top: 15px;
  right: 15px;
}

.save {
  margin-left: auto;
}
</style>
