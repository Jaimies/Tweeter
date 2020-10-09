import {AuthRepository} from "@/domain/repository/AuthRepository"

export class StubAuthRepository implements AuthRepository {
    constructor(public userId: string | undefined) {}
    login = () => {}
    areCredentialsValid = () => true
    signUp = () => {}
}
