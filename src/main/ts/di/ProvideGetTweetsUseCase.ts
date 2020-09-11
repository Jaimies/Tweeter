import {GetTweetsUseCase} from "../domain/usecase/GetTweetsUseCase"
import {provideTweetRepository} from "./ProvideTweetRepository"

const tweetRepository = provideTweetRepository()
const getTweetsUseCase = new GetTweetsUseCase(tweetRepository)

export function provideGetTweetsUseCase(): GetTweetsUseCase {
    return getTweetsUseCase
}