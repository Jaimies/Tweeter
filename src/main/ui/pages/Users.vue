<template>
  <div class="container">
    <h1 class="v-heading mt-4 mb-6">Explore users</h1>
    <div class="feed" v-if="!isLoading">
      <UserListItem v-for="user of users" :key="user.id" :user="user"/>
    </div>
    <Spinner v-else/>
  </div>
</template>

<script>
import {provideGetUsersUseCase} from "@/di/provideUseCases"
import UserListItem from "../components/user/ListItem"
import Spinner from "@/ui/components/ui/Spinner"

export default {
  components: {Spinner, UserListItem},
  data() {
    return {
      isLoading: true,
      users: null
    }
  },

  async created() {
    this.users = await provideGetUsersUseCase().run()
    this.isLoading = false
  }
}
</script>
