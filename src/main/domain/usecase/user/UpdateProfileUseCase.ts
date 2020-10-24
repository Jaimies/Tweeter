import {UserRepository} from "../../repository/UserRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {User} from "@/domain/model/User"
import {checkIsDefined} from "@/shared/Preconditions"

const UNAUTHENTICATED_ERROR = "Authentication is required for updating profile"

interface ProfileUpdate {
    name: string
    bio: string
}

export class UpdateProfileUseCase {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ) {}

    run(update: ProfileUpdate): User {
        const userId = checkIsDefined(this.authRepository.userId, UNAUTHENTICATED_ERROR)
        return this.userRepository.updateUser(userId!, update)
    }
}
