<template>
  <div class="feed">
    <ComposeTweetForm/>
    <TweetFeed :tweets="tweets"/>
  </div>
</template>

<script>
import ComposeTweetForm from "../components/tweet/ComposeForm"
import TweetFeed from "../components/tweet/Feed"
import {provideGetFeedUseCase} from "@/di/provideUseCases"

const tweets = provideGetFeedUseCase().run()

export default {
  components: {TweetFeed, ComposeTweetForm},
  subscriptions: () => ({tweets})
}
</script>
