import {AuthRepository, SignUpResult} from "../../repository/AuthRepository"
import {User} from "../../model/User"
import {UserRepository} from "../../repository/UserRepository"
import {SignUpUseCase} from "@/domain/usecase/auth/SignUpUseCase"

export class SignUpUseCaseImpl implements SignUpUseCase {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository,
    ) {}

    async run(user: User, password: string): Promise<SignUpResult> {
        const signUpResult = await this.authRepository.signUp(user.email, password)

        if (signUpResult instanceof SignUpResult.Success)
            await this.userRepository.addUser(signUpResult.userId, user)

        return signUpResult
    }

    isEmailAvailable(email: string): Promise<boolean> {
        return this.userRepository.findUserByEmail(email).then(user => !user)
    }

    isUsernameAvailable(username: string): Promise<boolean> {
        return this.userRepository.findUserByUsername(username).then(user => !user)
    }
}
