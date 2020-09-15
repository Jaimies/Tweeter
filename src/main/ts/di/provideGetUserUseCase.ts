import {provideAuthRepository} from "./provideAuthRepository"
import {GetUserUseCase} from "../domain/usecase/GetUserUseCase"

const authRepository = provideAuthRepository()

export function provideGetUserUseCase() {
    return new GetUserUseCase(authRepository)
}