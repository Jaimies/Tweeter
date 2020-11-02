import {GetAuthStateUseCase} from "@/domain/usecase/auth/GetAuthStateUseCase"
import {AuthState} from "@/domain/model/AuthState"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"
import Authenticated = AuthState.Authenticated
import Unauthenticated = AuthState.Unauthenticated

export class GetAuthStateUseCaseImpl implements GetAuthStateUseCase {
    constructor(private authRepository: AuthRepository) {}

    async run(): Promise<AuthState> {
        const userId = await getValue(this.authRepository.userId)
        return userId ? Authenticated : Unauthenticated
    }
}
