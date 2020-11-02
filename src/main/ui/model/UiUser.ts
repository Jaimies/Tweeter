import {User} from "@/domain/model/User"

export class UiUser {
    constructor(
        public username: string,
        public name: string,
        public bio: string
    ) {}
}

export function mapUserToPresentation({username, name, bio}: User) {
    return new UiUser(username, name, bio)
}
