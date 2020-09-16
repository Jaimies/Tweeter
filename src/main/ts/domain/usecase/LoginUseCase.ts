import {AuthRepository} from "../repository/AuthRepository"

export class LoginUseCase {
    constructor(public authRepository: AuthRepository) {}

    run(credential: string, password: string) {
        return this.authRepository.login(credential, password)
    }
}