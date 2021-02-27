<template>
  <v-btn icon @click="emitEvent" :title="isLiked ? `Unlike` : `Like`">
    <v-icon size="19" :color="color">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
import {mdiHeart, mdiHeartOutline} from "@mdi/js"

export default {
  props: {
    isLiked: Boolean,
  },
  computed: {
    icon() {
      return this.isLiked ? mdiHeart : mdiHeartOutline
    },
    color() {
      return this.isLiked ? "red" : "default"
    },
  },
  methods:  {
    emitEvent() {
      this.$emit(this.isLiked ? "unlike" : "like")
    }
  },
}
</script>
