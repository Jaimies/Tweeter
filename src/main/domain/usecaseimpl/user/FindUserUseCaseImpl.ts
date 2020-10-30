import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {FindUserUseCase} from "@/domain/usecase/user/FindUserUseCase"

export class FindUserUseCaseImpl implements FindUserUseCase {
    constructor(private userRepository: UserRepository) {}

    run(username: string): Promise<User | undefined> {
        return this.userRepository.findUserByUsername(username)
    }
}
