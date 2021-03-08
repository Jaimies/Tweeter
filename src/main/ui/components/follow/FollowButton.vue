<template>
  <ToggleButton class="floating-btn"
                @check="follow"
                @uncheck="unfollow"
                :checked="isFollowed"
                v-if="!isLoading">
    <template #enabledText>Following</template>
    <template #disabledText>Follow</template>
  </ToggleButton>
</template>

<script>
import ToggleButton from "@/ui/components/ui/ToggleButton"
import {provideFollowUserUseCase, provideGetCurrentUserUseCase, provideUnfollowUserUseCase} from "@/di/provideUseCases"
import {User} from "@/domain/model/User"
import {first, map} from "rxjs/operators"

const currentUser$ = provideGetCurrentUserUseCase().run()

export default {
  components: {ToggleButton},
  props: {
    user: User
  },
  data() {
    return {
      isLoading: true
    }
  },
  subscriptions() {
    const isFollowed$ = currentUser$.pipe(
        map(user => user.followsUserWithId(this.user.id)),
    )

    isFollowed$.pipe(first()).subscribe(() => this.isLoading = false)

    return {isFollowed: isFollowed$}
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
