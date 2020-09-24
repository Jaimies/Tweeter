<template>
  <div>
    <TweetFeedItem v-for="tweet of tweets" :tweet="tweet"/>
  </div>
</template>

<script>
import TweetFeedItem from "./TweetFeedItem.vue"

export default {
  components: {TweetFeedItem},
  props: {
    tweets: Array
  }
}
</script>
