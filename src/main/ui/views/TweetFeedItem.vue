<template>
  <div class="card">
    <div>
      <RouterLink :to="`/` + tweet.author.id" class="routerLink">
        <span class="header">{{ tweet.author.name }}</span>
        <span class="secondaryHeader">@{{ tweet.author.id }}</span>
      </RouterLink>
      <time :datetime="tweet.isoDate" class="secondaryHeader">
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
