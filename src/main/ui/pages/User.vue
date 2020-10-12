<template>
  <div class="feed">
    <UserCard @update="user = $event" v-if="user" :user="user"/>
    <ProfileNotFoundCard v-else/>

    <TweetFeed :tweets="tweets"/>
  </div>
</template>

<script>
import {provideFindUserByIdUseCase, provideGetTweetsUseCase} from "@/di/provideUseCases"
import UserCard from "../components/user/Card"
import ProfileNotFoundCard from "../components/user/NotFoundCard"
import TweetFeed from "../components/tweet/Feed"

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
  data() {
    return {user: provideFindUserByIdUseCase().run(this.id)}
  }
}
</script>
