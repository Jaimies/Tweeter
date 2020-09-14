<template>
  <div>
    <div>
      <span>{{ tweet.author.name }}</span>
      <span>@{{ tweet.author.id }}</span>
    </div>
    <p>{{ tweet.body }}</p>
  </div>
</template>

<script>
import {UiTweet} from "../model/UiTweet"

export default {
  props: {
    tweet: UiTweet
  }
}
</script>