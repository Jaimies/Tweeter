<template>
  <RouterLink :to="`/` + user.username" class="card routerLink block">
    <div class="header">{{ user.name }}</div>
    <div class="secondaryHeader">@{{ user.username }}</div>
    <p class="bio">{{ user.bio }}</p>

    <FollowButton :user="user" v-if="isAuthenticated" @click.native.prevent/>
  </RouterLink>
</template>

<script>
import {User} from "@/domain/model/User"
import FollowButton from "@/ui/components/user/FollowButton"
import {provideGetAuthStateUseCase} from "@/di/provideUseCases"
import {AuthState} from "@/domain/model/AuthState"

const getAuthState = provideGetAuthStateUseCase()

export default {
  components: {FollowButton},
  props: {
    user: User
  },

  data() {
    return {
      isAuthenticated: false
    }
  },

  async created() {
    this.isAuthenticated = await getAuthState.run() == AuthState.Authenticated
  }
}
</script>

<style scoped>
.bio {
  margin-top: 5px;
}
</style>
