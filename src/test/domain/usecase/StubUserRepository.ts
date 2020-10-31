import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"

export class StubUserRepository implements UserRepository {
    constructor(private users: User[]) {}

    addUser = async () => {}
    updateUser = async () => {}
    findUserByUsername = async (username: string) => this.users.find(user => user.username == username)
    findUserById = async (id: string) => this.users.find(user => user.id == id)
    getUsers = async () => this.users
}
