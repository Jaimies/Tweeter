<template>
  <div class="feed">
    <UserListItem v-for="user of users" :key="user.id" :user="user"/>
  </div>
</template>

<script>
import {provideGetUsersUseCase} from "@/di/provideUseCases"
import UserListItem from "../components/user/ListItem"

export default {
  components: {UserListItem},
  data() {
    return {
      users: null
    }
  },

  async created() {
    this.users = await provideGetUsersUseCase().run()
  }
}
</script>
