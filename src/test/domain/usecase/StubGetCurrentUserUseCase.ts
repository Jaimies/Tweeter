import {User} from "../../../main/domain/model/User"

export class StubGetCurrentUserUseCase {
    constructor(private user: User) {}

    run() {
        return this.user
    }
}
