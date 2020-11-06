<template>
  <div class="container">
    <div class="feed">
      <ComposeTweetForm/>
      <TweetFeed :tweets="tweets" v-if="!isLoading"/>
    </div>
    <Spinner v-if="isLoading"/>
  </div>
</template>

<script>
import ComposeTweetForm from "../components/tweet/ComposeForm"
import TweetFeed from "../components/tweet/Feed"
import {provideGetFeedUseCase} from "@/di/provideUseCases"
import Spinner from "@/ui/components/ui/Spinner"
import {first} from "rxjs/operators"

const tweets = provideGetFeedUseCase().run()

export default {
  components: {Spinner, TweetFeed, ComposeTweetForm},
  data: () => ({
    isLoading: true
  }),
  subscriptions() {
    tweets.pipe(first()).subscribe(() => this.isLoading = false)
    return ({tweets})
  }
}
</script>
