<template>
  <footer class="footer">
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <p v-else>Tweeter is open source! Check out the <a href="https://github.com/Jaimies/Tweeter">repository</a>.</p>
  </footer>
</template>

<script>
import {provideLogoutUseCase} from "@/di/provideUseCases"

const logout = provideLogoutUseCase()

export default {
  data() {
    return {
      isLoggedIn: this.$store.state.isAuthenticated
    }
  },

  methods: {
    async logout() {
      await logout.run()
      this.$router.push("/")
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@use "scss/base" as *;

.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  border: 1px solid #ddd;
  padding: 15px;
  z-index: 2;
  background: #fff;
  box-shadow: #dddddd 0 -2px 10px;
  transform: translateX(-50%);
}
</style>
