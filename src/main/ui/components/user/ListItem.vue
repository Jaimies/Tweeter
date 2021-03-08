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
import FollowButton from "@/ui/components/follow/FollowButton"

export default {
  components: {FollowButton},
  props: {
    user: User
  },

  data() {
    return {
      isAuthenticated: this.$store.state.isAuthenticated
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
