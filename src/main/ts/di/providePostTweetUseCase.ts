import {provideTweetRepository} from "./provideTweetRepository"
import {PostTweetUseCase} from "../domain/usecase/PostTweetUseCase"
import {provideAuthRepository} from "./provideAuthRepository"

export function providePostTweetUseCase() {
    return new PostTweetUseCase(provideTweetRepository(), provideAuthRepository())
}