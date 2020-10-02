<template>
   <RouterLink :to="`/` + user.id" class="card routerLink block">
    <div class="header">{{ user.name }}</div>
    <div class="secondaryHeader">@{{ user.id }}</div>
    <p>{{ user.bio }}</p>
  </RouterLink>
</template>

<script>
import {User} from "../../domain/model/User"

export default {
  props: {
    user: User
  }
}
</script>
