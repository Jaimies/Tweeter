<template>
  <div>
    <div class="header -large">{{ user.name }}</div>
    <div class="secondaryHeader">@{{ user.username }}</div>
    <p class="bio">{{ user.bio }}</p>
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

<style scoped>
.bio {
  margin-top: 10px;
}
</style>
