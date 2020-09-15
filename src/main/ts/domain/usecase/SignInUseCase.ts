import {AuthRepository} from "../repository/AuthRepository"

export class SignInUseCase {
    constructor(public authRepository: AuthRepository) {}

    run() {
        this.authRepository.signIn()
    }
}