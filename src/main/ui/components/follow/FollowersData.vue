<template>
  <div class="mt-3 mb-3">
    <RouterLink to="followers" append class="label mr-5">
      <b>{{ user.followers.length }}</b> Followers
    </RouterLink>
    <RouterLink to="following" append class="label">
      <b>{{ user.following.length }}</b> Following
    </RouterLink>
  </div>
</template>

<script>
import {User} from "@/domain/model/User"

export default {
  props: {
    user: User
  }
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 15px;
  text-decoration: none;
  color: #5b7083;

  &:hover {
    text-decoration: underline;
  }

  b {
    color: #000;
  }
}
</style>
