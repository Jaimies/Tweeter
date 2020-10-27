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
        this.userRepository.addUser(user)
        await this.authRepository.login(user.email, password)
        return signUpResult
    }

    isEmailAvailable(email: string): boolean {
        return this.isUserAvailable(user => user.email == email)
    }

    isUserIdAvailable(id: string): boolean {
        return this.isUserAvailable(user => user.id == id)
    }

    private isUserAvailable(predicate: (user: User) => boolean) {
        return !this.userRepository.getUsers().some(predicate)
    }
}
