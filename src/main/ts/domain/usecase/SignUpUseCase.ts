import {AuthRepository} from "../repository/AuthRepository"
import {User} from "../model/User"

export class SignUpUseCase {
    constructor(public authRepository: AuthRepository) {}

    run(user: User, password: string) {
        this.authRepository.signUp(user, password)
        this.authRepository.login(user.id, password)
    }
}