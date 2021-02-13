import {AuthRepository, LoginResult, PasswordResetResult, SignUpResult} from "@/domain/repository/AuthRepository"
import {BehaviorSubject} from "rxjs"

export class StubAuthRepository implements AuthRepository {
    public userId: BehaviorSubject<string | undefined>

    constructor(userId: string | undefined) {
        this.userId = new BehaviorSubject(userId)
    }

    login = async () => LoginResult.Success
    signUp = async () => SignUpResult.Success
    logout = async () => {}
    sendPasswordResetEmail = async () => PasswordResetResult.Success
}
