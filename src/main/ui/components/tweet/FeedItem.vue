<template>
  <div class="card pb-2">
    <div>
      <RouterLink :to="`/` + tweet.author.username" class="routerLink">
        <span class="header">{{ tweet.author.name }}</span>
        <span class="secondaryHeader">@{{ tweet.author.username }}</span>
      </RouterLink>
      <time :datetime="tweet.isoDate" class="secondaryHeader">
        {{ tweet.displayDate }}
      </time>
    </div>
    <p class="mb-0">{{ tweet.body }}</p>
    <div class="d-flex align-center">
      <LikeButton :isLiked="tweet.isLiked" @like="like" @unlike="unlike"/>
      <span>{{ tweet.likesCount }}</span>
    </div>
    <LoginPopup v-model="showLoginPopup"/>
  </div>
</template>

<script>
import {UiTweet} from "@/ui/model/UiTweet"
import LikeButton from "@/ui/components/ui/LikeButton"
import {provideGetAuthStateUseCase, provideLikeTweetUseCase} from "@/di/provideUseCases"
import LoginPopup from "@/ui/auth/LoginPopup"
import {AuthState} from "@/domain/model/AuthState"

const likeTweetUseCase = provideLikeTweetUseCase()
const getAuthState = provideGetAuthStateUseCase()

export default {
  components: {LoginPopup, LikeButton},
  data: () => ({
    showLoginPopup: false
  }),
  props: {
    tweet: UiTweet
  },
  methods: {
    async like() {
      const authState = await getAuthState.run()
      if (authState == AuthState.Authenticated)
        likeTweetUseCase.likeTweet(this.tweet.id)
      else
        this.showLoginPopup = true
    },
    unlike() {
      likeTweetUseCase.unlikeTweet(this.tweet.id)
    }
  },
}
</script>
