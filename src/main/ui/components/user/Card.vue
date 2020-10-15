<template>
  <div class="card">
    <UserHeader :user="user"/>
    <EditButton :user="user" v-if="isCurrentUser"/>
    <FollowButton :user="user" v-else/>
  </div>
</template>

<script>
import {User} from "@/domain/model/User"
import FollowButton from "@/ui/components/user/FollowButton"
import UserHeader from "@/ui/components/user/Header"
import EditButton from "@/ui/components/user/EditButton"
import {provideGetUserUseCase} from "@/di/provideUseCases"

const currentUser = provideGetUserUseCase().run()

export default {
  components: {EditButton, UserHeader, FollowButton},
  props: {
    user: User
  },
  data() {
    return {
      isCurrentUser: currentUser && currentUser.id == this.user.id
    }
  }
}
</script>
