<template>
  <div>
    <Tweet v-for="tweet of getTweets()" :tweet="tweet"/>
  </div>
</template>

<script>
import Tweet from "./FeedItem.vue"

export default {
  components: {Tweet},
  inject: ["getTweets"]
}
</script>