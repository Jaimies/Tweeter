import {AuthRepository} from "@/domain/repository/AuthRepository"
import {LogoutUseCase} from "@/domain/usecase/auth/LogoutUseCase"

export class LogoutUseCaseImpl implements LogoutUseCase {
    constructor(private authRepository: AuthRepository) {}

    run() {
        return this.authRepository.logout()
    }
}
