import {AuthRepository, LoginResult} from "../../repository/AuthRepository"
import {LoginUseCase} from "@/domain/usecase/auth/LoginUseCase"

export class LoginUseCaseImpl implements LoginUseCase {
    constructor(public authRepository: AuthRepository) {}

    login(email: string, password: string): Promise<LoginResult> {
        return this.authRepository.login(email, password)
    }
}
