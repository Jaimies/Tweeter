<template>
  <v-app>
    <SideBar/>
    <v-main v-if="!isLoading" class="main">
        <RouterView :key="$route.path"/>
    </v-main>
    <Spinner v-else/>
    <AppFooter/>
  </v-app>
</template>
<script>
import AppFooter from "@/ui/components/layout/Footer"
import SideBar from "@/ui/components/layout/SideBar"
import Spinner from "@/ui/components/ui/Spinner"

export default {
  components: {Spinner, AppFooter, SideBar},
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>
.main {
  width: 600px;
  margin: 0 auto;
  text-align: initial;
}
</style>
