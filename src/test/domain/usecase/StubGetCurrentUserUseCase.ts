import {User} from "@/domain/model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {of} from "rxjs"

export class StubGetCurrentUserUseCase implements GetCurrentUserUseCase {
    constructor(public user: User | undefined) {}

    run() {
        return of(this.user)
    }
}
