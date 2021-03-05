import {User} from "../model/User"
import {UserChange} from "@/domain/model/UserChange"
import {Observable} from "rxjs"

export interface UserRepository {
    getUsers(): Promise<User[]>
    findUserByEmail(email: string): Promise<User | undefined>
    findUserByUsername(username: string): Promise<User | undefined>
    findUserById(id: string): Observable<User | undefined>
    addUser(id: string, user: User): Promise<void>
    updateUser(id: string, change: UserChange): Promise<void>
    followUser(id: string, followerId: string): Promise<void>
    unfollowUser(id: string, followerId: string): Promise<void>
}
