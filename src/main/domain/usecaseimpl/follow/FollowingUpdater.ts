import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"
import {checkIsDefined} from "@/shared/Preconditions"
import {UserRepository} from "@/domain/repository/UserRepository"
import {ListChange} from "@/domain/model/ListChange"

export class FollowingUpdater {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
    ) {}

    async run(following: ListChange<string>, errorMessage: string) {
        const userId = await getValue(this.authRepository.userId)
        checkIsDefined(userId, errorMessage)
        return this.userRepository.updateUser(userId!, {following})
    }
}
