<template>
  <UserList :users="following"/>
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
    following() {
      return getFollowers.getFollowingByUsername(this.username)
    },
  },
}
</script>
