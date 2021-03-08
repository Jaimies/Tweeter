<template>
  <RouterLink :to="`/` + user.username" class="card routerLink block">
    <div class="header">{{ user.name }}</div>
    <div class="secondaryHeader">@{{ user.username }}</div>
    <p class="bio">{{ user.bio }}</p>

    <FollowButton :user="user" v-if="showFollowButton" @click.native.prevent/>
  </RouterLink>
</template>

<script>
import {User} from "@/domain/model/User"
import FollowButton from "@/ui/components/follow/FollowButton"
import {provideGetCurrentUserUseCase} from "@/di/provideUseCases"
import {map} from "rxjs/operators"

const getUser = provideGetCurrentUserUseCase()

export default {
  components: { FollowButton },
  props: {
    user: User
  },
  subscriptions() {
    return {
      isCurrentUser: getUser.run().pipe(
          map(user => user.id == this.user.id)
      )
    }
  },
  computed: {
    showFollowButton() {
      return this.$store.state.isAuthenticated && !this.isCurrentUser
    }
  },
}
</script>

<style scoped>
.card {
  color: inherit;
}

.bio {
  margin-top: 5px;
}
</style>
