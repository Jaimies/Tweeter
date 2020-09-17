import {provideAuthRepository} from "./provideAuthRepository"
import {GetUserUseCase} from "../domain/usecase/GetUserUseCase"

export function provideGetUserUseCase() {
    return new GetUserUseCase(provideAuthRepository())
}