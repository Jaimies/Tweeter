<template>
  <div>
    <RouterView :key="$route.path"/>
    <AppFooter/>
  </div>
</template>
<script>
import AppFooter from "@/ui/components/AppFooter"

export default {
  components: {AppFooter}
}
</script>
