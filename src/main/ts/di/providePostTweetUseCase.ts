import {provideTweetRepository} from "./provideTweetRepository"
import {PostTweetUseCase} from "../domain/usecase/PostTweetUseCase"

const tweetRepository = provideTweetRepository()
const tweetUseCase = new PostTweetUseCase(tweetRepository)

export function providePostTweetUseCase() {
    return tweetUseCase
}