<template>
   <RouterLink :to="`/` + user.id" class="card routerLink block">
    <div class="header">{{ user.name }}</div>
    <div class="secondaryHeader">@{{ user.id }}</div>
    <p class="bio">{{ user.bio }}</p>
  </RouterLink>
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
  margin-top: 5px;
}
</style>
