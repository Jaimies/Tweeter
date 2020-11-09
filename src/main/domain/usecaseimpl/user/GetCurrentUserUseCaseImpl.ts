import {AuthRepository} from "../../repository/AuthRepository"
import {UserRepository} from "../../repository/UserRepository"
import {User} from "../../model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {Observable, of} from "rxjs"
import {switchMap} from "rxjs/operators"

export class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {
    constructor(
        private authRepository: AuthRepository,
        private userRepository: UserRepository
    ) {}

    run(): Observable<User | undefined> {
        return this.authRepository.userId.pipe(
            switchMap(id => this.findUserById(id))
        )
    }

    private findUserById(id: string | undefined): Observable<User | undefined> {
        if(!id) return of(undefined)
        return this.userRepository.findUserById(id)
    }
}
