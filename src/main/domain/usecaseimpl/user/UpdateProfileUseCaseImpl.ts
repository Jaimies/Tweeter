import {UserRepository} from "../../repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {checkIsDefined} from "@/shared/Preconditions"
import {ProfileUpdate, UpdateProfileUseCase} from "@/domain/usecase/user/UpdateProfileUseCase"
import {getValue} from "@/shared/RxUtil"

const UNAUTHENTICATED_ERROR = "Authentication is required for updating profile"

export class UpdateProfileUseCaseImpl implements UpdateProfileUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ) {}

    async run(update: ProfileUpdate) {
        const userId = await getValue(this.authRepository.userId)
        checkIsDefined(userId, UNAUTHENTICATED_ERROR)
        return this.userRepository.updateUser(userId!, update)
    }
}
