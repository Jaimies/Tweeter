import {UserRepository} from "@/domain/repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {ListChange} from "@/domain/model/ListChange"
import {checkIsDefined} from "@/shared/Preconditions"
import {FollowUserUseCase} from "@/domain/usecase/follow/FollowUserUseCase"

const AUTH_REQUIRED = "Authentication is required to follow a user."

export class FollowUserUseCaseImpl implements FollowUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ) {}

    run(userId: string) {
        const currentUserId = checkIsDefined(this.authRepository.userId, AUTH_REQUIRED)
        this.userRepository.updateUser(currentUserId, {
            following: new ListChange.Add(userId)
        })
    }
}
