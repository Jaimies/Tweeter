import {UserRepository} from "../../repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {checkIsDefined} from "@/shared/Preconditions"
import {ProfileUpdate, UpdateProfileUseCase} from "@/domain/usecase/user/UpdateProfileUseCase"

const UNAUTHENTICATED_ERROR = "Authentication is required for updating profile"

export class UpdateProfileUseCaseImpl implements UpdateProfileUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ) {}

    run(update: ProfileUpdate) {
        const userId = checkIsDefined(this.authRepository.userId, UNAUTHENTICATED_ERROR)
        this.userRepository.updateUser(userId!, update)
    }
}
