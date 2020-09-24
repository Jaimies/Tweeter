<template>
  <div>
    <TweetFeedItem v-for="tweet of tweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"
import {mapTweetToPresentation} from "../model/UiTweet"
import {provideGetTweetsUseCase} from "../../di/provideUseCases"
import {mapList} from "../../shared/RxOperators"

const tweetsObservable = provideGetTweetsUseCase().run()

export default {
  components: {TweetFeedItem},
  subscriptions: () => ({
    tweets: tweetsObservable.pipe(mapList(mapTweetToPresentation))
  })
}
</script>
