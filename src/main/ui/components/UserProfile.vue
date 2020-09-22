<template>
  <div class="container feed">
    <UserCard v-if="user" :user="user"/>
    <ProfileNotFoundCard v-else/>
  </div>
</template>

<script>
import {provideFindUserByIdUseCase} from "../../di/provideUseCases"
import UserCard from "../views/UserCard"
import ProfileNotFoundCard from "../views/UserNotFoundCard"

export default {
  components: {ProfileNotFoundCard, UserCard},
  props: {
    id: String
  },
  computed: {
    user() {
      return provideFindUserByIdUseCase().run(this.id)
    }
  }
}
</script>
