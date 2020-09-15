import {AuthRepositoryImpl} from "../data/AuthRepositoryImpl"
import {AuthRepository} from "../domain/repository/AuthRepository"

const authRepository = new AuthRepositoryImpl()

export function provideAuthRepository(): AuthRepository {
    return authRepository
}