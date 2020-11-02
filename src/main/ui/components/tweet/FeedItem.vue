<template>
  <div class="card">
    <div>
      <RouterLink :to="`/` + tweet.author.username" class="routerLink">
        <span class="header">{{ tweet.author.name }}</span>
        <span class="secondaryHeader">@{{ tweet.author.username }}</span>
      </RouterLink>
      <time :datetime="tweet.isoDate" class="secondaryHeader">
        {{ tweet.displayDate }}
      </time>
    </div>
    <p>{{ tweet.body }}</p>
  </div>
</template>

<script>
import {UiTweet} from "@/ui/model/UiTweet"

export default {
  props: {
    tweet: UiTweet
  }
}
</script>
