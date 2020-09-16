import {provideAuthRepository} from "./provideAuthRepository"
import {LoginUseCase} from "../domain/usecase/LoginUseCase"

const authRepository = provideAuthRepository()

export function provideLoginUseCase() {
    return new LoginUseCase(authRepository)
}