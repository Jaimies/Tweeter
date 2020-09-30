<template>
  <div class="feed">
    <UserListItem v-for="user of users" :key="user.id" :user="user"/>
  </div>
</template>

<script>
import {provideGetUsersUseCase} from "../../di/provideUseCases"
import UserListItem from "../views/UserListItem"

export default {
  components: {UserListItem},
  data() {
    return {
      users: provideGetUsersUseCase().run()
    }
  }
}
</script>
