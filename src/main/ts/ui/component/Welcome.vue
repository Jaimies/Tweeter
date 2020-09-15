<template>
  <div v-else class="container">
    <p>Hey there! Please log in to continue to Twitter.</p>
    <button @click="goToSignIn()">Login</button>
  </div>
</template>

<script>
export default {
  inject: ["getUser", "performSignIn"],
  data() {
    return {
      isSignedIn: this.getUser() != null
    }
  },
  methods: {
    goToSignIn() {
      this.$router.push("/login")
    }
  }
}
</script>

<style>
.container {
  margin: auto;
  width: 598px;
}
</style>