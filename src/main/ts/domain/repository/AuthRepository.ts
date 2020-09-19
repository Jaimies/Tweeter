import {User} from "../model/User"

export interface AuthRepository {
    user: User | undefined
    login(credential: string, password: string): boolean
    signUp(user: User, password: string): void
}