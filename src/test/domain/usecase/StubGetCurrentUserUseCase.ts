import {User} from "@/domain/model/User"

export class StubGetCurrentUserUseCase {
    constructor(private user: User | undefined) {}

    run() {
        return this.user
    }
}
