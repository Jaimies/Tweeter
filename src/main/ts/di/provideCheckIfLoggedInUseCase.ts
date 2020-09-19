import {provideAuthRepository} from "./provideAuthRepository"
import {CheckIfLoggedInUseCase} from "../domain/usecase/CheckIfLoggedInUseCase"

export function provideCheckIfLoggedInUseCase() {
    return new CheckIfLoggedInUseCase(provideAuthRepository())
}