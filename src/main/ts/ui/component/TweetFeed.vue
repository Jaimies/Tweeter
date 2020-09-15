<template>
  <div>
    <TweetFeedItem v-for="tweet of getTweets()" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"

export default {
  components: {TweetFeedItem},
  inject: ["getTweets"]
}
</script>