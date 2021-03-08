<template>
  <div class="feed" v-if="!isLoading">
    <UserListItem v-for="user of users" :key="user.id" :user="user"/>
  </div>
  <Spinner v-else/>
</template>

<script>
import Spinner from "@/ui/components/ui/Spinner"
import UserListItem from "../components/user/ListItem"

export default {
  components: { Spinner, UserListItem },
  props: {
    users: Array,
  },
  computed: {
    isLoading() {
      return this.users == null
    }
  }
}
</script>
