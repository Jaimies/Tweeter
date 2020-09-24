<template>
  <div class="container feed">
    <ComposeTweetForm/>
    <TweetFeed :tweets="tweets"/>
  </div>
</template>

<script>
import ComposeTweetForm from "../views/ComposeTweetForm"
import TweetFeed from "../views/TweetFeed"
import {provideGetTweetsUseCase, provideGetUserUseCase} from "../../di/provideUseCases"
import {mapTweetToPresentation} from "../model/UiTweet"
import {mapList} from "../../shared/RxOperators"

const user = provideGetUserUseCase().run()
const tweets = provideGetTweetsUseCase().run(user.id)

export default {
  components: {TweetFeed, ComposeTweetForm},
  subscriptions: () => ({
    tweets: tweets.pipe(mapList(mapTweetToPresentation))
  })
}
</script>

<style>
.feed {
  border: 1px solid #ddd;
  border-bottom: none;
}
</style>
