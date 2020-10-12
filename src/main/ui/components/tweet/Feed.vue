<template>
  <div>
    <TweetFeedItem v-for="tweet of normalizedTweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./FeedItem.vue"
import {mapTweetToPresentation} from "@/ui/model/UiTweet"

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
