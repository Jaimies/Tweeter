import {UserRepository} from "../../../main/domain/repository/UserRepository"
import {User} from "../../../main/domain/model/User"

export class StubUserRepository implements UserRepository {
    constructor(private users: User[]) {}

    addUser = () => {}
    updateUser = () => {}
    findUserById = (userId: string) => this.users.find(user => user.id == userId)
    getUsers = () => this.users
}
