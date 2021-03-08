<template>
  <UserList :users="followers"/>
</template>

<script>
import {provideGetFollowersUseCase} from "@/di/provideUseCases"
import UserList from "@/ui/pages/UserList"

const getFollowers = provideGetFollowersUseCase()

export default {
  components: { UserList },
  props: {
    username: String
  },
  asyncComputed: {
    followers() {
      return getFollowers.getFollowersByUsername(this.username)
    },
  },
}
</script>
