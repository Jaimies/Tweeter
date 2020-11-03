<template>
  <div class="feed">
    <template v-if="!isLoading">
      <UserCard @updateUser="user = $event" v-if="user" :user="user"/>
      <ProfileNotFoundCard v-else/>
      <TweetFeed :tweets="tweets"/>
    </template>
    <Spinner v-else/>
  </div>
</template>

<script>
import {provideFindUserUseCase, provideGetTweetsByUserUseCase} from "@/di/provideUseCases"
import UserCard from "../components/user/Card"
import ProfileNotFoundCard from "../components/user/NotFoundCard"
import TweetFeed from "../components/tweet/Feed"
import Spinner from "@/ui/components/ui/Spinner"

const getTweets = provideGetTweetsByUserUseCase()
const findUser = provideFindUserUseCase()

export default {
  components: {Spinner, TweetFeed, ProfileNotFoundCard, UserCard},
  props: {
    username: String
  },
  subscriptions() {
    return {tweets: getTweets.run(this.username)}
  },
  data() {
    return {
      user: null,
      isLoading: true
    }
  },

  async created() {
    this.user = await findUser.run(this.username)
    this.isLoading = false
  }
}
</script>
