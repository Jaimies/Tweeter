import {AuthRepository} from "../../../main/domain/repository/AuthRepository"

export class StubAuthRepository implements AuthRepository {
    constructor(public userId: string | undefined) {}
    login = () => true
    signUp = () => {}
}
