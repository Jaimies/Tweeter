import {provideTweetRepository} from "./ProvideTweetRepository"
import {PostTweetUseCase} from "../domain/usecase/PostTweetUseCase"

const tweetRepository = provideTweetRepository()
const tweetUseCase = new PostTweetUseCase(tweetRepository)

export function providePostTweetUseCase() {
    return tweetUseCase
}