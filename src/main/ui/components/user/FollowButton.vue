<template>
  <ToggleButton class="floating-btn"
                @toggle="isFollowed = !isFollowed"
                @check="follow"
                @uncheck="unfollow"
                :checked="isFollowed">
    <template #enabledText>Following</template>
    <template #disabledText>Follow</template>
  </ToggleButton>
</template>

<script>
import ToggleButton from "@/ui/components/ui/ToggleButton"
import {provideFollowUserUseCase, provideGetUserUseCase, provideUnfollowUserUseCase} from "@/di/provideUseCases"
import {User} from "@/domain/model/User"

const currentUser = await provideGetUserUseCase().run()

export default {
  components: {ToggleButton},
  props: {
    user: User
  },
  data() {
    return {
      isFollowed: currentUser && currentUser.followsUserWithId(this.user.id)
    }
  },
  methods: {
    follow() {
      provideFollowUserUseCase().run(this.user.id)
    },
    unfollow() {
      provideUnfollowUserUseCase().run(this.user.id)
    }
  }
}
</script>
