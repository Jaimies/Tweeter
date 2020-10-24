import {User} from "../model/User"
import {UserChange} from "@/domain/model/UserChange"

export interface UserRepository {
    getUsers(): User[]
    findUserById(id: string): User | undefined
    addUser(user: User): void
    updateUser(id: string, change: UserChange): User
}
