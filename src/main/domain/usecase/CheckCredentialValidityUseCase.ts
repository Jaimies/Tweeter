import {AuthRepository} from "../repository/AuthRepository"

export class CheckCredentialValidityUseCase {
    constructor(private authRepository: AuthRepository) {}

    run(credential: string, password: string) {
        return this.authRepository.areCredentialsValid(credential, password)
    }
}
