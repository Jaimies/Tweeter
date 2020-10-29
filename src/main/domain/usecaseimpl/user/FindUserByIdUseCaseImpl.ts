import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {FindUserByIdUseCase} from "@/domain/usecase/user/FindUserByIdUseCase"

export class FindUserByIdUseCaseImpl implements FindUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    run(id: string): Promise<User | undefined> {
        return this.userRepository.findUserByUsername(id)
    }
}
