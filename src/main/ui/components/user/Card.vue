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

export default {
  components: {EditButton, UserHeader, FollowButton},
  props: {
    user: User
  },
  data() {
    return {
      isCurrentUser: this.$store.state.userId == this.user.id,
      isAuthenticated: this.$store.state.isAuthenticated,
    }
  },
}
</script>
