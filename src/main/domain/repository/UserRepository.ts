import {User} from "../model/User"

export interface UserChange {
    name?: string,
    email?: string,
    bio?: string,
    following?: string[]
}

export interface UserRepository {
    getUsers(): User[]
    findUserById(id: string): User | undefined
    addUser(user: User): void
    updateUser(id: string, user: UserChange): User
}
