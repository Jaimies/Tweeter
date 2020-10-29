import {User} from "@/domain/model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"

export class StubGetCurrentUserUseCase implements GetCurrentUserUseCase {
    constructor(public user: User | undefined) {}

    async run() {
        return this.user
    }
}
