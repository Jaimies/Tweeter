<template>
  <div>
    <SideBar/>
    <RouterView :key="$route.path" v-if="!isLoading"/>
    <Spinner v-else/>
    <AppFooter/>
  </div>
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
