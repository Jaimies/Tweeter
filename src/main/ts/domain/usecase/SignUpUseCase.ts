import {AuthRepository} from "../repository/AuthRepository"

export class SignUpUseCase {
    constructor(public authRepository: AuthRepository) {}

    run(email: string, username: string, password: string) {
        this.authRepository.signUp(email, username, password)
    }
}