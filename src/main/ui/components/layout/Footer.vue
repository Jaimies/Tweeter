<template>
  <footer class="footer" v-if="isLoggedIn">
    <button @click="logout">Logout</button>
  </footer>
</template>

<script>
import {provideCheckIfLoggedInUseCase, provideLogoutUseCase} from "@/di/provideUseCases"

const logout = provideLogoutUseCase()
const checkIfLoggedIn = provideCheckIfLoggedInUseCase()

export default {
  data: () => ({
    isLoggedIn: checkIfLoggedIn.run()
  }),
  methods: {
    logout() {
      logout.run()
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@use "scss/base" as *;

.footer {
  @extend .container;
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
