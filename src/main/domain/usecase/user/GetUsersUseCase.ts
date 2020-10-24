import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"

export class GetUsersUseCase {
    constructor(private usersRepository: UserRepository) {}

    run(): User[] {
        return this.usersRepository.getUsers()
    }
}
