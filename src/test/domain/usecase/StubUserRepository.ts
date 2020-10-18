import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"

export class StubUserRepository implements UserRepository {
    constructor(private users: User[]) {}

    addUser = () => {}
    updateUser = () => this.users[0]
    findUserById = (userId: string) => this.users.find(user => user.id == userId)
    getUsers = () => this.users
}
