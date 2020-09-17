import {provideAuthRepository} from "./provideAuthRepository"
import {LoginUseCase} from "../domain/usecase/LoginUseCase"

export function provideLoginUseCase() {
    return new LoginUseCase(provideAuthRepository())
}