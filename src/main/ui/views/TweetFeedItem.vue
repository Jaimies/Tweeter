<template>
  <div class="tweet">
    <div>
      <span class="tweet__name">{{ tweet.author.name }}</span>
      <span class="tweet__id">@{{ tweet.author.id }}</span>
      <time :datetime="tweet.isoDate" class="tweet__time">
        {{ tweet.displayDate }}
      </time>
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

<style lang="scss">
.tweet {
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &__name {
    font-weight: bold;
  }

  &__id, &__time {
    color: #666;
  }
}
</style>