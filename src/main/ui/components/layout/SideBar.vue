<template>
  <div>
    <v-navigation-drawer :value="true" floating app class="drawer pt-2">
      <v-list nav dense>
        <v-list-item-group
            active-class="primary--text text--accent-4">
          <v-list-item :to="homeLink">
            <v-list-item-icon>
              <v-icon>{{ icons.home }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/users">
            <v-list-item-icon>
              <v-icon>{{ icons.users }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Explore users</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mdiAccount, mdiHome} from "@mdi/js"

const icons = {
  home: mdiHome,
  users: mdiAccount
}

export default {
  data: () => ({icons}),
  computed: {
    homeLink() {
      const isAuthenticated = this.$store.state.isAuthenticated
      return isAuthenticated ? "/home" : "/"
    }
  }
}
</script>
