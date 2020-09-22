<template>
  <div class="listItem">
    <div class="listItem__header -large">{{ user.name }}</div>
    <div class="listItem__secondaryHeader">@{{ user.id }}</div>
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
