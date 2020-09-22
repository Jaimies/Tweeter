<template>
  <div class="listItem">
    <div>
      <RouterLink :to="`/` + tweet.author.id" class="routerLink">
        <span class="listItem__header">{{ tweet.author.name }}</span>
        <span class="listItem__secondaryHeader">@{{ tweet.author.id }}</span>
      </RouterLink>
      <time :datetime="tweet.isoDate" class="listItem__secondaryHeader">
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
