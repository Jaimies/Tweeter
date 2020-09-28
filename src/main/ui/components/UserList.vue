<template>
  <div class="feed">
    <UserListItem v-for="user of users" :key="user.id" :user="user"/>
  </div>
</template>

<script>
import {provideGetUsersUseCase} from "../../di/provideUseCases"
import ToggleButton from "../views/ToggleButton"
import UserListItem from "../views/UserListItem"

export default {
  components: {UserListItem, ToggleButton},
  data() {
    return {
      users: provideGetUsersUseCase().run()
    }
  }
}
</script>
