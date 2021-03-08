<template>
  <div class="mt-3 mb-3">
    <span class="label mr-5"><b>{{ user.followers.length }}</b> Followers</span>
    <span class="label"><b>{{ user.following.length }}</b> Following</span>
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
  color: #5b7083;

  b {
    color: #000;
  }
}
</style>
