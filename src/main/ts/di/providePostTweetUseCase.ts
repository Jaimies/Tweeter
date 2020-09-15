import {provideTweetRepository} from "./provideTweetRepository"
import {PostTweetUseCase} from "../domain/usecase/PostTweetUseCase"
import {provideAuthRepository} from "./provideAuthRepository"

const tweetRepository = provideTweetRepository()
const authRepository = provideAuthRepository()
const tweetUseCase = new PostTweetUseCase(tweetRepository, authRepository)

export function providePostTweetUseCase () {
    return tweetUseCase
}