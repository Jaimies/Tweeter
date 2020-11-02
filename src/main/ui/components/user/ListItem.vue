<template>
  <RouterLink :to="`/` + user.username" class="card routerLink block">
    <div class="header">{{ user.name }}</div>
    <div class="secondaryHeader">@{{ user.username }}</div>
    <p class="bio">{{ user.bio }}</p>

    <FollowButton :user="user" @click.native.prevent/>
  </RouterLink>
</template>

<script>
import {User} from "@/domain/model/User"
import FollowButton from "@/ui/components/user/FollowButton"

export default {
  components: {FollowButton},
  props: {
    user: User
  }
}
</script>

<style scoped>
.bio {
  margin-top: 5px;
}
</style>
