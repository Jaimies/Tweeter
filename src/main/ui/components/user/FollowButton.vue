<template>
  <ToggleButton class="floating-btn" :enabled="isFollowed" @toggle="toggleFollowing">
    <template #enabledText>Following</template>
    <template #disabledText>Follow</template>
  </ToggleButton>
</template>

<script>
import ToggleButton from "@/ui/components/ui/ToggleButton"
import {provideGetUserUseCase, provideUpdateProfileUseCase} from "@/di/provideUseCases"
import {unconcat} from "@/shared/ArrayUtil"
import {User} from "@/domain/model/User"
import {clone} from "@/shared/ObjectUtil"

const currentUser = provideGetUserUseCase().run()

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
    toggleFollowing() {
      const updatedFollowing = this.isFollowed ?
          unconcat(currentUser.following, this.user.id) :
          currentUser.following.concat(this.user.id)

      const updatedUser = clone(currentUser, {following: updatedFollowing})
      provideUpdateProfileUseCase().run(updatedUser)
      this.isFollowed = !this.isFollowed
    }
  }
}
</script>
