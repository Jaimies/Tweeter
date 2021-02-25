<template>
  <div class="tweet">
    <textarea
        v-model="tweetText"
        aria-label="Compose a tweet"
        placeholder="What's on your mind?"
        @keydown.enter.ctrl="tweet"/>

    <div class="tweet__submit-wrapper">
      <v-btn :disabled="!tweetIsValid" @click="tweet">Tweet</v-btn>
    </div>
  </div>
</template>

<script>
import {providePostTweetUseCase} from "@/di/provideUseCases"

export default {
  data: () => ({tweetText: ""}),
  methods: {
    tweet() {
      if (this.tweetIsValid) {
        providePostTweetUseCase().run(this.tweetText)
        this.tweetText = ""
      }
    }
  },
  computed: {
    tweetIsValid() {
      return !!this.tweetText.trim()
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
