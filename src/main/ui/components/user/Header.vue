<template>
  <div>
    <h1 class="header -large">{{ user.name }}</h1>
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

.header {
  margin: 0;
}
</style>
