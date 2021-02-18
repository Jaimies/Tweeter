<template>
  <div>
    <v-btn class="floating-btn" @click="showModal = true">Edit</v-btn>
    <EditModal :user="user" v-if="showModal" @close="showModal = false"/>
  </div>
</template>

<script>
import EditModal from "@/ui/components/user/EditModal"
import {User} from "@/domain/model/User"

export default {
  components: {EditModal},
  props: {
    user: User
  },
  data: () => ({
    showModal: false
  })
}
</script>
