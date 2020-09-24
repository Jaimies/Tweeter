<template>
  <div class="container feed">
    <UserCard v-if="user" :user="user"/>
    <ProfileNotFoundCard v-else/>

    <TweetFeed :tweets="tweets"/>
  </div>
</template>

<script>
import {provideFindUserByIdUseCase, provideGetTweetsUseCase} from "../../di/provideUseCases"
import UserCard from "../views/UserCard"
import ProfileNotFoundCard from "../views/UserNotFoundCard"
import TweetFeed from "../views/TweetFeed"

export default {
  components: {TweetFeed, ProfileNotFoundCard, UserCard},
  props: {
    id: String
  },
  subscriptions() {
    return {
      tweets: provideGetTweetsUseCase().run(this.id)
    }
  },
  computed: {
    user() {
      return provideFindUserByIdUseCase().run(this.id)
    }
  }
}
</script>
