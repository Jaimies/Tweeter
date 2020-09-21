<template>
  <div>
    <TweetFeedItem v-for="tweet of tweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"
import {mapTweetToPresentation} from "../model/UiTweet"
import {provideGetTweetsUseCase} from "../../di/provideUseCases"
import Vue from "vue"

const tweetsObservable = Vue.observable({tweets: provideGetTweetsUseCase().run()})

export default {
  components: {TweetFeedItem},
  computed: {
    tweets() {
      return tweetsObservable.tweets.map(mapTweetToPresentation)
    }
  }
}
</script>
