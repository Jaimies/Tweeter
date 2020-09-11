<template>
  <div>
    <p>{{ tweet.body }}</p>
  </div>
</template>

<script>
import {Tweet} from "../../domain/model/Tweet"

export default {
  props: {
    tweet: Tweet
  },
}
</script>