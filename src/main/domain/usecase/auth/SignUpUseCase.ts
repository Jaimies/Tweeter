import {User} from "@/domain/model/User"
import {SignUpResult} from "@/domain/repository/AuthRepository";

export interface SignUpUseCase {
    run(user: User, password: string): Promise<SignUpResult>
    isEmailAvailable(email: string): boolean
    isUserIdAvailable(id: string): boolean
}
