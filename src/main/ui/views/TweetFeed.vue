<template>
  <div>
    <TweetFeedItem v-for="tweet of tweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"
import {mapTweetToPresentation} from "../model/UiTweet"
import {provideGetTweetsUseCase, provideGetUserUseCase} from "../../di/provideUseCases"
import {mapList} from "../../shared/RxOperators"

const user = provideGetUserUseCase().run()
const tweets = provideGetTweetsUseCase().run(user.id)

export default {
  components: {TweetFeedItem},
  subscriptions: () => ({
    tweets: tweets.pipe(mapList(mapTweetToPresentation))
  })
}
</script>
