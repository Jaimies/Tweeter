import {User} from "../model/User"

export interface UserRepository {
    getUsers(): User[]
    findUserById(id: string): User | undefined
    addUser(user: User): void
    updateUser(user: User): void
}
