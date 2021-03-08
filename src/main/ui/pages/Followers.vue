<template>
  <div>
    <v-tabs v-model="tabIndex" @change="updateURL" grow>
      <v-tab>Followers</v-tab>
      <v-tab>Following</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabIndex">
      <v-tab-item>
        <FollowersList :username="username"/>
      </v-tab-item>
      <v-tab-item>
        <FollowingList :username="username"/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import {silentlyUpdateURL} from "@/shared/NavigationUtil"
import FollowersList from "@/ui/components/follow/FollowersList"
import FollowingList from "@/ui/components/follow/FollowingList"

const tabNames = ["followers", "following"]

export default {
  components: { FollowingList, FollowersList },
  data() {
    return {
      tabIndex: tabNames.indexOf(this.tab)
    }
  },
  props: {
    tab: String,
    username: String,
  },

  methods: {
    updateURL() {
      const page = tabNames[this.tabIndex]
      const params = { name: page, params: { username: this.username } }
      const route = this.$router.resolve(params)
      silentlyUpdateURL(route.href)
    },
  },
}
</script>
