import {AuthRepository, SignUpResult} from "../../repository/AuthRepository"
import {User} from "../../model/User"
import {UserRepository} from "../../repository/UserRepository"
import {SignUpUseCase} from "@/domain/usecase/auth/SignUpUseCase"

export class SignUpUseCaseImpl implements SignUpUseCase {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository
    ) {}

    async run(user: User, password: string): Promise<SignUpResult> {
        const signUpResult = await this.authRepository.signUp(user.email, password)

        if (signUpResult instanceof SignUpResult.Success)
            await this.loginAndAddUserToDB(signUpResult.userId, user, password)

        return signUpResult
    }

    isEmailAvailable(email: string): boolean {
        return this.isUserAvailable(user => user.email == email)
    }

    private loginAndAddUserToDB(userId: string, user: User, password: string) {
        const addUser = this.userRepository.addUser(userId, user)
        const login = this.authRepository.login(user.email, password)
        return Promise.all([addUser, login])
    }

    isUsernameAvailable(username: string): boolean {
        return this.isUserAvailable(user => user.id == username)
    }

    private isUserAvailable(predicate: (user: User) => boolean) {
        return !this.userRepository.getUsers().some(predicate)
    }
}
