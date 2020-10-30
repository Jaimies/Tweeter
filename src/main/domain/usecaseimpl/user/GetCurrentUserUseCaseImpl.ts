import {AuthRepository} from "../../repository/AuthRepository"
import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {getValue} from "@/shared/RxUtil"

export class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {
    constructor(private authRepository: AuthRepository, private userRepository: UserRepository) {}

    async run(): Promise<User | undefined> {
        const userId = await getValue(this.authRepository.userId)
        if (!userId) return undefined
        return this.userRepository.findUserByUsername(userId)
    }
}
