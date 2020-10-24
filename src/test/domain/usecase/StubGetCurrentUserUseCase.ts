import {User} from "@/domain/model/User"

export class StubGetCurrentUserUseCase {
    constructor(public user: User | undefined) {}

    run() {
        return this.user
    }
}
