export interface LoginUseCase {
    login(credential: string, password: string): void
    areCredentialsValid(credential: string, password: string): boolean
}
