import {SignUpUseCase} from "../domain/usecase/SignUpUseCase"
import {provideAuthRepository} from "./provideAuthRepository"

export function provideSignUpUseCase() {
    return new SignUpUseCase(provideAuthRepository())
}