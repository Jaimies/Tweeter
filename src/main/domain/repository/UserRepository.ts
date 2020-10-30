import {User} from "../model/User"
import {UserChange} from "@/domain/model/UserChange"

export interface UserRepository {
    getUsers(): Promise<User[]>
    findUserByUsername(username: string): Promise<User | undefined>
    addUser(user: User): Promise<void>
    updateUser(id: string, change: UserChange): Promise<void>
}
