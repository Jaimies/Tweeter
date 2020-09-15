import {provideAuthRepository} from "./provideAuthRepository"
import {SignInUseCase} from "../domain/usecase/SignInUseCase"

const authRepository = provideAuthRepository()

export function provideSignInUseCase() {
    return new SignInUseCase(authRepository)
}