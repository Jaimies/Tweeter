import {AuthRepository} from "../repository/AuthRepository"

export class CheckIfLoggedInUseCase {
    constructor(public authRepository: AuthRepository) {}

    run() {
        return this.authRepository.user != undefined
    }
}