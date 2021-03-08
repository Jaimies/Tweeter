<template>
  <div class="container">
    <h1 class="v-heading mt-4 mb-6">Explore users</h1>
    <UserList :users="users"/>
  </div>
</template>

<script>
import {provideGetUsersUseCase} from "@/di/provideUseCases"
import UserList from "@/ui/pages/UserList"

export default {
  components: { UserList },
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
