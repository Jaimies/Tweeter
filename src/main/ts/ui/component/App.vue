<template>
  <div class="container">
    <ComposeTweetForm/>
    <TweetFeed/>
  </div>
</template>

<script>
import TweetFeed from "./TweetFeed"
import ComposeTweetForm from "./ComposeTweetForm"

export default {
  components: {ComposeTweetForm, TweetFeed}
}
</script>

<style>
.container {
  width: 598px;
  margin: auto;
  border: 1px solid #ddd;
  border-bottom: none;
}
</style>