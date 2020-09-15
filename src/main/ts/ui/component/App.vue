<template>
  <div class="container feed" v-if="isSignedIn">
    <ComposeTweetForm/>
    <TweetFeed/>
  </div>
  <div class="container" v-else>
    <p>Hey there! Please log in to continue to Twitter.</p>
    <button @click="signIn()">Sign in</button>
  </div>
</template>

<script>
import TweetFeed from "./TweetFeed"
import ComposeTweetForm from "./ComposeTweetForm"

export default {
  inject: ["getUser", "performSignIn"],
  components: {ComposeTweetForm, TweetFeed},
  data() {
    return {
      isSignedIn: this.getUser() != null
    }
  },
  methods: {
    signIn() {
      this.performSignIn()
      location.reload()
    }
  }
}
</script>

<style>
.container {
  width: 598px;
  margin: auto;
}

.feed {
  border: 1px solid #ddd;
  border-bottom: none;
}
</style>