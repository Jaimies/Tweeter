import {AuthRepository} from "../repository/AuthRepository"

export class GetUserUseCase {
    constructor(public authRepository: AuthRepository) {
    }

    run() {
        return this.authRepository.user
    }
}