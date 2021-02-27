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
  </div>
</template>

<script>
import {UiTweet} from "@/ui/model/UiTweet"
import LikeButton from "@/ui/components/ui/LikeButton"
import {provideLikeTweetUseCase} from "@/di/provideUseCases"

const likeTweetUseCase = provideLikeTweetUseCase()

export default {
  components: {LikeButton},
  props: {
    tweet: UiTweet
  },
  methods: {
    like() {
      likeTweetUseCase.likeTweet(this.tweet.id)
    },
    unlike() {
      likeTweetUseCase.unlikeTweet(this.tweet.id)
    }
  },
}
</script>
