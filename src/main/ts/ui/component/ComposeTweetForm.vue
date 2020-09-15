<template>
  <div class="tweet">
    <textarea
        placeholder="What's on your mind?"
        v-model="tweetText"
        @keyup.ctlr.enter="tweet"></textarea>

    <div class="tweet__submit-wrapper">
      <button @click="tweet" :disabled="!tweetText">Tweet</button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["postTweet"],
  data: () => ({tweetText: ""}),
  methods: {
    tweet() {
      this.postTweet(this.tweetText)
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