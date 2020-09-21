import {AuthRepository} from "../repository/AuthRepository"
import {User} from "../model/User"
import {UserRepository} from "../repository/UserRepository"

export class SignUpUseCase {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository
    ) {}

    run(user: User, password: string) {
        this.authRepository.signUp(user.id, user.email, password)
        this.userRepository.addUser(user)
        this.authRepository.login(user.id, password)
    }
}