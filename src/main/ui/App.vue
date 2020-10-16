<template>
  <div>
    <SideBar/>
    <RouterView :key="$route.path"/>
    <AppFooter/>
  </div>
</template>
<script>
import AppFooter from "@/ui/components/layout/Footer"
import SideBar from "@/ui/components/layout/SideBar"

export default {
  components: {AppFooter, SideBar}
}
</script>
