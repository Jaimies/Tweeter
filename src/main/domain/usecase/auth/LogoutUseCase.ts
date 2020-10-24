import {AuthRepository} from "@/domain/repository/AuthRepository"

export class LogoutUseCase {
    constructor(private authRepository: AuthRepository) {}

    run() {
        this.authRepository.logout()
    }
}
