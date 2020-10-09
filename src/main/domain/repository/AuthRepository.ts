export interface AuthRepository {
    userId: string | undefined
    areCredentialsValid(credential: string, password: string): boolean
    login(credential: string, password: string): void
    signUp(id: string, email: string, password: string): void
    logout(): void
}
