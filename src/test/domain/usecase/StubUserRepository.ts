import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"

export class StubUserRepository implements UserRepository {
    constructor(private users: User[]) {}

    addUser = async () => {}
    updateUser = async () => {}
    findUserByUsername = async (userId: string) => this.users.find(user => user.username == userId)
    getUsers = async () => this.users
}
