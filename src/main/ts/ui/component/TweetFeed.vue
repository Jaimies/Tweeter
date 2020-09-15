<template>
  <div>
    <TweetFeedItem v-for="tweet of tweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"
import {mapTweetToPresentation} from "../model/UiTweet"

export default {
  components: {TweetFeedItem},
  inject: ["getTweets"],
  computed: {
    tweets() {
      return this.getTweets().tweets.map(mapTweetToPresentation)
    }
  }
}
</script>