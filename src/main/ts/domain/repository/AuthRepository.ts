import {User} from "../model/User"

export interface AuthRepository {
    user: User | null
    login(credential: string, password: string): boolean
}