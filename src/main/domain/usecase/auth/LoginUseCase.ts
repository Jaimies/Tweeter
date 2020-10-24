import {AuthRepository} from "../../repository/AuthRepository"

export class LoginUseCase {
    constructor(public authRepository: AuthRepository) {}

    login(credential: string, password: string) {
        return this.authRepository.login(credential, password)
    }

    areCredentialsValid(credential: string, password: string): boolean {
        return this.authRepository.areCredentialsValid(credential, password)
    }
}
