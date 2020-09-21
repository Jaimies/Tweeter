import {AuthRepository} from "../repository/AuthRepository"
import {UserRepository} from "../repository/UserRepository"
import {User} from "../model/User"

export class GetCurrentUserUseCase {
    constructor(private authRepository: AuthRepository, private userRepository: UserRepository) {}

    run(): User | undefined {
        const userId = this.authRepository.userId
        if (!userId) return undefined
        return this.userRepository.findUserById(userId)
    }
}
