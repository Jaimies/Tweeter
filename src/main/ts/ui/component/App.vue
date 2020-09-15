<template>
  <div>
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