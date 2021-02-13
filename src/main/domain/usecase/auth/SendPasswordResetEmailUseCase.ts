import {PasswordResetResult} from "@/domain/repository/AuthRepository"

export interface SendPasswordResetEmailUseCase {
    run(email: string): Promise<PasswordResetResult>
}
