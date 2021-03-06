import {Observable} from "rxjs"

export class SignUpResult {
    static EmailTaken = new SignUpResult()
    static Success = class extends SignUpResult {
        constructor(public userId: string) { super() }
    }

    protected constructor() {}
}

export enum LoginResult {
    Success = "success",
    UserNotFound = "user not found",
    WrongPassword = "wrong password",
    TooManyAttempts = "too many attempts"
}

export enum PasswordResetResult {
    Success = "success",
    InternalError = "internal-error"
}

export interface AuthRepository {
    userId: Observable<string | undefined>
    login(email: string, password: string): Promise<LoginResult>
    signUp(email: string, password: string): Promise<SignUpResult>
    sendPasswordResetEmail(email: string): Promise<PasswordResetResult>
    logout(): Promise<void>
}
