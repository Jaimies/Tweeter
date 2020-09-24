<template>
  <div>
    <TweetFeedItem v-for="tweet of normalizedTweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"
import {mapTweetToPresentation} from "../model/UiTweet"

export default {
  components: {TweetFeedItem},
  props: {
    tweets: Array
  },
  computed: {
    normalizedTweets() {
      return this.tweets.map(mapTweetToPresentation)
    }
  }
}
</script>
