import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"

export class FindUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    run(id: string): User | undefined {
        return this.userRepository.findUserById(id)
    }
}
