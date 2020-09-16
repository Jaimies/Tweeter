import {AuthRepository} from "../repository/AuthRepository"

export class SignInUseCase {
    constructor(public authRepository: AuthRepository) {}

    run(credential: string, password: string) {
        return this.authRepository.signIn(credential, password)
    }
}