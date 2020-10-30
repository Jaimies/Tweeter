<template>
  <div class="feed">
    <UserCard @updateUser="user = $event" v-if="user" :user="user"/>
    <ProfileNotFoundCard v-else/>

    <TweetFeed :tweets="tweets"/>
  </div>
</template>

<script>
import {provideFindUserUseCase, provideGetTweetsByUserUseCase} from "@/di/provideUseCases"
import UserCard from "../components/user/Card"
import ProfileNotFoundCard from "../components/user/NotFoundCard"
import TweetFeed from "../components/tweet/Feed"

const getTweets = provideGetTweetsByUserUseCase()
const findUser = provideFindUserUseCase()

export default {
  components: {TweetFeed, ProfileNotFoundCard, UserCard},
  props: {
    id: String
  },
  subscriptions() {
    return {tweets: getTweets.run(this.id)}
  },
  data() {
    return {user: findUser.run(this.id)}
  }
}
</script>
