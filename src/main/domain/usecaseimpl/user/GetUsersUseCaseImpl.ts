import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {GetUsersUseCase} from "@/domain/usecase/user/GetUsersUseCase"

export class GetUsersUseCaseImpl implements GetUsersUseCase {
    constructor(private usersRepository: UserRepository) {}

    run(): Promise<User[]> {
        return this.usersRepository.getUsers()
    }
}
