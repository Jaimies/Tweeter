import {AuthRepository, PasswordResetResult} from "@/domain/repository/AuthRepository"
import {SendPasswordResetEmailUseCase} from "@/domain/usecase/auth/SendPasswordResetEmailUseCase"

export class SendPasswordResetEmailUseCaseImpl implements SendPasswordResetEmailUseCase {
    constructor(private authRepository: AuthRepository) {}

    run(email: string): Promise<PasswordResetResult> {
        return this.authRepository.sendPasswordResetEmail(email)
    }
}
