<template>
  <div class="feed">
    <ComposeTweetForm/>
    <TweetFeed :tweets="tweets"/>
  </div>
</template>

<script>
import ComposeTweetForm from "../components/tweet/ComposeForm"
import TweetFeed from "../components/tweet/Feed"
import {provideGetTweetsUseCase, provideGetUserUseCase} from "@/di/provideUseCases"

const user = provideGetUserUseCase().run()
const tweets = provideGetTweetsUseCase().run(user.id)

export default {
  components: {TweetFeed, ComposeTweetForm},
  subscriptions: () => ({tweets})
}
</script>
