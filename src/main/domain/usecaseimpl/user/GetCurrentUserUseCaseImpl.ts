import {AuthRepository} from "../../repository/AuthRepository"
import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"

export class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {
    constructor(private authRepository: AuthRepository, private userRepository: UserRepository) {}

    async run(): Promise<User | undefined> {
        const userId = this.authRepository.userId
        if (!userId) return undefined
        return this.userRepository.findUserByUsername(userId)
    }
}
