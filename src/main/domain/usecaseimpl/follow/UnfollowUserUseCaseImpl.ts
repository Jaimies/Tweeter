import {UnfollowUserUseCase} from "@/domain/usecase/follow/UnfollowUserUseCase"
import {UserRepository} from "@/domain/repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"
import {checkIsDefined} from "@/shared/Preconditions"

const AUTH_REQUIRED = "Authentication is required to unfollow a user."

export class UnfollowUserUseCaseImpl implements UnfollowUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
    ) {}

    async run(userId: string) {
        const currentUserId = await getValue(this.authRepository.userId)
        checkIsDefined(currentUserId, AUTH_REQUIRED)
        return this.userRepository.unfollowUser(userId, currentUserId!)
    }
}
