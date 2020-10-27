import {AuthRepository, LoginResult, SignUpResult} from "@/domain/repository/AuthRepository"

export class StubAuthRepository implements AuthRepository {
    constructor(public userId: string | undefined) {}

    login = async () => LoginResult.Success
    signUp = async () => SignUpResult.Success
    logout = async () => {}
}
