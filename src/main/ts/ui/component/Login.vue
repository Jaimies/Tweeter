<template>
  <div class="container">
    <button @click="signIn">Login</button>
  </div>
</template>

<script>
export default {
  inject: ["performSignIn"],
  methods: {
    signIn() {
      this.performSignIn()
      this.$router.push("/home")
    }
  }
}
</script>