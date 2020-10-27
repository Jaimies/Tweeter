export enum SignUpResult {Success="success", EmailTaken = "email taken"}
export enum LoginResult {Success= "success", UserNotFound = "user not found", WrongPassword = "wrong password"}

export interface AuthRepository {
    userId: string | undefined
    login(email: string, password: string): Promise<LoginResult>
    signUp(email: string, password: string): Promise<SignUpResult>
    logout(): Promise<void>
}
