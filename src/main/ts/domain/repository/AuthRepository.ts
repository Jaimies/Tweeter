import {User} from "../model/User"

export interface AuthRepository {
    user: User | null
    signIn (): void
}