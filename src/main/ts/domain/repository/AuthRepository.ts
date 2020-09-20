export interface AuthRepository {
    userId: string | undefined
    login(credential: string, password: string): boolean
    signUp(id: string, email: string, password: string): void
}