<template>
  <div class="tweet">
    <textarea
        v-model="tweetText"
        placeholder="What's on your mind?"
        @keyup.ctlr.enter="tweet"></textarea>

    <div class="tweet__submit-wrapper">
      <button :disabled="!tweetText" @click="tweet">Tweet</button>
    </div>
  </div>
</template>

<script>
import {providePostTweetUseCase} from "../../di/providePostTweetUseCase"

export default {
  data: () => ({tweetText: ""}),
  methods: {
    tweet() {
      providePostTweetUseCase().run(this.tweetText)
      this.tweetText = ""
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet {
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &__submit-wrapper {
    text-align: right;
  }
}
</style>