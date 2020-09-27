<template>
  <div class="card listItem">
    <div class="listItem__header -large">{{ user.name }}</div>
    <div class="listItem__secondaryHeader">@{{ user.id }}</div>
    <p class="bio">{{ user.bio }}</p>
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
    isCurrentUser() {
      return this.user.id == provideGetUserUseCase().run().id
    }
  },
  methods: {
    saveProfile() {
      this.showEditModal = false
      const newUser = new User(this.user.id, this.name, this.user.email, this.bio)
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

.card {
  position: relative;
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
