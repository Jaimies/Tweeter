import {AuthRepositoryImpl} from "../data/AuthRepositoryImpl"
import {AuthRepository} from "../domain/repository/AuthRepository"
import {provideStorage} from "./provideStorage"

const authRepository = new AuthRepositoryImpl(provideStorage())

export function provideAuthRepository(): AuthRepository {
    return authRepository
}