<template>
  <div>
    <FeedItem v-for="tweet of getTweets()" :tweet="tweet"/>
  </div>
</template>

<script>
import FeedItem from "./FeedItem.vue"

export default {
  components: {FeedItem},
  inject: ["getTweets"]
}
</script>