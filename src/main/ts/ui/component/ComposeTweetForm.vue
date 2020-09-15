<template>
  <div>
    <textarea id="tweetTextarea"
              placeholder="Tweet something"
              v-model="tweetText"
              @keyup.ctlr.enter="tweet"></textarea>
    <button @click="tweet" :disabled="!tweetText">Tweet</button>
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