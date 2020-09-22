<template>
  <div class="listItem">
    <div class="listItem__header">{{ user.name }}</div>
    <div class="listItem__secondaryHeader">@{{ user.id }}</div>
    <p>User's profile description.</p>
  </div>
</template>

<script>
import {User} from "../../domain/model/User"

export default {
  props: {
    user: User
  }
}
</script>
