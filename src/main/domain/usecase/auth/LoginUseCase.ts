export interface LoginUseCase {
    login(email: string, password: string): void
    areCredentialsValid(credential: string, password: string): boolean
}
