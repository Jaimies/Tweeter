<template>
  <div class="card">
    <div class="header -large">{{ normalizedUser.name }}</div>
    <div class="secondaryHeader">@{{ normalizedUser.id }}</div>
    <p class="bio">{{ normalizedUser.bio }}</p>

    <button class="floating" v-if="isCurrentUser" @click="showEditModal = true">Edit</button>

    <ToggleButton class="floating" v-else :enabled="isFollowed" @toggle="toggleFollowing">
      <template #enabledText>Following</template>
      <template #disabledText>Follow</template>
    </ToggleButton>

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
import ToggleButton from "./ToggleButton"
import {mapUserToPresentation} from "../model/UiUser"
import {unconcat} from "../../shared/ArrayUtil"

const currentUser = provideGetUserUseCase().run()

export default {
  components: {ToggleButton, EditProfileModal, BaseInput, BaseModal},
  props: {
    user: User
  },
  data() {
    return {
      showEditModal: false,
      name: this.user.name,
      bio: this.user.bio,
      isFollowed: currentUser.followsUserWithId(this.user.id)
    }
  },
  computed: {
    normalizedUser() {
      return mapUserToPresentation(this.user)
    },
    isCurrentUser() {
      return currentUser && this.user.id == currentUser.id
    }
  },
  methods: {
    saveProfile() {
      this.showEditModal = false
      const newUser = {...this.user, bio: this.bio, name: this.name}
      provideUpdateUserUseCase().run(newUser)
      this.$emit("update", newUser)
    },
    toggleFollowing() {
      const updatedFollowing = this.isFollowed ?
          currentUser.following.concat(this.user.id) :
          unconcat(this.isCurrentUser.following, this.user.id)

      const updatedUser = {...currentUser, following: updatedFollowing}
      provideUpdateUserUseCase().run(updatedUser)
      this.isFollowed = !this.isFollowed
    }
  }
}
</script>

<style scoped>
.bio {
  margin-top: 10px;
}

.floating {
  position: absolute;
  top: 15px;
  right: 15px;
}

.save {
  margin-left: auto;
}
</style>
