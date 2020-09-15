<template>
  <div class="container feed">
    <ComposeTweetForm/>
    <TweetFeed/>
  </div>
</template>

<script>
import ComposeTweetForm from "./ComposeTweetForm"
import TweetFeed from "./TweetFeed"

export default {
  components: {TweetFeed, ComposeTweetForm}
}
</script>

<style>
.feed {
  border: 1px solid #ddd;
  border-bottom: none;
}
</style>