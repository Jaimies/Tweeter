export interface AuthRepository {
    userId: string | undefined
    areCredentialsValid(credential: string, password: string): boolean
    login(email: string, password: string): void
    signUp(email: string, password: string): void
    logout(): void
}
