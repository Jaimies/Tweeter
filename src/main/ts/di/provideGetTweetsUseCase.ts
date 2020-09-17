import {GetTweetsUseCase} from "../domain/usecase/GetTweetsUseCase"
import {provideTweetRepository} from "./provideTweetRepository"

export function provideGetTweetsUseCase(): GetTweetsUseCase {
    return new GetTweetsUseCase(provideTweetRepository())
}