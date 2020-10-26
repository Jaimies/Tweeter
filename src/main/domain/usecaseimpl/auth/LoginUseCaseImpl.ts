import {AuthRepository} from "../../repository/AuthRepository"
import {LoginUseCase} from "@/domain/usecase/auth/LoginUseCase"

export class LoginUseCaseImpl implements LoginUseCase {
    constructor(public authRepository: AuthRepository) {}

    login(email: string, password: string) {
        return this.authRepository.login(email, password)
    }

    areCredentialsValid(credential: string, password: string): boolean {
        return this.authRepository.areCredentialsValid(credential, password)
    }
}
