import {UserRepository} from "@/domain/repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {checkIsDefined} from "@/shared/Preconditions"
import {ListChange} from "@/domain/model/ListChange"
import {UnfollowUserUseCase} from "@/domain/usecase/follow/UnfollowUserUseCase"

const AUTH_REQUIRED = "Authentication is required to unfollow a user."

export class UnfollowUserUseCaseImpl implements UnfollowUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ) {}

    run(userId: string) {
        const currentUserId = checkIsDefined(this.authRepository.userId, AUTH_REQUIRED)
        this.userRepository.updateUser(currentUserId, {
            following: new ListChange.Remove(userId)
        })
    }
}
