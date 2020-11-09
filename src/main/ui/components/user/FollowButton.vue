<template>
  <ToggleButton class="floating-btn"
                @check="follow"
                @uncheck="unfollow"
                :checked="isFollowed">
    <template #enabledText>Following</template>
    <template #disabledText>Follow</template>
  </ToggleButton>
</template>

<script>
import ToggleButton from "@/ui/components/ui/ToggleButton"
import {provideFollowUserUseCase, provideGetCurrentUserUseCase, provideUnfollowUserUseCase} from "@/di/provideUseCases"
import {User} from "@/domain/model/User"
import {map} from "rxjs/operators"

export default {
  components: {ToggleButton},
  props: {
    user: User
  },
  subscriptions() {
    return {
      isFollowed: provideGetCurrentUserUseCase().run().pipe(
          map(user => user && user.followsUserWithId(this.user.id))
      )
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
