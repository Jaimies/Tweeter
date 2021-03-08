import {FollowUserUseCase} from "@/domain/usecase/follow/FollowUserUseCase"
import {UserRepository} from "@/domain/repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"
import {checkIsDefined} from "@/shared/Preconditions"

const AUTH_REQUIRED = "Authentication is required to follow a user."

export class FollowUserUseCaseImpl implements FollowUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository,
    ) {}

    async run(userId: string) {
        const currentUserId = await getValue(this.authRepository.userId)
        checkIsDefined(currentUserId, AUTH_REQUIRED)
        return this.userRepository.followUser(userId, currentUserId!)
    }
}
