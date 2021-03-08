import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"
import {of} from "rxjs"

export class StubUserRepository implements UserRepository {
    constructor(private users: User[]) {}

    addUser = async () => {}
    updateUser = async () => {}
    findUserByEmail = async (email: string) => this.users.find(user => user.email == email)
    findUserByUsername = async (username: string) => this.users.find(user => user.username == username)
    findUserById = (id: string) => of(this.users.find(user => user.id == id))
    getUsers = async () => this.users
    followUser = async () => {}
    unfollowUser = async () => {}
}
