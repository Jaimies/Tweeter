import {UserRepository} from "../repository/UserRepository"
import {User} from "../model/User"

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    run(updatedUser: User) {
        this.userRepository.updateUser(updatedUser)
    }
}
