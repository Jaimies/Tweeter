<template>
  <div class="card">
    <UserHeader :user="user"/>
    <template v-if="isAuthenticated">
      <EditButton :user="user" v-if="isCurrentUser"/>
      <FollowButton :user="user" v-else/>
    </template>
  </div>
</template>

<script>
import {User} from "@/domain/model/User"
import FollowButton from "@/ui/components/user/FollowButton"
import UserHeader from "@/ui/components/user/Header"
import EditButton from "@/ui/components/user/EditButton"
import {provideGetUserUseCase} from "@/di/provideUseCases"

export default {
  components: {EditButton, UserHeader, FollowButton},
  props: {
    user: User
  },
  data() {
    return {
      isAuthenticated: null,
      isCurrentUser: null
    }
  },

  async created() {
    const currentUser = await provideGetUserUseCase().run()
    this.isAuthenticated = !!currentUser
    this.isCurrentUser = currentUser.id == this.user.id
  }
}
</script>
