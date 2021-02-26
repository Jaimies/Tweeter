<template>
  <div>
    <TweetFeedItem v-for="tweet of normalizedTweets" :tweet="tweet" :key="tweet.id"/>
  </div>
</template>

<script>
import TweetFeedItem from "./FeedItem.vue"
import {provideUiTweetMapper} from "@/di/provideMappers"

const mapper = provideUiTweetMapper()

export default {
  components: {TweetFeedItem},
  props: {
    tweets: Array
  },
  asyncComputed: {
    normalizedTweets() {
      if (!this.tweets) return []
      const tweetPromises = this.tweets.map((tweet) => mapper.map(tweet))
      return Promise.all(tweetPromises)
    }
  }
}
</script>
