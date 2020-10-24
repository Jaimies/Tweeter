import {User} from "@/domain/model/User"

export interface SignUpUseCase {
    run(user: User, password: string): void
    isEmailAvailable(email: string): boolean
    isUserIdAvailable(id: string): boolean
}
